import { useState, useEffect, useRef, useCallback } from 'react';
import { Device, Call } from '@twilio/voice-sdk';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type CallStatus = 'idle' | 'connecting' | 'ringing' | 'in-progress' | 'disconnecting' | 'error';

interface CallParams {
  phoneNumber: string;
  countryCode: string;
  countryName: string;
  ratePerMinute: number;
  recordCall?: boolean;
}

interface UseTwilioDeviceReturn {
  isReady: boolean;
  isInitializing: boolean;
  callStatus: CallStatus;
  activeCall: Call | null;
  error: string | null;
  initializeDevice: () => Promise<void>;
  makeCall: (params: CallParams) => Promise<void>;
  hangUp: () => void;
  callDuration: number;
}

export const useTwilioDevice = (): UseTwilioDeviceReturn => {
  const { user } = useAuth();
  const [device, setDevice] = useState<Device | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const callStartTimeRef = useRef<Date | null>(null);

  // Start duration timer when call is in progress
  const startDurationTimer = useCallback(() => {
    callStartTimeRef.current = new Date();
    durationIntervalRef.current = setInterval(() => {
      if (callStartTimeRef.current) {
        const elapsed = Math.floor((Date.now() - callStartTimeRef.current.getTime()) / 1000);
        setCallDuration(elapsed);
      }
    }, 1000);
  }, []);

  // Stop duration timer
  const stopDurationTimer = useCallback(() => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    callStartTimeRef.current = null;
  }, []);

  // Initialize Twilio Device
  const initializeDevice = useCallback(async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    if (device && isReady) {
      return; // Already initialized
    }

    setIsInitializing(true);
    setError(null);

    try {
      console.log('Fetching Twilio token...');
      const { data, error: tokenError } = await supabase.functions.invoke('twilio-token', {
        body: { identity: user.id }
      });

      if (tokenError) {
        throw new Error(tokenError.message);
      }

      if (!data?.token) {
        throw new Error('No token received from server');
      }

      console.log('Initializing Twilio Device...');
      const newDevice = new Device(data.token, {
        codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU],
      });

      // Set up device event handlers
      newDevice.on('registered', () => {
        console.log('Twilio Device registered');
        setIsReady(true);
        setIsInitializing(false);
        setError(null);
      });

      newDevice.on('error', (err) => {
        console.error('Twilio Device error:', err);
        const errorMessage = err.message || 'Connection error';
        setError(errorMessage);
        setIsReady(false);
        setIsInitializing(false);
        // Only show toast for call-related errors, not registration errors
        // (registration errors are already shown from the catch block)
        if (callStatus !== 'idle') {
          toast.error(`Call error: ${errorMessage}`);
        }
      });

      newDevice.on('incoming', (call) => {
        console.log('Incoming call from:', call.parameters.From);
        // For now, reject incoming calls (outbound only)
        call.reject();
      });

      // Register the device
      await newDevice.register();
      setDevice(newDevice);

    } catch (err) {
      console.error('Error initializing Twilio:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize calling';
      setError(errorMessage);
      setIsReady(false);
      setIsInitializing(false);
      // Destroy device if it was partially created
      if (device) {
        device.destroy();
        setDevice(null);
      }
      toast.error(errorMessage);
    }
  }, [user, device, isReady]);

  // Make an outbound call
  const makeCall = useCallback(async (params: CallParams) => {
    if (!device || !isReady) {
      toast.error('Calling not ready. Please wait...');
      await initializeDevice();
      return;
    }

    if (!user) {
      toast.error('Please log in to make calls');
      return;
    }

    setCallStatus('connecting');
    setError(null);
    setCallDuration(0);

    try {
      console.log('Making call to:', params.phoneNumber);
      
      const call = await device.connect({
        params: {
          To: params.phoneNumber,
          userId: user.id,
          countryCode: params.countryCode,
          countryName: params.countryName,
          ratePerMinute: params.ratePerMinute.toString(),
          recordCall: params.recordCall ? 'true' : 'false'
        }
      });

      // Set up call event handlers
      call.on('ringing', () => {
        console.log('Call ringing');
        setCallStatus('ringing');
      });

      call.on('accept', () => {
        console.log('Call accepted');
        setCallStatus('in-progress');
        startDurationTimer();
        toast.success('Call connected!');
      });

      call.on('disconnect', () => {
        console.log('Call disconnected');
        setCallStatus('idle');
        setActiveCall(null);
        stopDurationTimer();
        toast.info('Call ended');
      });

      call.on('cancel', () => {
        console.log('Call cancelled');
        setCallStatus('idle');
        setActiveCall(null);
        stopDurationTimer();
      });

      call.on('error', (err) => {
        console.error('Call error:', err);
        setError(err.message);
        setCallStatus('error');
        setActiveCall(null);
        stopDurationTimer();
        toast.error(`Call failed: ${err.message}`);
      });

      setActiveCall(call);

    } catch (err) {
      console.error('Error making call:', err);
      setError(err instanceof Error ? err.message : 'Failed to make call');
      setCallStatus('error');
      toast.error('Failed to start call. Please try again.');
    }
  }, [device, isReady, user, initializeDevice, startDurationTimer, stopDurationTimer]);

  // Hang up the active call
  const hangUp = useCallback(() => {
    if (activeCall) {
      console.log('Hanging up call');
      setCallStatus('disconnecting');
      activeCall.disconnect();
    }
  }, [activeCall]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDurationTimer();
      if (device) {
        device.destroy();
      }
    };
  }, [device, stopDurationTimer]);

  return {
    isReady,
    isInitializing,
    callStatus,
    activeCall,
    error,
    initializeDevice,
    makeCall,
    hangUp,
    callDuration
  };
};

import { useState, useCallback, useRef } from 'react';

export interface WebRTCTestResult {
  latency: number;
  jitter: number;
  packetLoss: number;
  qualityScore: 'excellent' | 'good' | 'fair' | 'poor';
  timestamp: Date;
}

export interface TestProgress {
  stage: 'idle' | 'connecting' | 'measuring' | 'complete' | 'error';
  progress: number;
  message: string;
}

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
];

const calculateQualityScore = (latency: number, jitter: number, packetLoss: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  // Scoring based on ITU-T G.107 E-model parameters
  if (latency < 50 && jitter < 15 && packetLoss < 1) return 'excellent';
  if (latency < 100 && jitter < 30 && packetLoss < 2) return 'good';
  if (latency < 200 && jitter < 50 && packetLoss < 5) return 'fair';
  return 'poor';
};

export const useWebRTCTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<TestProgress>({
    stage: 'idle',
    progress: 0,
    message: 'Ready to test',
  });
  const [result, setResult] = useState<WebRTCTestResult | null>(null);
  const abortRef = useRef(false);

  const runTest = useCallback(async () => {
    setIsRunning(true);
    setResult(null);
    abortRef.current = false;

    try {
      // Stage 1: Initialize connection
      setProgress({ stage: 'connecting', progress: 10, message: 'Initializing WebRTC connection...' });

      const pc1 = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      const pc2 = new RTCPeerConnection({ iceServers: ICE_SERVERS });

      // Create data channel for latency measurement
      const dataChannel = pc1.createDataChannel('latency-test', { ordered: false });
      
      const latencyMeasurements: number[] = [];
      const receivedPackets: number[] = [];
      let sentPackets = 0;
      let resolveChannel: () => void;
      const channelReady = new Promise<void>((resolve) => {
        resolveChannel = resolve;
      });

      pc2.ondatachannel = (event) => {
        const channel = event.channel;
        channel.onopen = () => resolveChannel();
        channel.onmessage = (e) => {
          const data = JSON.parse(e.data);
          receivedPackets.push(data.seq);
          // Echo back for RTT measurement
          channel.send(JSON.stringify({ ...data, echoed: true }));
        };
      };

      // Handle ICE candidates
      pc1.onicecandidate = (e) => {
        if (e.candidate) pc2.addIceCandidate(e.candidate);
      };
      pc2.onicecandidate = (e) => {
        if (e.candidate) pc1.addIceCandidate(e.candidate);
      };

      if (abortRef.current) throw new Error('Test aborted');

      setProgress({ stage: 'connecting', progress: 20, message: 'Creating peer connection...' });

      // Create offer and answer
      const offer = await pc1.createOffer();
      await pc1.setLocalDescription(offer);
      await pc2.setRemoteDescription(offer);

      const answer = await pc2.createAnswer();
      await pc2.setLocalDescription(answer);
      await pc1.setRemoteDescription(answer);

      setProgress({ stage: 'connecting', progress: 30, message: 'Establishing connection...' });

      // Wait for data channel to open
      await new Promise<void>((resolve) => {
        dataChannel.onopen = () => resolve();
        if (dataChannel.readyState === 'open') resolve();
      });

      await channelReady;

      if (abortRef.current) throw new Error('Test aborted');

      setProgress({ stage: 'measuring', progress: 40, message: 'Measuring latency and jitter...' });

      // Stage 2: Measure latency and jitter
      const measurementDuration = 3000; // 3 seconds
      const packetInterval = 50; // Send every 50ms
      const startTime = Date.now();
      const pendingPackets = new Map<number, number>();

      dataChannel.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.echoed && pendingPackets.has(data.seq)) {
          const rtt = Date.now() - pendingPackets.get(data.seq)!;
          latencyMeasurements.push(rtt / 2); // One-way latency
          pendingPackets.delete(data.seq);
        }
      };

      // Send packets at regular intervals
      while (Date.now() - startTime < measurementDuration) {
        if (abortRef.current) throw new Error('Test aborted');

        const seq = sentPackets++;
        pendingPackets.set(seq, Date.now());
        
        try {
          dataChannel.send(JSON.stringify({ seq, timestamp: Date.now() }));
        } catch (e) {
          // Channel might be closing
          break;
        }

        const elapsed = Date.now() - startTime;
        const progressPercent = 40 + Math.round((elapsed / measurementDuration) * 40);
        setProgress({ 
          stage: 'measuring', 
          progress: progressPercent, 
          message: `Testing network quality... ${Math.round(elapsed / 1000)}s` 
        });

        await new Promise((resolve) => setTimeout(resolve, packetInterval));
      }

      // Wait for remaining echoes
      await new Promise((resolve) => setTimeout(resolve, 500));

      setProgress({ stage: 'measuring', progress: 85, message: 'Calculating results...' });

      // Calculate metrics
      const avgLatency = latencyMeasurements.length > 0
        ? latencyMeasurements.reduce((a, b) => a + b, 0) / latencyMeasurements.length
        : 0;

      // Calculate jitter (variation in latency)
      let jitter = 0;
      if (latencyMeasurements.length > 1) {
        const differences = latencyMeasurements.slice(1).map((val, i) => 
          Math.abs(val - latencyMeasurements[i])
        );
        jitter = differences.reduce((a, b) => a + b, 0) / differences.length;
      }

      // Calculate packet loss
      const receivedCount = latencyMeasurements.length;
      const packetLoss = sentPackets > 0 
        ? ((sentPackets - receivedCount) / sentPackets) * 100 
        : 0;

      // Cleanup
      dataChannel.close();
      pc1.close();
      pc2.close();

      const testResult: WebRTCTestResult = {
        latency: Math.round(avgLatency * 10) / 10,
        jitter: Math.round(jitter * 10) / 10,
        packetLoss: Math.round(packetLoss * 10) / 10,
        qualityScore: calculateQualityScore(avgLatency, jitter, packetLoss),
        timestamp: new Date(),
      };

      setResult(testResult);
      setProgress({ stage: 'complete', progress: 100, message: 'Test complete!' });

    } catch (error) {
      console.error('WebRTC test error:', error);
      setProgress({ 
        stage: 'error', 
        progress: 0, 
        message: error instanceof Error ? error.message : 'Test failed' 
      });
    } finally {
      setIsRunning(false);
    }
  }, []);

  const abortTest = useCallback(() => {
    abortRef.current = true;
    setIsRunning(false);
    setProgress({ stage: 'idle', progress: 0, message: 'Test cancelled' });
  }, []);

  return {
    runTest,
    abortTest,
    isRunning,
    progress,
    result,
  };
};

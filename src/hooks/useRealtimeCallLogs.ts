import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useRealtimeCallLogs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) return;

    console.log('Setting up realtime call logs subscription for user:', user.id);

    const channel = supabase
      .channel('call-log-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'call_logs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('New call log received:', payload);
          queryClient.invalidateQueries({ queryKey: ['call-history', user.id] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'call_logs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Call log update received:', payload);
          queryClient.invalidateQueries({ queryKey: ['call-history', user.id] });
          
          // Notify when call completes
          const newStatus = payload.new?.status;
          const oldStatus = payload.old?.status;
          
          if (newStatus === 'completed' && oldStatus !== 'completed') {
            const duration = payload.new?.duration_seconds || 0;
            const cost = payload.new?.cost || 0;
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            toast.success(
              `Call completed: ${minutes}:${seconds.toString().padStart(2, '0')} - $${cost.toFixed(2)}`
            );
          }
        }
      )
      .subscribe((status) => {
        console.log('Call logs subscription status:', status);
      });

    return () => {
      console.log('Cleaning up call logs subscription');
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);
};

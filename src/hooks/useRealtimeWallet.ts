import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNotificationPreferences } from './useNotificationPreferences';

export const useRealtimeWallet = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { preferences } = useNotificationPreferences();
  const lastAlertBalanceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user) return;

    console.log('Setting up realtime wallet subscription for user:', user.id);

    const channel = supabase
      .channel('wallet-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'wallets',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          console.log('Wallet update received:', payload);
          
          // Invalidate the wallet query to refetch
          queryClient.invalidateQueries({ queryKey: ['wallet', user.id] });
          
          const newBalance = typeof payload.new?.balance === 'number' 
            ? payload.new.balance 
            : parseFloat(payload.new?.balance);
          const oldBalance = typeof payload.old?.balance === 'number' 
            ? payload.old.balance 
            : parseFloat(payload.old?.balance);
          
          if (!isNaN(newBalance) && !isNaN(oldBalance)) {
            const difference = newBalance - oldBalance;
            if (difference < 0) {
              toast.info(`$${Math.abs(difference).toFixed(2)} deducted from wallet`);
            } else if (difference > 0) {
              toast.success(`$${difference.toFixed(2)} added to wallet`);
            }

            // Check for low balance alert
            const threshold = preferences.low_balance_alert_threshold;
            const crossedBelow = oldBalance >= threshold && newBalance < threshold;
            const alreadyAlerted = lastAlertBalanceRef.current !== null && 
              lastAlertBalanceRef.current < threshold;

            if (crossedBelow && !alreadyAlerted) {
              lastAlertBalanceRef.current = newBalance;
              
              // Create a persistent notification
              const { error } = await supabase.from('notifications').insert({
                user_id: user.id,
                type: 'low_balance',
                title: 'Low Balance Alert',
                message: `Your wallet balance has dropped to $${newBalance.toFixed(2)}, which is below your $${threshold.toFixed(2)} threshold.`,
                action_url: '/dashboard/wallet'
              });

              if (error) {
                console.error('Error creating low balance notification:', error);
              }
            }

            // Reset alert tracking if balance goes back above threshold
            if (newBalance >= threshold) {
              lastAlertBalanceRef.current = null;
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('Wallet subscription status:', status);
      });

    return () => {
      console.log('Cleaning up wallet subscription');
      supabase.removeChannel(channel);
    };
  }, [user, queryClient, preferences.low_balance_alert_threshold]);
};

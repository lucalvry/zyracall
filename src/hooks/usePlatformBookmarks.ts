import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Bookmark {
  id: string;
  platformId: string;
  countryCode: string;
  notifyOnChange: boolean;
  createdAt: string;
}

export const usePlatformBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('platform_bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookmarks(
        (data || []).map((b) => ({
          id: b.id,
          platformId: b.platform_id,
          countryCode: b.country_code || '',
          notifyOnChange: b.notify_on_change ?? true,
          createdAt: b.created_at || '',
        }))
      );
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const addBookmark = useCallback(
    async (platformId: string, countryCode: string = '') => {
      if (!user) {
        toast({
          title: 'Login required',
          description: 'Please log in to bookmark platforms.',
          variant: 'destructive',
        });
        return false;
      }

      try {
        const { error } = await supabase.from('platform_bookmarks').insert({
          user_id: user.id,
          platform_id: platformId,
          country_code: countryCode,
          notify_on_change: true,
        });

        if (error) {
          if (error.code === '23505') {
            toast({
              title: 'Already bookmarked',
              description: 'This platform is already in your bookmarks.',
            });
            return false;
          }
          throw error;
        }

        toast({
          title: 'Bookmarked!',
          description: "You'll be notified when compatibility changes.",
        });

        await fetchBookmarks();
        return true;
      } catch (error) {
        console.error('Error adding bookmark:', error);
        toast({
          title: 'Error',
          description: 'Failed to add bookmark. Please try again.',
          variant: 'destructive',
        });
        return false;
      }
    },
    [user, toast, fetchBookmarks]
  );

  const removeBookmark = useCallback(
    async (platformId: string, countryCode: string = '') => {
      if (!user) return false;

      try {
        const { error } = await supabase
          .from('platform_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('platform_id', platformId)
          .eq('country_code', countryCode);

        if (error) throw error;

        toast({
          title: 'Bookmark removed',
          description: 'You will no longer receive notifications for this platform.',
        });

        await fetchBookmarks();
        return true;
      } catch (error) {
        console.error('Error removing bookmark:', error);
        toast({
          title: 'Error',
          description: 'Failed to remove bookmark. Please try again.',
          variant: 'destructive',
        });
        return false;
      }
    },
    [user, toast, fetchBookmarks]
  );

  const toggleNotification = useCallback(
    async (bookmarkId: string, notifyOnChange: boolean) => {
      try {
        const { error } = await supabase
          .from('platform_bookmarks')
          .update({ notify_on_change: notifyOnChange })
          .eq('id', bookmarkId);

        if (error) throw error;

        await fetchBookmarks();
        return true;
      } catch (error) {
        console.error('Error updating notification setting:', error);
        toast({
          title: 'Error',
          description: 'Failed to update notification setting.',
          variant: 'destructive',
        });
        return false;
      }
    },
    [toast, fetchBookmarks]
  );

  const isBookmarked = useCallback(
    (platformId: string, countryCode: string = '') => {
      return bookmarks.some(
        (b) => b.platformId === platformId && b.countryCode === countryCode
      );
    },
    [bookmarks]
  );

  return {
    bookmarks,
    isLoading,
    addBookmark,
    removeBookmark,
    toggleNotification,
    isBookmarked,
    refetch: fetchBookmarks,
  };
};

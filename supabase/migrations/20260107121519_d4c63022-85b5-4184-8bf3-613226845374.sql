-- Create notification_preferences table
CREATE TABLE public.notification_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL UNIQUE,
    email_notifications boolean NOT NULL DEFAULT true,
    sms_notifications boolean NOT NULL DEFAULT false,
    push_notifications boolean NOT NULL DEFAULT true,
    low_balance_alert_threshold numeric NOT NULL DEFAULT 5.00,
    call_summary_emails boolean NOT NULL DEFAULT true,
    marketing_emails boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    read boolean NOT NULL DEFAULT false,
    action_url text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for notification_preferences
CREATE POLICY "Users can view their own preferences"
ON public.notification_preferences FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
ON public.notification_preferences FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
ON public.notification_preferences FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all preferences"
ON public.notification_preferences FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notifications"
ON public.notifications FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
ON public.notifications FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications"
ON public.notifications FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at on notification_preferences
CREATE TRIGGER update_notification_preferences_updated_at
BEFORE UPDATE ON public.notification_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster notification queries
CREATE INDEX idx_notifications_user_id_read ON public.notifications(user_id, read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);
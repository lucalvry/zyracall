-- Add admin role to the user (keeping existing user role)
INSERT INTO public.user_roles (user_id, role)
VALUES ('c828985a-2bde-421e-a7e7-09839ebc0cde', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT,
    phone_number TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wallets table
CREATE TABLE public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('credit', 'debit', 'refund')),
    description TEXT,
    stripe_payment_id TEXT,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create call_rates table
CREATE TABLE public.call_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code TEXT NOT NULL,
    country_name TEXT NOT NULL,
    landline_rate DECIMAL(6, 4) NOT NULL,
    mobile_rate DECIMAL(6, 4) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (country_code)
);

-- Create call_logs table
CREATE TABLE public.call_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    destination_number TEXT NOT NULL,
    destination_country TEXT NOT NULL,
    destination_country_code TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    cost DECIMAL(10, 4) NOT NULL DEFAULT 0,
    rate_per_minute DECIMAL(6, 4) NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('initiated', 'ringing', 'in_progress', 'completed', 'failed', 'missed')),
    recording_url TEXT,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    ended_at TIMESTAMP WITH TIME ZONE
);

-- Create speed_dials table
CREATE TABLE public.speed_dials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    country_code TEXT NOT NULL,
    country_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speed_dials ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email));
    
    -- Create wallet
    INSERT INTO public.wallets (user_id)
    VALUES (NEW.id);
    
    -- Assign default user role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_call_rates_updated_at BEFORE UPDATE ON public.call_rates
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_speed_dials_updated_at BEFORE UPDATE ON public.speed_dials
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for wallets
CREATE POLICY "Users can view their own wallet" ON public.wallets
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all wallets" ON public.wallets
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all wallets" ON public.wallets
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all transactions" ON public.transactions
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage transactions" ON public.transactions
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for call_rates (public read, admin write)
CREATE POLICY "Anyone can view active call rates" ON public.call_rates
    FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage call rates" ON public.call_rates
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for call_logs
CREATE POLICY "Users can view their own call logs" ON public.call_logs
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own call logs" ON public.call_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all call logs" ON public.call_logs
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for speed_dials
CREATE POLICY "Users can view their own speed dials" ON public.speed_dials
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own speed dials" ON public.speed_dials
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own speed dials" ON public.speed_dials
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own speed dials" ON public.speed_dials
    FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all speed dials" ON public.speed_dials
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));
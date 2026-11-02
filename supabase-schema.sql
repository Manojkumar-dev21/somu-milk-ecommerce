-- ========================================================
-- SOMU MILK PRODUCTS - SUPABASE DATABASE SCHEMA & SEED DATA
-- Copy and paste this into the Supabase SQL Editor and click "RUN"
-- ========================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT DEFAULT '',
  description TEXT DEFAULT '',
  stock INT DEFAULT 50,
  is_available BOOLEAN DEFAULT true,
  sizes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT DEFAULT '',
  password TEXT NOT NULL,
  role TEXT DEFAULT 'customer',
  address TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ADMINS TABLE
CREATE TABLE IF NOT EXISTS public.admins (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_number TEXT UNIQUE NOT NULL,
  user_id TEXT,
  customer TEXT NOT NULL,
  mobile TEXT DEFAULT '',
  address TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC DEFAULT 0,
  delivery_charge NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Placed',
  delivery_slot TEXT DEFAULT 'Early Morning (6:00 AM - 7:30 AM)',
  payment_method TEXT DEFAULT 'Cash on Delivery',
  order_date TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  plan_name TEXT NOT NULL,
  customer TEXT NOT NULL,
  phone TEXT DEFAULT '',
  product TEXT NOT NULL,
  quantity TEXT NOT NULL,
  frequency TEXT DEFAULT 'Daily',
  time_slot TEXT DEFAULT '6:00 AM - 7:00 AM',
  start_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Active',
  monthly_total NUMERIC DEFAULT 1950,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. OFFERS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  discount TEXT NOT NULL,
  badge TEXT DEFAULT 'Offer',
  valid_till TEXT DEFAULT 'Ongoing'
);

-- 7. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  rating INT DEFAULT 5,
  comment TEXT NOT NULL,
  date TEXT DEFAULT 'Recent'
);

-- 8. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  time TEXT DEFAULT 'Just now',
  unread BOOLEAN DEFAULT true,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) BUT ALLOW PUBLIC READ/WRITE FOR PROTOTYPE
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products" ON public.products FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access on customers" ON public.customers;
CREATE POLICY "Allow public access on customers" ON public.customers FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access on admins" ON public.admins;
CREATE POLICY "Allow public access on admins" ON public.admins FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access on orders" ON public.orders;
CREATE POLICY "Allow public access on orders" ON public.orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access on subscriptions" ON public.subscriptions;
CREATE POLICY "Allow public access on subscriptions" ON public.subscriptions FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access on offers" ON public.offers;
CREATE POLICY "Allow public access on offers" ON public.offers FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access on reviews" ON public.reviews;
CREATE POLICY "Allow public access on reviews" ON public.reviews FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access on notifications" ON public.notifications;
CREATE POLICY "Allow public access on notifications" ON public.notifications FOR ALL USING (true);

-- ========================================================
-- SEED DATA
-- ========================================================

-- SEED ADMIN (Password: Admin@123)
INSERT INTO public.admins (id, name, email, password, role)
VALUES ('admin-1', 'Somu Admin', 'admin@somu.local', '$2a$12$KkQo2g16/lS6z8aK9Hl7jOPfQ064q2v.C0yvIgej6oE3uRsq1v6c6', 'admin')
ON CONFLICT (email) DO NOTHING;

-- SEED DEMO CUSTOMER (Password: Password@123)
INSERT INTO public.customers (id, name, email, phone, password, role, address)
VALUES ('cust-1', 'Priya Kumar', 'priya@example.com', '9876543210', '$2a$12$e6mZz50PkWFkZ6P2R9Y6GuvqC3V8Kq1E6R5V8Kq1E6R5V8Kq1E6R.', 'customer', '12, Anna Nagar 2nd Street, Trichy - 620001')
ON CONFLICT (email) DO NOTHING;

-- SEED PRODUCTS
INSERT INTO public.products (id, name, category, image, description, stock, is_available, sizes)
VALUES
(1, 'Fresh Cow Milk', 'Milk Products', '/src/assets/home-milk.jpg', 'Fresh farm milk collected daily and delivered with natural taste and goodness.', 65, true, '[{"size":"500 ml","price":35},{"size":"1 L","price":65},{"size":"2 L","price":125}]'::jsonb),
(2, 'Full Cream Milk', 'Milk Products', '/src/assets/home-milk.jpg', 'Rich and creamy full cream milk suitable for tea, coffee, cooking and daily use.', 40, true, '[{"size":"500 ml","price":38},{"size":"1 L","price":70},{"size":"2 L","price":135}]'::jsonb),
(3, 'Flavored Milk', 'Milk Products', '/src/assets/home-milk.jpg', 'Refreshing flavored milk made with quality dairy ingredients for a delicious drink.', 25, true, '[{"size":"200 ml","price":25},{"size":"500 ml","price":55},{"size":"1 L","price":100}]'::jsonb),
(4, 'Fresh Curd', 'Fermented Products', '/src/assets/home-curd.jpg', 'Fresh and creamy curd prepared from quality milk with a smooth texture.', 35, true, '[{"size":"200 g","price":20},{"size":"500 g","price":45},{"size":"1 kg","price":80}]'::jsonb),
(5, 'Buttermilk', 'Fermented Products', '/src/assets/home-curd.jpg', 'Light and refreshing buttermilk, perfect for staying cool and refreshed.', 50, true, '[{"size":"200 ml","price":12},{"size":"500 ml","price":25},{"size":"1 L","price":40}]'::jsonb),
(6, 'Fresh Lassi', 'Fermented Products', '/src/assets/home-curd.jpg', 'Creamy and refreshing lassi prepared from fresh curd for a delicious dairy drink.', 20, true, '[{"size":"200 ml","price":25},{"size":"500 ml","price":55},{"size":"1 L","price":100}]'::jsonb),
(7, 'Salted Butter', 'Fat-Based Products', '/src/assets/home-butter.jpg', 'Smooth and creamy salted butter made from fresh milk with a rich dairy taste.', 30, true, '[{"size":"100 g","price":60},{"size":"250 g","price":140},{"size":"500 g","price":275}]'::jsonb),
(8, 'Pure Cow Ghee', 'Fat-Based Products', '/src/assets/home-ghee.jpg', 'Pure aromatic cow ghee prepared with care for cooking and traditional recipes.', 45, true, '[{"size":"100 ml","price":80},{"size":"500 ml","price":345},{"size":"1 L","price":660}]'::jsonb),
(9, 'Fresh Paneer', 'Others', '/src/assets/home-paneer.jpg', 'Soft and fresh paneer prepared from quality milk, perfect for everyday cooking.', 28, true, '[{"size":"200 g","price":110},{"size":"500 g","price":275},{"size":"1 kg","price":550}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- SEED OFFERS
INSERT INTO public.offers (id, title, description, code, discount, badge, valid_till)
VALUES
(1, 'First Order Discount', 'Enjoy 10% off on your first dairy order above ₹200.', 'FRESH10', '10% OFF', 'Welcome Offer', '31 Dec 2026'),
(2, 'Monthly Milk Subscription', 'Subscribe for 30 days and get 2 days complimentary milk delivery.', 'MONTHLY30', '2 Days Free', 'Subscription', 'Ongoing'),
(3, 'Free Delivery', 'Free early-morning delivery on all orders above ₹199.', 'FREEDEL', 'Free Shipping', 'Popular', 'All Days')
ON CONFLICT (id) DO NOTHING;

-- SEED REVIEWS
INSERT INTO public.reviews (id, name, rating, comment, date)
VALUES
(1, 'Kavitha R.', 5, 'Prompt 6:00 AM delivery daily! Milk is pure, fresh and children love the taste.', '2 days ago'),
(2, 'Suresh Narayanan', 5, 'Best Paneer in town. Soft, fresh and natural without preservatives.', '1 week ago'),
(3, 'Anand M.', 5, 'The pure cow ghee aroma reminds me of village farm fresh ghee. Superb quality!', '2 weeks ago')
ON CONFLICT (id) DO NOTHING;


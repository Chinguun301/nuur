-- Fix admin RLS infinite recursion
--
-- PROBLEM: The original admin policies use:
--   auth.role() = 'authenticated' AND EXISTS (
--     SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
--   )
-- This subquery triggers RLS on the users table AGAIN, causing infinite recursion.
--
-- FIX: Create a SECURITY DEFINER function that bypasses RLS when checking admin role.
-- Then rewrite all admin policies to use this function.

-- 1. Create SECURITY DEFINER function (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Drop old admin policies that cause infinite recursion
DROP POLICY IF EXISTS "Admin all users" ON users;
DROP POLICY IF EXISTS "Admin all projects" ON projects;
DROP POLICY IF EXISTS "Admin all blogs" ON blogs;
DROP POLICY IF EXISTS "Admin all skills" ON skills;
DROP POLICY IF EXISTS "Admin all experiences" ON experiences;
DROP POLICY IF EXISTS "Admin all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin all contacts" ON contacts;
DROP POLICY IF EXISTS "Admin all analytics" ON analytics;
DROP POLICY IF EXISTS "Admin all site_content" ON site_content;
DROP POLICY IF EXISTS "Admin all social_links" ON social_links;
DROP POLICY IF EXISTS "Admin all seo_settings" ON seo_settings;
DROP POLICY IF EXISTS "Admin all resume_data" ON resume_data;

-- 3. Recreate admin policies using the SECURITY DEFINER function
CREATE POLICY "Admin all users" ON users FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all projects" ON projects FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all blogs" ON blogs FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all skills" ON skills FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all experiences" ON experiences FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all contacts" ON contacts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all analytics" ON analytics FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all site_content" ON site_content FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all social_links" ON social_links FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all seo_settings" ON seo_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin all resume_data" ON resume_data FOR ALL USING (public.is_admin());

-- 4. Keep the self-read policy for users (from previous migration)
-- This allows authenticated users to read their own record during login
-- DROP POLICY IF EXISTS "Users can read own record" ON users;
-- CREATE POLICY "Users can read own record" ON users FOR SELECT USING (
--   auth.role() = 'authenticated' AND id = auth.uid()
-- );

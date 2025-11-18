# Supabase Database Schema Documentation

This document outlines the complete database schema for the plumbing website. Implement these tables and policies when Supabase credentials are provided.

## Tables

### 1. leads

Stores customer inquiries from emergency quiz and contact form.

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  urgency VARCHAR(50),
  problem_type VARCHAR(100),
  location_in_home VARCHAR(100),
  contact_preference VARCHAR(20) DEFAULT 'call',
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
  priority BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_priority ON leads(priority) WHERE priority = TRUE;
```

### 2. contact_submissions

Stores contact form submissions separately from emergency leads.

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  source VARCHAR(100) DEFAULT 'contact_form',
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);
```

### 3. blog_posts

Sync blog posts from Sanity CMS.

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sanity_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(255),
  featured_image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  seo_title VARCHAR(255),
  seo_description TEXT
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(published) WHERE published = TRUE;
CREATE INDEX idx_blog_published_at ON blog_posts(published_at DESC) WHERE published = TRUE;
CREATE INDEX idx_blog_category ON blog_posts(category);
```

### 4. system_logs

Track system health, errors, and important events.

```sql
CREATE TABLE system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level VARCHAR(20) NOT NULL CHECK (level IN ('info', 'warning', 'error', 'critical')),
  message TEXT NOT NULL,
  source VARCHAR(100),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_logs_level ON system_logs(level);
CREATE INDEX idx_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX idx_logs_source ON system_logs(source);
```

### 5. service_areas

Store service area information with geographic data.

```sql
CREATE TABLE service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  state VARCHAR(2) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  description TEXT,
  neighborhoods TEXT[],
  response_time_minutes INTEGER DEFAULT 45,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_service_areas_slug ON service_areas(slug);
CREATE INDEX idx_service_areas_active ON service_areas(active) WHERE active = TRUE;
```

### 6. services

Store service information for dynamic content.

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  icon VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  pricing_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_featured ON services(featured) WHERE featured = TRUE;
```

### 7. admin_users

Store admin user information (for future expansion beyond simple password).

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_admin_email ON admin_users(email);
```

### 8. page_analytics

Track page views and user interactions.

```sql
CREATE TABLE page_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path VARCHAR(500) NOT NULL,
  user_agent TEXT,
  referrer VARCHAR(500),
  ip_address INET,
  session_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_analytics_page_path ON page_analytics(page_path);
CREATE INDEX idx_analytics_created_at ON page_analytics(created_at DESC);
CREATE INDEX idx_analytics_session ON page_analytics(session_id);
```

## Row Level Security (RLS) Policies

### leads Table

```sql
-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Admin can do everything
CREATE POLICY "Admin full access to leads"
ON leads
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Public can insert (for form submissions)
CREATE POLICY "Public can insert leads"
ON leads
FOR INSERT
TO anon
WITH CHECK (true);
```

### contact_submissions Table

```sql
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access to contact_submissions"
ON contact_submissions
FOR ALL
TO authenticated
USING (true);

CREATE POLICY "Public can insert contact_submissions"
ON contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);
```

### blog_posts Table

```sql
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Public can read published blog posts"
ON blog_posts
FOR SELECT
TO anon
USING (published = TRUE AND published_at <= NOW());

-- Admin full access
CREATE POLICY "Admin full access to blog_posts"
ON blog_posts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

### system_logs Table

```sql
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Only admin can read logs
CREATE POLICY "Admin can read system_logs"
ON system_logs
FOR SELECT
TO authenticated
USING (true);

-- Service role can insert logs
CREATE POLICY "Service role can insert logs"
ON system_logs
FOR INSERT
TO service_role
WITH CHECK (true);
```

### service_areas Table

```sql
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;

-- Public can read active areas
CREATE POLICY "Public can read active service areas"
ON service_areas
FOR SELECT
TO anon
USING (active = TRUE);

-- Admin full access
CREATE POLICY "Admin full access to service_areas"
ON service_areas
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

### services Table

```sql
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public can read all services
CREATE POLICY "Public can read services"
ON services
FOR SELECT
TO anon
USING (true);

-- Admin full access
CREATE POLICY "Admin full access to services"
ON services
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

## Functions

### Update Updated At Timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Get Lead Statistics

```sql
CREATE OR REPLACE FUNCTION get_lead_stats()
RETURNS TABLE (
  total_leads BIGINT,
  new_leads BIGINT,
  contacted_leads BIGINT,
  completed_leads BIGINT,
  avg_response_time INTERVAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_leads,
    AVG(contacted_at - created_at) FILTER (WHERE contacted_at IS NOT NULL) as avg_response_time
  FROM leads;
END;
$$ LANGUAGE plpgsql;
```

## Initial Data

### Service Areas

```sql
INSERT INTO service_areas (name, slug, state, latitude, longitude, description, neighborhoods, response_time_minutes) VALUES
('Cave Spring', 'cave-spring', 'VA', 37.2296, -79.9842, 'Serving Cave Spring with fast, reliable plumbing services.', ARRAY['Cave Spring Corners', 'Hunting Hills'], 40),
('Roanoke', 'roanoke', 'VA', 37.2710, -79.9414, 'Expert plumbing for Roanoke homes, including older 1950s-1980s builds.', ARRAY['Old Southwest', 'South Roanoke', 'Grandin Village'], 35),
('Salem', 'salem', 'VA', 37.2935, -80.0548, 'Professional plumbing services throughout Salem and surrounding areas.', ARRAY['East Salem', 'West Salem'], 45),
('Hollins', 'hollins', 'VA', 37.3451, -79.9514, 'Reliable plumbing solutions for Hollins residents.', ARRAY['Hollins College area'], 40),
('Vinton', 'vinton', 'VA', 37.2793, -79.8978, 'Fast emergency and scheduled plumbing for Vinton homes and businesses.', ARRAY['Downtown Vinton', 'Vinton Heights'], 40);
```

### Services

```sql
INSERT INTO services (title, slug, short_description, icon, featured) VALUES
('Emergency Plumbing', 'emergency-plumbing', 'Burst pipes, overflowing toilets, and urgent plumbing issues - we respond fast, 24/7.', 'emergency', true),
('Water Heater Repair & Installation', 'water-heater-repair-installation', '40-50 gallon tank replacement, repairs, and expansion tank installations.', 'waterHeater', true),
('Drain Cleaning & Sewer Services', 'drain-cleaning-sewer-services', 'Professional drain clearing and sewer backup solutions for your home.', 'drain', true),
('Leak Detection & Repair', 'leak-detection', 'Advanced leak detection and pipe repair, especially for older Roanoke homes.', 'leak', true),
('Toilet & Fixture Repairs', 'toilet-fixture-repairs', 'Faucet changes, toilet repairs and replacements, and all fixture services.', 'toilet', false),
('Bathroom & Kitchen Remodels', 'bathroom-kitchen-remodels', 'Complete plumbing for bathroom and kitchen renovation projects.', 'remodel', false),
('Sump Pump & Basement Waterproofing', 'sump-pump-basement-waterproofing', 'Protect your basement from flooding with professional sump pump installation.', 'sumpPump', false),
('Home Protection Plan', 'home-protection-plan', 'Monthly service plan with priority service, inspections, and discounted rates.', 'protection', true);
```

## Environment Variables Required

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## API Integration Points

Once Supabase is configured, update these API routes:

1. `/api/leads` - Create and manage leads
2. `/api/contact` - Handle contact form submissions
3. `/api/blog` - Fetch published blog posts
4. `/api/analytics` - Track page views
5. `/api/admin/leads` - Admin lead management
6. `/api/admin/stats` - Dashboard statistics

## Migration Steps

1. Create Supabase project
2. Run all table creation SQL
3. Apply RLS policies
4. Create functions and triggers
5. Insert initial data
6. Configure environment variables
7. Test API endpoints
8. Deploy to production


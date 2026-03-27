-- ============================================================
-- EFIR Portal — Supabase Migration (Simplified: 2 Tables)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 1. Users (from RegisterPage.js) ────────────────────────

CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              VARCHAR(30)  NOT NULL,
  father_name       VARCHAR(30)  NOT NULL,
  gender            VARCHAR(15)  NOT NULL,
  mobile_cc         VARCHAR(3)   NOT NULL DEFAULT '91',
  mobile_no         VARCHAR(10)  NOT NULL,
  landline_cc       VARCHAR(3),
  landline_area     VARCHAR(5),
  landline_no       VARCHAR(8),
  email             VARCHAR(100) NOT NULL UNIQUE,
  date_of_birth     DATE         NOT NULL,
  -- Present Address
  present_house     VARCHAR(10),
  present_street    VARCHAR(30),
  present_colony    VARCHAR(30),
  present_city      VARCHAR(30)  NOT NULL,
  present_tehsil    VARCHAR(30),
  present_pincode   VARCHAR(6),
  present_country   VARCHAR(50)  DEFAULT 'INDIA',
  present_state     VARCHAR(50)  DEFAULT 'MAHARASHTRA',
  present_district  VARCHAR(80),

  -- Login
  password_hash     TEXT         NOT NULL,
  is_verified       BOOLEAN      DEFAULT FALSE,
  created_at        TIMESTAMPTZ  DEFAULT now(),
  updated_at        TIMESTAMPTZ  DEFAULT now()
);

-- ─── 2. Complaints (from form.js — new fields only) ─────────

CREATE TABLE complaints (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Complainant Personal Info (new fields not in users)
  uid                      VARCHAR(12),
  first_name               VARCHAR(50),
  middle_name              VARCHAR(50),
  last_name                VARCHAR(50),
  relation_type            VARCHAR(30),
  relative_name            VARCHAR(100),
  nature_of_complaint      VARCHAR(100),

  -- Complainant Address (Present)
  present_house_no         VARCHAR(10),
  present_street_name      VARCHAR(30),
  present_colony           VARCHAR(30),
  present_village          VARCHAR(30),
  present_tehsil           VARCHAR(30),
  present_country          VARCHAR(50)  DEFAULT 'INDIA',
  present_state            VARCHAR(50)  DEFAULT 'MAHARASHTRA',
  present_district         VARCHAR(80),
  present_police_station   VARCHAR(100),
  present_pincode          VARCHAR(6),


  -- Identification
  country_of_nationality   VARCHAR(50)  DEFAULT 'INDIA',
  identification_type      VARCHAR(30),
  identification_number    VARCHAR(50),
  identification_records   JSONB        DEFAULT '[]'::jsonb,

  -- Accused (stored as JSON array)
  accused_records          JSONB        DEFAULT '[]'::jsonb,

  -- Incident Detail
  place_of_incident        TEXT,
  type_of_incident         VARCHAR(100),
  is_datetime_known        BOOLEAN      DEFAULT TRUE,
  incident_date_from       DATE,
  incident_time_from       TIME,
  incident_date_to         DATE,
  incident_time_to         TIME,
  incident_file_url        TEXT,

  -- Complaint Submission Details
  know_police_station      BOOLEAN      DEFAULT TRUE,
  submission_district      VARCHAR(80),
  submission_police_station VARCHAR(100),

  -- Complaint Detail
  date_of_complaint        DATE         DEFAULT CURRENT_DATE,
  complaint_description    TEXT,
  remarks                  TEXT,
  complaint_file_url       TEXT,

  status                   VARCHAR(20)  DEFAULT 'Draft',
  created_at               TIMESTAMPTZ  DEFAULT now(),
  updated_at               TIMESTAMPTZ  DEFAULT now()
);

CREATE INDEX idx_complaints_user ON complaints (user_id);

-- ─── Row Level Security ─────────────────────────────────────

ALTER TABLE users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users: own record" ON users
  FOR ALL USING (id = auth.uid());

CREATE POLICY "Complaints: own complaints" ON complaints
  FOR ALL USING (user_id = auth.uid());

-- ─── Auto-update trigger ────────────────────────────────────

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER set_complaints_updated_at
  BEFORE UPDATE ON complaints
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

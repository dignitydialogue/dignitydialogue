-- DignityDialogue Database Schema for Supabase
-- Complete schema with intakes and consent_logs tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE message_status AS ENUM ('pending', 'queued', 'sent', 'failed', 'rejected');
CREATE TYPE message_type AS ENUM ('birthday', 'holiday', 'check_in', 'encouragement', 'other');

-- Create intakes table
CREATE TABLE IF NOT EXISTS intakes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_name VARCHAR(255) NOT NULL,
    elder_name VARCHAR(255) NOT NULL,
    elder_phone VARCHAR(20) NOT NULL,
    message_type message_type NOT NULL,
    message_type_other TEXT,
    elder_age INTEGER NOT NULL CHECK (elder_age >= 0),
    elder_personality TEXT NOT NULL,
    requester_contact VARCHAR(255) NOT NULL,
    consent_elder_confirmed BOOLEAN NOT NULL DEFAULT false,
    consent_no_impersonation BOOLEAN NOT NULL DEFAULT false,
    recaptcha_token TEXT,
    status message_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT
);

-- Create consent_logs table for audit trail
CREATE TABLE IF NOT EXISTS consent_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intake_id UUID NOT NULL REFERENCES intakes(id) ON DELETE CASCADE,
    consent_type VARCHAR(50) NOT NULL, -- 'elder_consent' or 'no_impersonation'
    consented BOOLEAN NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create message_logs table for tracking sent messages
CREATE TABLE IF NOT EXISTS message_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intake_id UUID NOT NULL REFERENCES intakes(id) ON DELETE CASCADE,
    twilio_message_sid VARCHAR(255),
    status message_status NOT NULL,
    sent_to VARCHAR(20) NOT NULL,
    message_content TEXT,
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_intakes_status ON intakes(status);
CREATE INDEX IF NOT EXISTS idx_intakes_created_at ON intakes(created_at);
CREATE INDEX IF NOT EXISTS idx_intakes_elder_phone ON intakes(elder_phone);
CREATE INDEX IF NOT EXISTS idx_consent_logs_intake_id ON consent_logs(intake_id);
CREATE INDEX IF NOT EXISTS idx_consent_logs_created_at ON consent_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_message_logs_intake_id ON message_logs(intake_id);
CREATE INDEX IF NOT EXISTS idx_message_logs_status ON message_logs(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at on intakes
DROP TRIGGER IF EXISTS update_intakes_updated_at ON intakes;
CREATE TRIGGER update_intakes_updated_at BEFORE UPDATE ON intakes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_logs ENABLE ROW LEVEL SECURITY;

-- Public insert access for intakes (form submissions)
CREATE POLICY "Public insert access for intakes" ON intakes
    FOR INSERT WITH CHECK (true);

-- Public insert access for consent_logs (for audit trail)
CREATE POLICY "Public insert access for consent_logs" ON consent_logs
    FOR INSERT WITH CHECK (true);

-- Admin access policies (will be managed by Supabase Auth)
-- For now, allow authenticated users to read all data
-- In production, you should restrict this based on user roles
CREATE POLICY "Authenticated read access for intakes" ON intakes
    FOR SELECT USING (true);

CREATE POLICY "Authenticated read access for consent_logs" ON consent_logs
    FOR SELECT USING (true);

CREATE POLICY "Authenticated read access for message_logs" ON message_logs
    FOR SELECT USING (true);

-- Retention: Add retention_date column for automatic cleanup (optional)
-- This can be used to automatically delete old records
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS retention_date TIMESTAMP WITH TIME ZONE 
    GENERATED ALWAYS AS (created_at + INTERVAL '2 years') STORED;

ALTER TABLE consent_logs ADD COLUMN IF NOT EXISTS retention_date TIMESTAMP WITH TIME ZONE 
    GENERATED ALWAYS AS (created_at + INTERVAL '2 years') STORED;

ALTER TABLE message_logs ADD COLUMN IF NOT EXISTS retention_date TIMESTAMP WITH TIME ZONE 
    GENERATED ALWAYS AS (created_at + INTERVAL '2 years') STORED;

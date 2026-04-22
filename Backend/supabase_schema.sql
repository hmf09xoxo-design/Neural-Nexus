-- HMF Shield — Complete Supabase Schema
-- Paste this entire file into Supabase SQL Editor and click Run

-- Enable UUID extension (already enabled in Supabase by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name   TEXT,
    role        TEXT NOT NULL DEFAULT 'analyst',
    organization_name TEXT,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_users_email ON users (email);

-- ============================================================
-- API KEYS
-- ============================================================
CREATE TABLE IF NOT EXISTS api_keys (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    api_key     TEXT UNIQUE NOT NULL,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at  TIMESTAMPTZ NOT NULL,
    revoked_at  TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS ix_api_keys_user_id  ON api_keys (user_id);
CREATE INDEX IF NOT EXISTS ix_api_keys_api_key  ON api_keys (api_key);

-- ============================================================
-- PHISHING REQUESTS  (SMS + Email source)
-- ============================================================
CREATE TABLE IF NOT EXISTS phishing_requests (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID,
    text        TEXT NOT NULL,
    source      TEXT NOT NULL,   -- 'sms' | 'email'
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS phishing_analysis (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id  UUID UNIQUE NOT NULL REFERENCES phishing_requests(id) ON DELETE CASCADE,
    link_count  INTEGER NOT NULL DEFAULT 0,
    urgency_score FLOAT NOT NULL DEFAULT 0.0,
    status      TEXT NOT NULL DEFAULT 'processing',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sms_threat_results (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id  UUID UNIQUE NOT NULL REFERENCES phishing_requests(id) ON DELETE CASCADE,
    result      TEXT NOT NULL,
    prediction  TEXT NOT NULL,
    explanation TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_threat_results (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id  UUID UNIQUE NOT NULL REFERENCES phishing_requests(id) ON DELETE CASCADE,
    result      TEXT NOT NULL,
    prediction  TEXT NOT NULL,
    explanation TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CONFIRMED FRAUD CASES
-- ============================================================
CREATE TABLE IF NOT EXISTS confirmed_fraud_cases (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id  UUID REFERENCES phishing_requests(id) ON DELETE SET NULL,
    user_id     UUID,
    text        TEXT NOT NULL,
    fraud_label TEXT NOT NULL DEFAULT 'phishing',
    source      TEXT NOT NULL DEFAULT 'sms',
    vector_id   TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- FEEDBACK TABLES
-- ============================================================
CREATE TABLE IF NOT EXISTS sms_feedback (
    id               SERIAL PRIMARY KEY,
    analysis_id      TEXT NOT NULL,
    input_hash       CHAR(64) NOT NULL,
    model_prediction TEXT NOT NULL,
    human_label      TEXT NOT NULL,
    model_confidence FLOAT NOT NULL,
    feedback_type    TEXT NOT NULL,
    notes            TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_sms_feedback_analysis_id  ON sms_feedback (analysis_id);
CREATE INDEX IF NOT EXISTS ix_sms_feedback_input_hash   ON sms_feedback (input_hash);

CREATE TABLE IF NOT EXISTS email_feedback (
    id               SERIAL PRIMARY KEY,
    analysis_id      TEXT NOT NULL,
    input_hash       CHAR(64) NOT NULL,
    model_prediction TEXT NOT NULL,
    human_label      TEXT NOT NULL,
    model_confidence FLOAT NOT NULL,
    feedback_type    TEXT NOT NULL,
    notes            TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_email_feedback_analysis_id ON email_feedback (analysis_id);
CREATE INDEX IF NOT EXISTS ix_email_feedback_input_hash  ON email_feedback (input_hash);

-- ============================================================
-- URL ANALYSIS
-- ============================================================
CREATE TABLE IF NOT EXISTS url_analysis_requests (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id        UUID,
    source_url     TEXT NOT NULL,
    normalized_url TEXT NOT NULL,
    status         TEXT NOT NULL DEFAULT 'processing',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS url_threat_results (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id  UUID UNIQUE NOT NULL REFERENCES url_analysis_requests(id) ON DELETE CASCADE,
    result      TEXT NOT NULL,
    prediction  TEXT NOT NULL,
    explanation TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS url_feedback (
    id                       SERIAL PRIMARY KEY,
    analysis_id              TEXT NOT NULL,
    user_id                  UUID,
    normalized_url           TEXT NOT NULL,
    model_prediction         TEXT NOT NULL,
    model_risk_score         FLOAT NOT NULL,
    model_phishing_probability FLOAT NOT NULL,
    human_label              TEXT NOT NULL,
    prediction_type          TEXT NOT NULL,
    notes                    TEXT,
    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_url_feedback_analysis_id ON url_feedback (analysis_id);

-- ============================================================
-- VOICE ANALYSIS
-- ============================================================
CREATE TABLE IF NOT EXISTS voice_requests (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    filename    TEXT NOT NULL,
    mime_type   TEXT,
    file_size   INTEGER NOT NULL DEFAULT 0,
    transcript  TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'transcribed',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS voice_analysis (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id    UUID UNIQUE NOT NULL REFERENCES voice_requests(id) ON DELETE CASCADE,
    voice_result  TEXT NOT NULL,
    fraud_report  TEXT NOT NULL,
    status        TEXT NOT NULL DEFAULT 'completed',
    error_message TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ATTACHMENT ANALYSIS
-- ============================================================
CREATE TABLE IF NOT EXISTS attachment_requests (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    filename    TEXT NOT NULL,
    mime_type   TEXT,
    file_size   INTEGER NOT NULL DEFAULT 0,
    s3_url      TEXT,
    status      TEXT NOT NULL DEFAULT 'uploaded',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attachment_analysis (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id    UUID UNIQUE NOT NULL REFERENCES attachment_requests(id) ON DELETE CASCADE,
    final_verdict TEXT NOT NULL DEFAULT 'unknown',
    engines       TEXT NOT NULL,
    features      TEXT NOT NULL,
    status        TEXT NOT NULL DEFAULT 'completed',
    error_message TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PORTAL CHATS
-- ============================================================
CREATE TABLE IF NOT EXISTS portal_chats (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    title       TEXT NOT NULL DEFAULT 'New Chat',
    messages    TEXT NOT NULL DEFAULT '[]',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_portal_chats_user_id ON portal_chats (user_id);

-- ============================================================
-- Auto-update updated_at on users and portal_chats
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_portal_chats_updated_at ON portal_chats;
CREATE TRIGGER trg_portal_chats_updated_at
    BEFORE UPDATE ON portal_chats
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

# Dignity Dialogue

A complete Next.js + TypeScript web application that provides a professional, responsive site and a secure intake workflow for arranging compassionate companion messages to elderly people.

## 🌟 Features

- **Complete Intake System**: Secure form with reCAPTCHA, validation, and consent tracking
- **Background Worker**: Processes queued messages via Twilio (with stubbing support)
- **Admin Dashboard**: Protected authentication, view intakes, consent logs, and message logs with CSV export
- **Privacy Compliant**: Twilio-compliant privacy policy with opt-in/opt-out mechanisms
- **Production Ready**: Docker containerization, deployment scripts, and comprehensive testing

## 📋 Requirements

- Node.js 18+
- Supabase account
- Docker (for deployment)
- Twilio account (optional - worker stubs if not configured)
- Google reCAPTCHA keys (optional - can be disabled in development)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd dignitydialoguecom
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Note your project URL and API keys from Settings → API

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# reCAPTCHA Configuration (optional in development)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Twilio Configuration (optional - worker will stub if not provided)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
dignitydialoguecom/
├── src/
│   ├── app/
│   │   ├── about/          # About page
│   │   ├── services/        # Services page
│   │   ├── intake/          # Intake form page
│   │   ├── privacy/         # Privacy policy (Twilio-compliant)
│   │   ├── admin/           # Admin dashboard (protected)
│   │   └── api/
│   │       └── intake/      # Intake API route
│   ├── components/          # Reusable UI components
│   └── lib/
│       └── supabase.ts      # Supabase client and helpers
├── worker/
│   └── sendMessages.js      # Background worker for Twilio
├── supabase/
│   └── schema.sql           # Database schema migration
├── scripts/
│   └── deploy-dokploy.sh    # Deployment script
├── __tests__/               # Unit and integration tests
├── Dockerfile               # Production Docker image
├── docker-compose.yml       # Docker Compose configuration
└── .env.example             # Environment variables template
```

## 🗄️ Database Schema

The application uses Supabase with the following main tables:

- **intakes**: Intake form submissions with all field data
- **consent_logs**: Audit trail of consent acknowledgments (IP, timestamp, user agent)
- **message_logs**: Logs of sent messages, Twilio SIDs, and delivery status

See `supabase/schema.sql` for the complete schema with indexes and retention policies.

## 🔐 Admin Dashboard

The admin dashboard at `/admin` requires Supabase authentication:

1. Create an admin user in Supabase Auth
2. Log in at `/admin`
3. View intakes, consent logs, and message logs
4. Export data to CSV

## 🤖 Background Worker

The worker script (`worker/sendMessages.js`) processes queued messages:

1. Reads intakes with status `queued`
2. Verifies consent records
3. Checks for impersonation attempts (rejects if detected)
4. Generates compliant messages
5. Sends via Twilio (or stubs if not configured)
6. Updates status and creates message logs

### Running the Worker

**Option 1: Manual**
```bash
npm run worker
```

**Option 2: Cron Job**
```bash
# Add to crontab (runs every 5 minutes)
*/5 * * * * cd /path/to/dignitydialoguecom && npm run worker
```

**Option 3: Separate Docker Container**
See the commented section in `docker-compose.yml`

### Twilio Setup

1. Sign up at [twilio.com](https://www.twilio.com)
2. Get a phone number with SMS capability
3. Note your Account SID and Auth Token
4. Set environment variables:
   ```bash
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

**Important**: 
- The worker **will not impersonate relatives**. All messages identify Dignity Dialogue as the sender.
- Messages include opt-out instructions (reply "STOP")
- If Twilio credentials are missing, the worker logs what would be sent (stub mode)

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t dignitydialogue:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

## 📤 Deploy to Dokploy

### 1. Build and Push Image

Use the provided script:

```bash
chmod +x scripts/deploy-dokploy.sh
./scripts/deploy-dokploy.sh
```

Or manually:

```bash
# Build
docker build -t dignitydialogue:latest .

# Tag
docker tag dignitydialogue:latest dignitydialogue/dignitydialogue:latest

# Push
docker push dignitydialogue/dignitydialogue:latest
```

### 2. Configure Dokploy

1. Log in to Dokploy dashboard
2. Create new application
3. Select "Docker Image"
4. Enter image: `dignitydialogue/dignitydialogue:latest`
5. Set port: `3000`
6. Configure domain: `dignitydialogue.com`

### 3. Set Environment Variables (Dokploy Secrets)

**⚠️ CRITICAL: Use Dokploy's secrets management. Do NOT commit secrets to the repository.**

Set these as secrets in Dokploy:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
NEXT_PUBLIC_APP_URL=https://dignitydialogue.com
```

**Sample Dokploy command** (replace with actual values):
```bash
# In Dokploy UI, go to Application → Secrets
# Add each variable as a secret
# Or use Dokploy CLI if available
```

### 4. Configure Worker

The worker should run separately:

1. **Option A**: Set up a cron job on the Dokploy server
2. **Option B**: Deploy as a separate Dokploy application
3. **Option C**: Use a separate service container

## 🧪 Testing

Run tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

Tests cover:
- API validation
- Supabase integration (mocked)
- Worker message processing
- Impersonation detection
- Consent verification

## 📄 Pages

- **/** - Homepage
- **/about** - About page
- **/services** - Services overview
- **/intake** - Intake form (with reCAPTCHA)
- **/privacy** - Privacy policy (Twilio-compliant)
- **/admin** - Admin dashboard (protected)

## 🔒 Security Features

- **Server-side validation** for all intake submissions
- **reCAPTCHA** protection against bots
- **Consent audit logs** with IP addresses and timestamps
- **Impersonation detection** - worker rejects attempts to impersonate relatives
- **Row-level security** (RLS) in Supabase
- **Environment variable** secrets management
- **E.164 phone validation**

## 📝 Privacy & Compliance

- **Twilio-compliant privacy policy** at `/privacy`
- **Explicit consent** required and logged
- **Opt-out mechanism** via "STOP" reply
- **Data retention**: 2 years (configurable in schema)
- **No impersonation**: All messages identify Dignity Dialogue

## 🛠️ Development

### Adding New Features

1. Database changes: Update `supabase/schema.sql` and run in Supabase SQL Editor
2. API routes: Add to `src/app/api/`
3. Pages: Add to `src/app/`
4. Components: Add to `src/components/`

### Environment Variables

Never commit `.env.local` or `.env.production` to version control. Use:
- `.env.example` for documentation
- Dokploy secrets for production
- `.env.local` for local development (gitignored)

## 📞 Support

For issues or questions:
- Check the [Privacy Policy](/privacy) for data handling
- Review [Twilio Setup](#twilio-setup) for message configuration
- See [Admin Dashboard](#admin-dashboard) for data access

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for Dignity Dialogue - Lending an Ear, Mending a Heart.**

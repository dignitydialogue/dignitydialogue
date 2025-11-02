# DignityDialogue Deployment Guide

## 🚀 **Production Deployment to dignitydialogue.com**

### **Prerequisites**

1. **Supabase Account** with project created
2. **Dokploy Account** for deployment
3. **Domain**: dignitydialogue.com
4. **Docker Hub Account** (or other container registry)

---

## 📋 **Step 1: Supabase Setup**

### **1. Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### **2. Set Up Database**
1. Go to SQL Editor in your Supabase project
2. Copy and paste the contents of `supabase/schema.sql`
3. Run the SQL script to create all tables

### **3. Configure Row Level Security (RLS)**
The schema.sql file includes RLS policies. Make sure they're enabled:
```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

---

## 🔧 **Step 2: Environment Configuration**

### **1. Update Environment Variables**
Edit `.env.production` with your actual values:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application Configuration
NEXT_PUBLIC_APP_URL=https://dignitydialogue.com
NEXT_PUBLIC_COMPANY_NAME=DignityDialogue
NEXT_PUBLIC_COMPANY_EMAIL=contact@dignitydialogue.com
NEXT_PUBLIC_COMPANY_PHONE=+15551234567

# ZAI Configuration
ZAI_API_KEY=your_zai_api_key

# Security
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=https://dignitydialogue.com
```

### **2. Generate NEXTAUTH_SECRET**
```bash
openssl rand -base64 32
```

---

## 🐳 **Step 3: Docker Build and Push**

### **1. Build Docker Image**
```bash
# Build the image
docker build -t dignitydialogue:latest .

# Tag for your registry
docker tag dignitydialogue:latest yourusername/dignitydialogue:latest
```

### **2. Push to Registry**
```bash
# Push to Docker Hub
docker push yourusername/dignitydialogue:latest
```

---

## 🚀 **Step 4: Dokploy Deployment**

### **1. Create New Application**
1. Log in to your Dokploy dashboard
2. Click "New Application"
3. Select "Docker Image"

### **2. Configure Application**
- **Image Name**: `yourusername/dignitydialogue:latest`
- **Port**: `3000`
- **Domain**: `dignitydialogue.com`

### **3. Set Environment Variables**
Add all variables from `.env.production` to Dokploy

### **4. Configure Health Check**
- **Path**: `/`
- **Port**: `3000`
- **Interval**: `30s`

### **5. Deploy**
Click "Deploy" and wait for the build to complete

---

## 🌐 **Step 5: Domain Configuration**

### **1. DNS Settings**
Point your domain `dignitydialogue.com` to Dokploy's IP address:
```
A Record: @ -> DOKPLOY_IP_ADDRESS
```

### **2. SSL Certificate**
Dokploy will automatically provision SSL certificates for your domain

---

## 🧪 **Step 6: Testing**

### **1. Basic Functionality**
- Visit `https://dignitydialogue.com`
- Test navigation between pages
- Verify responsive design

### **2. Form Submissions**
- Test the "Request a Call" form
- Test the "Contact Us" form
- Check Supabase dashboard for submissions

### **3. Database Connection**
- Check Supabase logs for any errors
- Verify data is being saved correctly

---

## 🔍 **Step 7: Monitoring**

### **1. Application Logs**
Check logs in Dokploy dashboard for any errors

### **2. Database Monitoring**
Monitor your Supabase project for:
- Database usage
- API requests
- Error rates

### **3. Performance**
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Check mobile responsiveness

---

## 🛠️ **Troubleshooting**

### **Common Issues**

#### **1. Database Connection Errors**
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### **2. Build Failures**
```bash
# Check Docker build logs
docker build -t dignitydialogue:latest . --no-cache
```

#### **3. Form Submissions Not Working**
- Check Supabase RLS policies
- Verify API endpoints are accessible
- Check browser console for errors

#### **4. Domain Not Resolving**
- Verify DNS settings
- Check propagation time (up to 48 hours)
- Confirm SSL certificate status

---

## 📝 **Maintenance**

### **Regular Tasks**
1. **Update Dependencies**: Monthly
2. **Database Backups**: Weekly (Supabase handles this)
3. **SSL Renewal**: Automatic (handled by Dokploy)
4. **Performance Monitoring**: Weekly

### **Security**
1. **Update Dependencies**: Regularly
2. **Monitor Access Logs**: Weekly
3. **Review RLS Policies**: Quarterly
4. **Update Secrets**: Annually

---

## 🚀 **Quick Deploy Commands**

```bash
# Build and deploy
docker build -t dignitydialogue:latest .
docker tag dignitydialogue:latest yourusername/dignitydialogue:latest
docker push yourusername/dignitydialogue:latest

# Trigger Dokploy deployment (if using webhook)
curl -X POST https://dokploy.com/webhook/your-webhook-url
```

---

## 📞 **Support**

If you encounter issues:

1. **Application Issues**: Check Dokploy logs
2. **Database Issues**: Check Supabase dashboard
3. **Domain Issues**: Check DNS settings
4. **Performance Issues**: Use browser dev tools

---

## ✅ **Deployment Checklist**

- [ ] Supabase project created and schema applied
- [ ] Environment variables configured
- [ ] Docker image built and pushed
- [ ] Dokploy application configured
- [ ] Domain pointed to Dokploy
- [ ] SSL certificate active
- [ ] Forms tested and working
- [ ] Database connectivity verified
- [ ] Performance optimized
- [ ] Monitoring set up

---

**🎉 Your DignityDialogue website is now live at dignitydialogue.com!**
# 🚀 Quick Start Guide - DignityDialogue

## ⚡ **Fast Track to Deployment**

### **1. Set Up Supabase (5 minutes)**
1. Go to [supabase.com](https://supabase.com) → Create Project
2. Copy SQL from `supabase/schema.sql` → Run in SQL Editor
3. Copy Project URL + Keys from Settings

### **2. Update Environment (2 minutes)**
Edit `.env.production`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXTAUTH_SECRET=your_random_secret
```

### **3. Build & Deploy (5 minutes)**
```bash
# Build Docker image
docker build -t dignitydialogue:latest .

# Tag & Push
docker tag dignitydialogue:latest yourusername/dignitydialogue:latest
docker push yourusername/dignitydialogue:latest

# Deploy to Dokploy
# - New App → Docker Image
# - Image: yourusername/dignitydialogue:latest
# - Port: 3000
# - Domain: dignitydialogue.com
```

### **4. Configure Domain (2 minutes)**
- Point `dignitydialogue.com` A-record to Dokploy IP
- SSL auto-provisioned by Dokploy

## 🎯 **Total Time: ~15 minutes**

## ✅ **You're Live!**

Your website is now at **https://dignitydialogue.com**

### **Test It:**
- ✅ Fill out the "Request a Call" form
- ✅ Check submissions in Supabase Table Editor
- ✅ Test mobile responsiveness
- ✅ Verify all pages work

---

## 📱 **What You Have**

- **Homepage**: Hero section + call-to-action
- **Request Form**: Full companion request with validation
- **Contact Form**: Simple contact submission
- **Legal Pages**: Privacy Policy + Terms of Service
- **Database**: All submissions saved to Supabase
- **Responsive**: Works on all devices
- **Secure**: SSL + security headers

---

## 🔧 **If Something Goes Wrong**

| Issue | Solution |
|-------|----------|
| Build fails | Run `docker build --no-cache -t dignitydialogue:latest .` |
| Forms not working | Check Supabase URL/keys in environment |
| Domain not working | Verify DNS A-record points to Dokploy IP |
| Database errors | Ensure SQL schema was applied in Supabase |

---

## 📊 **Monitor Your Site**

- **Dokploy**: Application logs & health
- **Supabase**: Database & submissions
- **Browser**: Form submissions & errors

---

**🎉 Done! Your DignityDialogue website is live and helping seniors!**
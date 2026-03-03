# 🚀 Deployment Guide

Complete guide to deploy your Divya and Sumit engagement website.

## 🌟 Quick Deployment Options

### 1. GitHub Pages (Easiest)
**Free hosting directly from GitHub**

```bash
# Step 1: Initialize Git (if not done)
git init
git add .
git commit -m "Initial commit - Divya and Sumit Engagement Website"

# Step 2: Create GitHub Repository
# Go to github.com → Create new repository named "divya-sumit-engagement"

# Step 3: Push to GitHub
git remote add origin https://github.com/yourusername/divya-sumit-engagement.git
git branch -M main
git push -u origin main

# Step 4: Enable GitHub Pages
# Go to repository → Settings → Pages
# Source: Deploy from a branch → Branch: main
# Save and visit: https://yourusername.github.io/divya-sumit-engagement/
```

### 2. Netlify (Recommended)
**Free hosting with custom domain support**

```bash
# Option A: Drag & Drop
1. Go to netlify.com
2. Drag your entire project folder onto the deployment area
3. Get instant live site

# Option B: GitHub Integration
1. Connect your GitHub account to Netlify
2. Select "divya-sumit-engagement" repository
3. Deploy automatically
```

### 3. Vercel (Professional)
**Free hosting with great performance**

```bash
# Step 1: Install Vercel CLI
npm i -g vercel

# Step 2: Deploy
vercel --prod

# Or use Vercel dashboard:
# 1. Go to vercel.com
# 2. Import GitHub repository
# 3. Deploy automatically
```

### 4. Firebase Hosting
**Google's free hosting solution**

```bash
# Step 1: Install Firebase CLI
npm install -g firebase-tools

# Step 2: Initialize Firebase
firebase init hosting
firebase deploy

# Or use Firebase Console:
# 1. Go to console.firebase.com
# 2. Create new project
# 3. Upload files to Hosting
```

## 📋 Pre-Deployment Checklist

### ✅ Required Files
- [ ] `index.html` - Main page
- [ ] `style.css` - All styles
- [ ] `script.js` - JavaScript functionality
- [ ] `assets/` folder - Images and music
- [ ] `.gitignore` - Git ignore rules

### 🖼️ Assets Preparation
- [ ] `divya-sumit-engagement.jpg` - Main invitation
- [ ] `couple-image.jpg` - Couple photo
- [ ] Music files in `assets/music/` (optional)

### 🔧 Configuration Check
- [ ] All image paths correct
- [ ] Music player working
- [ ] Countdown shows correct date
- [ ] Mobile responsive design
- [ ] All themes working

## 🎯 Custom Domain Setup

### GitHub Pages Custom Domain
```bash
# 1. Create CNAME file
echo "yourdomain.com" > CNAME

# 2. Add to repository root
git add CNAME
git commit -m "Add custom domain"
git push

# 3. Configure DNS
# Add CNAME record: www → yourusername.github.io
# Add A record: @ → 185.199.108.153
```

### Netlify Custom Domain
1. Go to Netlify dashboard
2. Site settings → Domain management
3. Add custom domain
4. Update DNS records as provided

### Vercel Custom Domain
1. Go to Vercel dashboard
2. Project settings → Domains
3. Add custom domain
4. Update DNS records

## 🔍 SEO Optimization

### Meta Tags (Already Included)
```html
<!-- Open Graph tags for social sharing -->
<meta property="og:title" content="Divya and Sumit Engagement">
<meta property="og:description" content="Join us for our beautiful engagement celebration">
<meta property="og:image" content="./assets/divya-sumit-engagement.jpg">

<!-- Twitter cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Divya and Sumit Engagement">
```

### Sitemap (Optional)
```xml
<!-- Create sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>2026-03-04</lastmod>
        <priority>1.0</priority>
    </url>
</urlset>
```

## 📊 Performance Tips

### Image Optimization
```bash
# Compress images before upload
# Use tools like: TinyPNG, ImageOptim, Squoosh

# Recommended sizes:
# Couple image: 800x500px
# Invitation card: 400x600px (thumbnail), 800x1200px (full)
```

### Code Optimization
- ✅ Minified CSS and JS
- ✅ Optimized images
- ✅ Lazy loading enabled
- ✅ Efficient animations

## 🔒 Security Considerations

### HTTPS
- ✅ All platforms provide free SSL
- ✅ No mixed content warnings
- ✅ Secure resources only

### Content Security
- ✅ No sensitive data in frontend
- ✅ Safe file upload handling
- ✅ XSS protection in place

## 📱 Mobile Optimization

### Testing
```bash
# Test on different devices:
# - Chrome DevTools device simulation
# - Real iPhone/Android testing
# - BrowserStack (free tier available)
```

### Performance
- ✅ Touch-friendly buttons
- ✅ Proper viewport meta tag
- ✅ Fast loading on mobile
- ✅ Responsive images

## 🎉 Post-Deployment

### Testing Checklist
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Music player works
- [ ] Countdown shows correct time
- [ ] Mobile responsive
- [ ] All themes switch
- [ ] Gallery filters work
- [ ] Download buttons work

### Monitoring
- **Google Analytics** - Add tracking code
- **Google Search Console** - Monitor indexing
- **Uptime monitoring** - Use services like UptimeRobot

## 🆘 Troubleshooting

### Common Issues
**GitHub Pages 404 errors:**
- Ensure repository is public
- Check branch name (main vs master)
- Verify file paths

**Netlify build errors:**
- Check for absolute paths
- Verify all files included
- Check build logs

**Vercel deployment issues:**
- Verify vercel.json configuration
- Check for missing dependencies
- Review deployment logs

### Support Resources
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)

---

**🎉 Your beautiful engagement website is ready to share with the world!**

Deploy to any platform above and share the link with friends and family! 💕

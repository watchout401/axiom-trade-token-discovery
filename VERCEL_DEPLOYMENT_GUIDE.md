# 🚀 Vercel Deployment Guide

Deploy your Axiom Trade Token Discovery Table to Vercel in minutes!

---

## 📋 Prerequisites

- ✅ GitHub repository created and pushed
- ✅ Project builds successfully (`npm run build`)
- ✅ Vercel account (free tier works perfectly)

---

## 🎯 Method 1: Deploy via Vercel Dashboard (Recommended - Easiest)

### Step 1: Sign Up / Sign In to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** (recommended - easiest integration)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository

1. After logging in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"axiom-trade-token-discovery"** and click **"Import"**

### Step 3: Configure Project Settings

Vercel will auto-detect Next.js, but verify these settings:

**Framework Preset:** `Next.js` (should be auto-detected)

**Root Directory:** `./` (default - keep as is)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default - auto-detected)

**Install Command:** `npm install` (default)

**Environment Variables:** None needed for this project

### Step 4: Deploy!

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. 🎉 Your app will be live at: `https://axiom-trade-token-discovery.vercel.app` (or custom domain)

### Step 5: Verify Deployment

1. Click on your deployment
2. Click **"Visit"** to open your live site
3. Test all features:
   - ✅ Pulse page loads
   - ✅ Discover page loads
   - ✅ Sorting works
   - ✅ Modals open
   - ✅ Real-time updates work

---

## 🎯 Method 2: Deploy via Vercel CLI (Advanced)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

```bash
cd '/Users/watchout401/Downloads/Abhishek Folder/FirstSem/DSA/webfront/axiomsuite'
vercel
```

Answer the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time)
- **Project name?** → `axiom-trade-token-discovery`
- **Directory?** → `./` (press Enter)
- **Override settings?** → No

### Step 4: Production Deploy

```bash
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### Automatic Deployments

Vercel automatically deploys:
- ✅ Every push to `main` branch → Production
- ✅ Pull requests → Preview deployments

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment Variables (If Needed Later)

1. Go to Project Settings → Environment Variables
2. Add any required variables
3. Redeploy

---

## 📊 Performance Optimization

Vercel automatically provides:
- ✅ Edge Network (CDN)
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Serverless functions
- ✅ Analytics (optional)

**Your Lighthouse scores will likely improve on Vercel!**

---

## 🔄 Updating Your Deployment

### Automatic (Recommended)

Just push to GitHub:
```bash
git add .
git commit -m "feat: your update"
git push
```

Vercel will automatically:
1. Detect the push
2. Build the project
3. Deploy to production

### Manual

If you need to redeploy manually:
1. Go to Vercel Dashboard
2. Click on your project
3. Click **"Redeploy"** on the latest deployment

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads at Vercel URL
- [ ] Pulse page displays three columns
- [ ] Discover page table loads
- [ ] Sorting works
- [ ] Modals open correctly
- [ ] Real-time updates work
- [ ] Mobile responsive (test on phone)
- [ ] No console errors
- [ ] Lighthouse score (should be better than localhost)

---

## 🐛 Troubleshooting

### Build Fails

**Error: Build command failed**
- Check build logs in Vercel dashboard
- Verify `npm run build` works locally
- Check for TypeScript errors: `npm run lint`

**Error: Module not found**
- Ensure all dependencies are in `package.json`
- Check `node_modules` is in `.gitignore`

### Runtime Errors

**Error: Hydration mismatch**
- Already fixed in code ✅
- If persists, check browser console

**Error: Redux store not found**
- Verify `providers.tsx` wraps app correctly
- Check Redux setup

### Performance Issues

**Slow initial load**
- Check bundle size in Vercel Analytics
- Verify image optimization is working
- Check Network tab in browser DevTools

---

## 📝 Next Steps After Deployment

1. ✅ **Update README.md** with live demo link
2. ✅ **Test Lighthouse** on production URL (should score better!)
3. ✅ **Add to YouTube video** - show live deployment
4. ✅ **Share the link** in your project submission

---

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Your Repository](https://github.com/watchout401/axiom-trade-token-discovery)

---

## 🎉 Success!

Once deployed, your app will be live at:
**`https://axiom-trade-token-discovery.vercel.app`**

Or a custom domain if you configure one.

**Your deployment is now complete! 🚀**


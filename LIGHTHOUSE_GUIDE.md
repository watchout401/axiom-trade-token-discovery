# 🚀 Lighthouse Audit Guide - Target Score ≥90

This guide will help you run Lighthouse audits and achieve a score of **≥90** for both mobile and desktop.

---

## 📋 Prerequisites

1. **Production Build Running**
   - The app must be built and running in production mode
   - Development mode gives inaccurate scores

2. **Chrome/Chromium Browser**
   - Lighthouse is built into Chrome DevTools
   - Or use Lighthouse CLI (already installed)

---

## 🎯 Method 1: Chrome DevTools (Easiest - Recommended)

### Step 1: Build Production Version

```bash
cd axiomsuite
npm run build
npm run start
```

Wait for the server to start (usually `http://localhost:3000`)

### Step 2: Open Chrome DevTools

1. Open Chrome browser
2. Navigate to `http://localhost:3000/pulse` or `http://localhost:3000/discover`
3. Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows/Linux)
4. Click the **"Lighthouse"** tab (or press `Cmd+Shift+P` and type "Lighthouse")

### Step 3: Configure Lighthouse

1. **Select Mode:**
   - ✅ **Navigation** (default - tests full page load)
   
2. **Select Categories:**
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   
3. **Select Device:**
   - **Mobile** (for mobile audit)
   - **Desktop** (for desktop audit)

4. Click **"Analyze page load"**

### Step 4: Review Results

After analysis (30-60 seconds), you'll see:
- **Performance Score** (target: ≥90)
- **Accessibility Score** (target: ≥90)
- **Best Practices Score** (target: ≥90)
- **SEO Score** (target: ≥90)

### Step 5: Export Report

1. Click **"Export"** button (top right)
2. Choose format:
   - **HTML** (recommended - includes all details)
   - **JSON** (for programmatic analysis)

### Step 6: Fix Issues

Lighthouse will show:
- **Opportunities** (performance improvements)
- **Diagnostics** (additional information)
- **Passed audits** (what's working well)

**Common fixes for <90 scores:**
- Optimize images (already using Next.js Image ✅)
- Reduce unused JavaScript
- Minimize main-thread work
- Reduce render-blocking resources
- Improve Time to Interactive (TTI)

---

## 🎯 Method 2: Lighthouse CLI (Automated)

### Step 1: Start Production Server

```bash
npm run build
npm run start
```

### Step 2: Run Mobile Audit

```bash
npm run lighthouse:mobile
```

This will:
- Run Lighthouse on mobile preset
- Generate `lighthouse-mobile.html` report
- Open report in browser automatically

### Step 3: Run Desktop Audit

```bash
npm run lighthouse:desktop
```

This will:
- Run Lighthouse on desktop preset
- Generate `lighthouse-desktop.html` report
- Open report in browser automatically

### Step 4: Generate JSON Report (Optional)

```bash
npm run lighthouse:json
```

This creates `lighthouse-report.json` for programmatic analysis.

---

## 🎯 Method 3: Lighthouse CI (Advanced)

For continuous integration and automated testing:

### Step 1: Create Lighthouse CI Config

Create `.lighthouserc.js` in project root:

```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/pulse', 'http://localhost:3000/discover'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}],
      },
    },
  },
};
```

### Step 2: Run CI Audit

```bash
npm run lighthouse:ci
```

---

## 📊 Understanding Lighthouse Scores

### Performance Metrics (Target: ≥90)

Key metrics affecting Performance score:
- **First Contentful Paint (FCP)**: < 1.8s (good)
- **Largest Contentful Paint (LCP)**: < 2.5s (good)
- **Total Blocking Time (TBT)**: < 200ms (good)
- **Cumulative Layout Shift (CLS)**: < 0.1 (good)
- **Speed Index**: < 3.4s (good)

### Accessibility (Target: ≥90)

- ARIA labels
- Color contrast
- Keyboard navigation
- Screen reader support

### Best Practices (Target: ≥90)

- HTTPS usage
- No console errors
- Image aspect ratios
- Modern APIs

### SEO (Target: ≥90)

- Meta tags
- Semantic HTML
- Descriptive links
- Mobile-friendly

---

## 🔧 Quick Fixes for Common Issues

### If Performance < 90:

1. **Optimize Images**
   ```bash
   # Already using Next.js Image component ✅
   # Ensure all images use <Image> with proper sizing
   ```

2. **Reduce JavaScript Bundle**
   - Check `npm run build` output for bundle sizes
   - Consider code splitting if needed

3. **Enable Compression**
   - Vercel handles this automatically ✅
   - For local testing, ensure gzip is enabled

4. **Optimize Fonts**
   - Already using `next/font` with Inter ✅
   - Fonts are optimized automatically

### If Accessibility < 90:

1. **Add ARIA Labels**
   - Check all interactive elements
   - Ensure form inputs have labels

2. **Color Contrast**
   - Verify text meets WCAG AA standards
   - Use contrast checker tools

3. **Keyboard Navigation**
   - Test tab order
   - Ensure focus indicators visible

### If Best Practices < 90:

1. **Remove Console Errors**
   - Fix any React warnings
   - Remove `console.log` in production

2. **HTTPS**
   - Vercel provides HTTPS automatically ✅
   - Local testing may show warnings (OK)

---

## 📝 Recording Scores

After running audits, document your scores:

### Mobile Scores
- Performance: __/100
- Accessibility: __/100
- Best Practices: __/100
- SEO: __/100

### Desktop Scores
- Performance: __/100
- Accessibility: __/100
- Best Practices: __/100
- SEO: __/100

**Add these to your README.md!**

---

## 🎬 For Demo Video

When recording your YouTube demo:

1. **Show Lighthouse Audit:**
   - Open Chrome DevTools
   - Run Lighthouse audit
   - Show scores (≥90)
   - Highlight key metrics

2. **Show Performance:**
   - Demonstrate fast interactions (<100ms)
   - Show smooth animations
   - Show real-time updates

---

## 🚀 Quick Start Checklist

- [ ] Build production version: `npm run build && npm run start`
- [ ] Open `http://localhost:3000/pulse` in Chrome
- [ ] Open DevTools → Lighthouse tab
- [ ] Select "Mobile" preset
- [ ] Click "Analyze page load"
- [ ] Verify Performance ≥ 90
- [ ] Export report as HTML
- [ ] Repeat for Desktop preset
- [ ] Document scores in README
- [ ] Include in demo video

---

## 📚 Additional Resources

- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Next.js Performance Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)

---

**Need Help?** If scores are below 90, check the "Opportunities" section in Lighthouse report for specific recommendations.


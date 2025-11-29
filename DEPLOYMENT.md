# Deployment Guide

## Quick Deploy to Netlify

### Step 1: Prepare Questions Data

Before deploying, you MUST have `public/questions.json` with 213 questions.

**Option A: Use the conversion script**
```bash
npm install
npm run convert-pdf
```
Then manually verify and correct the output.

**Option B: Create manually**
Copy the format from `public/questions.json` and add all 213 questions.

### Step 2: Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and verify everything works.

### Step 3: Build

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Step 4: Deploy to Netlify

#### Method 1: Drag & Drop (Fastest)

1. Go to https://app.netlify.com/drop
2. Drag the `dist` folder onto the page
3. Done! Your site is live.

#### Method 2: Connect Git Repository (Best for updates)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Go to https://app.netlify.com/
3. Click "New site from Git"
4. Choose your Git provider
5. Select your repository
6. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18
7. Click "Deploy site"

#### Method 3: Netlify CLI

```bash
# Install CLI globally
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Step 5: Verify Deployment

1. Visit your Netlify URL
2. Test the intro modal
3. Answer a few questions
4. Test skip functionality
5. Test question navigation
6. Complete the exam and check results

## Troubleshooting

### Build Fails on Netlify

**Error: "questions.json not found"**
- Ensure `public/questions.json` exists in your repository
- Check that it's not in `.gitignore`

**Error: "Module not found"**
- Clear Netlify cache: Site settings > Build & deploy > Clear cache
- Redeploy

**Error: "Build exceeded time limit"**
- Check for infinite loops in code
- Ensure dependencies are in `dependencies`, not `devDependencies` if needed at runtime

### Site Loads but Questions Don't Appear

- Check browser console for errors
- Verify `questions.json` is accessible at `https://yoursite.netlify.app/questions.json`
- Ensure JSON is valid (no syntax errors)

### Blank Page After Deploy

- Check that `dist` is the publish directory
- Verify `netlify.toml` is in the root
- Check Netlify function logs for errors

## Custom Domain

1. In Netlify dashboard, go to Domain settings
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

## Environment Variables (if needed in future)

1. Netlify Dashboard > Site settings > Environment variables
2. Add key-value pairs
3. Redeploy site

## Performance Optimization

The app is already optimized with:
- ✅ Code splitting
- ✅ Minification
- ✅ Tree shaking
- ✅ Asset optimization
- ✅ Caching headers

## Security

Netlify automatically provides:
- ✅ HTTPS
- ✅ DDoS protection
- ✅ CDN distribution

Additional headers are configured in `netlify.toml`.

## Monitoring

- **Analytics**: Enable Netlify Analytics in site settings
- **Error tracking**: Add Sentry or similar service
- **Performance**: Use Lighthouse in Chrome DevTools

---

**Need help?** Check the main README.md or Netlify documentation.

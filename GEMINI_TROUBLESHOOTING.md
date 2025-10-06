# Gemini API Troubleshooting - Quick Guide

## Current Status

The Gemini API integration is **configured but not working on Vercel**. This guide will help you fix it.

## 🔴 Problem

Gemini-powered features (Dream Generator, Pattern Analyzer, Chatbot) show:
- "The dream generator is still waking up"
- "The pattern analyzer is still calibrating"
- "API key not configured" errors

## ✅ Solution (5 Minutes)

### Step 1: Verify Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Make sure you have an API key created
4. Copy the key (starts with `AIza...`)

### Step 2: Add to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Fill in:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: (paste your API key)
   - **Environments**: ✅ Check **ALL THREE** boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

6. Click **Save**

### Step 3: Redeploy (CRITICAL!)

**This is the most important step!** Environment variables only work after redeployment.

#### Option A: Via Vercel Dashboard
1. Go to **Deployments** tab
2. Click ⋯ (three dots) on latest deployment
3. Click **Redeploy**
4. Confirm

#### Option B: Via Git Push
```bash
git commit --allow-empty -m "chore: trigger redeploy for Gemini API"
git push origin main
```

### Step 4: Verify It Works

After ~2 minutes (deployment time):

1. Visit your live site: `https://your-site.vercel.app/work/latent-space`
2. Scroll to **Dream Fragment Generator** section
3. Try generating a dream
4. Should work! No more "waking up" messages

## 🔍 Still Not Working?

### Check Deployment Logs

1. Go to Vercel **Deployments** tab
2. Click on latest deployment
3. Click **Function Logs**
4. Look for these log messages:

```
[Dream Generator] Environment check: {
  hasKey: true,  ← Should be TRUE
  keyLength: 39, ← Should be ~39 characters
  keyPreview: 'AIza...xyz' ← Masked preview
}
```

**If `hasKey: false`**:
- You didn't redeploy after adding the variable
- Variable name is wrong (must be exactly `GEMINI_API_KEY`)
- Variable not set for Production environment

### Test API Key Validity

Run this in terminal to test your API key directly:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

**Should return**: JSON with generated text
**If error**: Your API key is invalid or expired

### Common Mistakes

❌ **Forgetting to redeploy** - Most common issue!
❌ **Only checking Production** - Must check all 3 environments
❌ **Using NEXT_PUBLIC_GEMINI_API_KEY** - Wrong! Server-side only, no prefix
❌ **Spaces in API key** - Copy carefully, no extra spaces
❌ **Old deployment still cached** - Force refresh browser (Ctrl+Shift+R)

## 📁 Local Development

Want to test locally first?

1. Create `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local`:
   ```
   GEMINI_API_KEY=AIza...your_actual_key_here
   ```

3. Restart dev server:
   ```bash
   npm run dev
   ```

4. Test at http://localhost:3000/work/latent-space

## 📚 Full Documentation

For complete setup guide with screenshots and CLI commands:
- See **[VERCEL_SETUP.md](./VERCEL_SETUP.md)**

## 🆘 Still Stuck?

1. Check [Gemini API Status](https://status.cloud.google.com/)
2. Regenerate your API key in Google AI Studio
3. Try with a fresh deployment
4. Check Vercel deployment logs for errors

## Expected Behavior After Fix

✅ Dream Generator creates AI-generated dream fragments
✅ Pattern Analyzer identifies themes and emotions
✅ Chatbot responds to portfolio questions
✅ No "still waking up" or "calibrating" messages
✅ Logs show `hasKey: true` in deployment logs

---

**Time to fix**: ~5 minutes
**Most critical step**: Redeploy after adding env var
**Key to check**: GEMINI_API_KEY (all environments)

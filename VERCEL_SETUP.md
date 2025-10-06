# Vercel Deployment Setup Guide

This guide explains how to configure environment variables for Gemini AI features on Vercel.

## Prerequisites

- A Vercel account with project deployed
- A Gemini API key from [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key)

## Quick Setup Checklist

- [ ] Get Gemini API key from Google AI Studio
- [ ] Add `GEMINI_API_KEY` to Vercel environment variables
- [ ] Select all environments (Production, Preview, Development)
- [ ] **Redeploy the application** (critical!)
- [ ] Verify in deployment logs

## Step-by-Step Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key (it looks like: `AIza...`)

**Important**: Keep this key secret! Never commit it to version control.

### 2. Add Environment Variable to Vercel

#### Via Vercel Dashboard:

1. Go to your project on [Vercel](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Click "Add New"
4. Enter the following:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key (paste the full key)
   - **Environments**: Select **ALL** (Production, Preview, Development)
5. Click "Save"

#### Via Vercel CLI:

```bash
# Add production variable
vercel env add GEMINI_API_KEY production

# Add preview variable
vercel env add GEMINI_API_KEY preview

# Add development variable
vercel env add GEMINI_API_KEY development
```

### 3. Redeploy Your Application

**This is the most critical step!** Environment variables only take effect on new deployments.

#### Option A: Trigger Redeploy via Dashboard

1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Select "Redeploy"
4. Confirm the redeploy

#### Option B: Trigger via Git Push

```bash
# Make a trivial change or use --allow-empty
git commit --allow-empty -m "chore: trigger redeploy for env vars"
git push origin main
```

#### Option C: Trigger via CLI

```bash
vercel --prod
```

### 4. Verify Setup

After redeployment, verify the setup:

1. **Check Deployment Logs**:
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Open **Function Logs**
   - Look for `[Dream Generator] Environment check:` or `[Pattern Analyzer] Environment check:`
   - You should see `hasKey: true` and a masked preview of your key

2. **Test the Features**:
   - Navigate to `/work/latent-space`
   - Try the **Dream Fragment Generator**
   - Try the **Pattern Analyzer**
   - Both should work without "API key not configured" errors

3. **Check Browser Console** (if issues persist):
   - Open Developer Tools (F12)
   - Go to Network tab
   - Try generating a dream fragment
   - Check the API response for error messages

## Troubleshooting

### Issue: "The dream generator is still waking up"

**Cause**: API key is not accessible to the serverless function.

**Solutions**:
1. Verify the variable name is exactly `GEMINI_API_KEY` (case-sensitive)
2. Ensure you selected all environments when adding the variable
3. **Redeploy the application** (variables don't apply to existing deployments)
4. Check deployment logs for environment check output

### Issue: "API key invalid" or authentication errors

**Cause**: The API key itself is invalid or has restrictions.

**Solutions**:
1. Regenerate the API key in [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Ensure there are no extra spaces or characters when copying
3. Check if the key has quota limits or restrictions
4. Verify the key has Gemini API access enabled

### Issue: Works locally but not on Vercel

**Cause**: Local `.env.local` works, but Vercel config missing.

**Solutions**:
1. Local env files (`.env.local`) are NOT deployed to Vercel
2. You must add variables separately in Vercel dashboard
3. Use `vercel env pull` to sync Vercel vars to local for testing

### Issue: Works on some deployments but not others

**Cause**: Environment variable not set for all environments.

**Solutions**:
1. Go to Settings → Environment Variables
2. Edit the `GEMINI_API_KEY` variable
3. Ensure all three checkboxes are checked:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. Save and redeploy

## Local Development

### Setup `.env.local`

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Pull Vercel Environment Variables

To sync your Vercel environment variables to local:

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local
```

## Security Best Practices

1. **Never commit API keys to Git**:
   - `.env.local` is in `.gitignore` by default
   - Only use `.env.local.example` as a template (without real keys)

2. **Use different keys for different environments**:
   - Consider using separate API keys for development and production
   - This allows you to track usage and revoke keys independently

3. **Rotate keys periodically**:
   - Regenerate API keys every few months
   - Update in Vercel and redeploy immediately

4. **Monitor API usage**:
   - Check [Google AI Studio](https://aistudio.google.com) for quota usage
   - Set up usage alerts if available

## API Features Using GEMINI_API_KEY

The following features require the Gemini API key:

1. **Portfolio Chatbot** (`/api/chat`)
   - Conversational AI about your portfolio
   - Accessible from the home page

2. **Dream Fragment Generator** (`/api/dream-generate`)
   - Real-time AI dream narrative generation
   - Located in Latent Space section

3. **Pattern Analyzer** (`/api/pattern-analyze`)
   - AI-powered dream pattern recognition
   - Located in Latent Space section

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Next.js Environment Variables Guide](https://nextjs.org/docs/pages/guides/environment-variables)

## Support

If you continue to experience issues:

1. Check the [Vercel deployment logs](https://vercel.com/docs/deployments/logs)
2. Review the [Gemini API status](https://status.cloud.google.com/)
3. Open an issue in the repository with:
   - Deployment logs (remove any sensitive info)
   - Browser console errors
   - Steps you've already tried

---

**Last Updated**: 2025-10-07
**Maintained by**: Nihar Sunkara

# Vercel Deployment Guide

This guide covers deploying the Amara application to Vercel, including setup, configuration, and troubleshooting.

## Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub repository (or GitLab/Bitbucket)
- All required environment variables documented

## Initial Setup

### 1. Connect Repository to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will auto-detect Next.js
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install` (or `npm install`)

### 2. Configure Environment Variables

In Vercel dashboard → Your Project → Settings → Environment Variables, add:

#### Required Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

#### Optional Variables (Recommended for Production)

```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-25
NEXT_PUBLIC_AMARA_STAFF_EMAIL_DOMAIN=amara-arabia.ae
```

**Important Notes:**
- Set variables for **Production**, **Preview**, and **Development** environments as needed
- `NEXT_PUBLIC_APP_URL` should match your production domain
- After adding variables, redeploy for changes to take effect

### 3. Configure Build Settings

Vercel should auto-detect Next.js, but verify:

- **Build Command**: `pnpm build` (or `npm run build`)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `pnpm install` (or `npm install`)

If using pnpm, ensure `packageManager` is set in `package.json` (already configured).

## Pre-Deployment Checks

Before deploying, run the automated checks:

```bash
# Run all checks
npm run check:deploy

# Or individually:
npm run check:env      # Validate environment variables
npm run check:types    # TypeScript type checking
npm run check:build    # Build verification
```

### Manual Testing

Follow the [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for comprehensive manual testing.

## Deployment Process

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Pushes to main/master branch
- **Preview**: Pull requests and other branches

### Manual Deployment

1. Go to Vercel dashboard → Your Project → Deployments
2. Click "Redeploy" for latest deployment
3. Or use Vercel CLI:
   ```bash
   npx vercel --prod
   ```

## Vercel-Specific Considerations

### Next.js Configuration

The `next.config.mjs` file is already configured with redirects:
- `/app/studio/*` → `/studio/*`

Vercel will automatically use this configuration.

### Middleware

The `middleware.ts` file handles:
- Session management via Supabase
- Route protection for `/dashboard/*`
- Cookie handling for authentication

Vercel Edge Runtime automatically handles middleware execution.

### API Routes

API routes in `src/app/api/` and route handlers in `src/app/*/route.ts` work automatically on Vercel:
- `/auth/callback` - Authentication callback
- `/blog/feed.xml` - RSS feed

### Static Assets

Static files in `public/` are automatically served by Vercel's CDN.

### Sanity Studio

The embedded Sanity Studio at `/studio` and `/dashboard/studio` works on Vercel. Ensure:
- Sanity project ID and dataset are configured
- CORS settings in Sanity allow your Vercel domain

## Environment-Specific Configuration

### Production Environment

- Set `NEXT_PUBLIC_APP_URL` to your production domain
- Use production Supabase project
- Use production Sanity dataset
- Enable secure cookies (automatic with `NODE_ENV=production`)

### Preview Environments

- Can use staging Supabase/Sanity projects
- `NEXT_PUBLIC_APP_URL` can be auto-detected from Vercel preview URL
- Good for testing before production deployment

## Troubleshooting

### Build Failures

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm run check:types` locally to identify issues
- Ensure all types are correct before pushing

**Issue**: Build fails with missing dependencies
- **Solution**: Check `package.json` dependencies
- Ensure `node_modules` is not committed (should be in `.gitignore`)

**Issue**: Build fails with environment variable errors
- **Solution**: Run `npm run check:env` locally
- Verify all required variables are set in Vercel dashboard

### Runtime Errors

**Issue**: "Missing environment variable" errors
- **Solution**: 
  - Check Vercel dashboard → Settings → Environment Variables
  - Ensure variables are set for correct environment (Production/Preview)
  - Redeploy after adding variables

**Issue**: Authentication not working
- **Solution**:
  - Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
  - Check Supabase dashboard for allowed redirect URLs
  - Ensure callback URL includes your Vercel domain
  - Check browser console for errors

**Issue**: Sanity content not loading
- **Solution**:
  - Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
  - Check Sanity CORS settings allow your Vercel domain
  - Verify API token permissions in Sanity

**Issue**: Images not loading
- **Solution**:
  - Check image paths are correct
  - Verify `public/` directory structure
  - Check network tab for 404 errors

### Performance Issues

**Issue**: Slow page loads
- **Solution**:
  - Check Vercel Analytics for performance metrics
  - Optimize images (use Next.js Image component)
  - Check bundle size (run `npm run build` and review output)
  - Enable Vercel's Edge Caching

**Issue**: Large build size
- **Solution**:
  - Review dependencies in `package.json`
  - Use dynamic imports for heavy components
  - Check for unnecessary dependencies

### Redirect Issues

**Issue**: Redirects not working
- **Solution**:
  - Verify `next.config.mjs` redirects are correct
  - Check Vercel deployment logs
  - Ensure redirects use `permanent: true` for 308 redirects

## Monitoring & Analytics

### Vercel Analytics

Enable Vercel Analytics in dashboard:
- Real-time performance metrics
- Web Vitals tracking
- Error tracking

### Logs

View deployment and runtime logs:
- Vercel dashboard → Your Project → Deployments → [Deployment] → Logs
- Use for debugging production issues

## CI/CD Integration

### GitHub Actions (Optional)

You can add GitHub Actions to run pre-deployment checks:

```yaml
# .github/workflows/pre-deploy.yml
name: Pre-Deployment Checks
on:
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm check:deploy
```

## Rollback

If a deployment has issues:

1. Go to Vercel dashboard → Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"

## Best Practices

1. **Always run pre-deployment checks** before merging to main
2. **Test in preview environments** before production
3. **Monitor Vercel Analytics** for performance issues
4. **Keep environment variables documented** in this guide
5. **Use feature flags** for gradual rollouts
6. **Set up error tracking** (Sentry, etc.) for production
7. **Regularly review build logs** for warnings

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

## Checklist Before First Production Deployment

- [ ] All environment variables set in Vercel
- [ ] `NEXT_PUBLIC_APP_URL` matches production domain
- [ ] Supabase redirect URLs include production domain
- [ ] Sanity CORS allows production domain
- [ ] All automated checks pass (`npm run check:deploy`)
- [ ] Manual testing complete (see DEPLOYMENT_CHECKLIST.md)
- [ ] Error tracking configured (optional but recommended)
- [ ] Analytics enabled (optional but recommended)
- [ ] Domain configured in Vercel (if using custom domain)


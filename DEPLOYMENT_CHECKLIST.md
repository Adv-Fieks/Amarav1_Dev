# Deployment Checklist

Use this checklist to manually verify critical functionality before deploying to Vercel production.

## Pre-Deployment Automated Checks

- [ ] Run `npm run check:deploy` (or `pnpm check:deploy`)
- [ ] All automated checks pass (environment variables, TypeScript, build)

## Environment Variables

- [ ] All required environment variables are set in Vercel dashboard:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Optional but recommended:
  - [ ] `NEXT_PUBLIC_APP_URL` (production domain)
  - [ ] `NEXT_PUBLIC_SANITY_API_VERSION` (if different from default)
  - [ ] `NEXT_PUBLIC_AMARA_STAFF_EMAIL_DOMAIN` (if using staff authentication)

## Public Routes (No Authentication Required)

### Homepage
- [ ] Navigate to `/` (homepage)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Logo cloud renders
- [ ] Testimonials section displays
- [ ] Pricing section loads (may be lazy-loaded)
- [ ] Footer displays correctly
- [ ] Navigation links work

### Company/Services Page
- [ ] Navigate to `/company`
- [ ] Page loads without errors
- [ ] All sections render correctly
- [ ] Images load properly
- [ ] Links and buttons function

### Blog
- [ ] Navigate to `/blog`
- [ ] Blog listing page loads
- [ ] Featured posts display (if any)
- [ ] Categories filter works
- [ ] Pagination works (if multiple pages)
- [ ] Click on a blog post
- [ ] Individual blog post page (`/blog/[slug]`) loads
- [ ] Post content renders correctly
- [ ] Images in blog posts load
- [ ] Related posts display (if applicable)

### Articles/Research
- [ ] Navigate to `/articles`
- [ ] Page loads without errors
- [ ] Content displays correctly

### Setup Guide
- [ ] Navigate to `/setup-guide`
- [ ] Page loads without errors
- [ ] All sections render (Header, Overview, Timeline, Requirements, Jurisdiction Comparison)
- [ ] Interactive elements work

### FAQ
- [ ] Navigate to `/faq`
- [ ] Page loads without errors
- [ ] FAQ items display correctly

### Proposals (Public)
- [ ] Navigate to `/proposals/[slug]` (if you have a test proposal)
- [ ] Proposal page loads
- [ ] Content renders correctly

## Authentication Flow

### Login Page
- [ ] Navigate to `/login`
- [ ] Login page loads without errors
- [ ] Email input field works
- [ ] Magic link option is available
- [ ] Password option appears for staff emails (if configured)
- [ ] Error messages display correctly (test with invalid input)

### Magic Link Authentication
- [ ] Enter a valid email address
- [ ] Click "Send magic link"
- [ ] Success message appears
- [ ] Check email for magic link
- [ ] Click magic link in email
- [ ] Redirected to `/auth/callback`
- [ ] Successfully redirected to `/dashboard`
- [ ] Session is established (check browser cookies)

### Staff Password Authentication (if configured)
- [ ] Enter staff email (matching `NEXT_PUBLIC_AMARA_STAFF_EMAIL_DOMAIN`)
- [ ] Password field appears
- [ ] Enter valid password
- [ ] Successfully log in
- [ ] Redirected to `/dashboard`

### Auth Callback Error Handling
- [ ] Navigate to `/auth/callback?error=test_error`
- [ ] Redirected to `/login` with error message
- [ ] Error message displays correctly

## Protected Routes (Require Authentication)

### Dashboard Access Control
- [ ] Navigate to `/dashboard` while logged out
- [ ] Redirected to `/login?error=unauthorized`
- [ ] After login, navigate to `/dashboard`
- [ ] Dashboard loads successfully
- [ ] User sees dashboard content

### Dashboard Pages
- [ ] `/dashboard` - Main dashboard loads
- [ ] `/dashboard/templates` - Templates page loads
- [ ] `/dashboard/guides` - Guides page loads
- [ ] `/dashboard/proposals` - Proposals page loads
- [ ] `/dashboard/admin` - Admin page loads (if accessible)
- [ ] `/dashboard/studio` - Sanity Studio loads (if accessible)

### Middleware Protection
- [ ] While logged out, try accessing `/dashboard/*` routes directly
- [ ] All protected routes redirect to `/login`
- [ ] After login, all dashboard routes are accessible

## API Routes

### Auth Callback API
- [ ] `/auth/callback` handles successful authentication
- [ ] `/auth/callback` handles errors gracefully
- [ ] Redirects work correctly for both success and error cases

### RSS Feed
- [ ] Navigate to `/blog/feed.xml`
- [ ] RSS feed loads (check browser or use curl)
- [ ] Feed is valid XML
- [ ] Feed contains blog posts
- [ ] Feed items have required fields (title, link, description, date)
- [ ] Images in feed are properly formatted

## Sanity CMS Integration

### Sanity Studio
- [ ] Navigate to `/studio` or `/dashboard/studio`
- [ ] Sanity Studio loads
- [ ] Can authenticate with Sanity (if required)
- [ ] Can view content
- [ ] Can edit content (test with a non-critical change)
- [ ] Changes save successfully

### Content Fetching
- [ ] Blog posts load from Sanity
- [ ] Images from Sanity load correctly
- [ ] Content updates reflect on the site (may require cache refresh)

## Error Handling

### 404 Pages
- [ ] Navigate to a non-existent route (e.g., `/nonexistent`)
- [ ] 404 page displays (or Next.js default 404)

### Error Boundaries
- [ ] Test error scenarios (if error boundaries are implemented)
- [ ] Errors are handled gracefully

## Redirects

- [ ] Navigate to `/app/studio/*` (old path)
- [ ] Redirects to `/studio/*` (as configured in `next.config.mjs`)

## Performance & Assets

### Static Assets
- [ ] Images load correctly
- [ ] Fonts load correctly
- [ ] CSS styles apply correctly
- [ ] JavaScript executes without console errors

### Build Output
- [ ] Check browser console for errors
- [ ] Check network tab for failed requests
- [ ] Verify no 404s for static assets

## Browser Compatibility

Test in at least:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browser (iOS Safari or Chrome)

## Post-Deployment Verification

After deploying to Vercel:

- [ ] Production URL loads correctly
- [ ] All environment variables are set in Vercel dashboard
- [ ] Authentication works on production domain
- [ ] Callback URLs work with production domain
- [ ] No console errors in production
- [ ] Performance is acceptable (check Lighthouse score)

## Notes

- Mark each item as complete after testing
- Document any issues found
- Re-test critical paths after fixes
- Keep this checklist updated as new features are added


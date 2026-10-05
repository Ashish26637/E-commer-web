# Ashish Essentials — Modern E-Commerce Web App

Fast, minimal, and responsive e-commerce web application featuring instant search, filtered product catalog, dynamic cart, and seamless checkout.

---

## Deploying to Vercel

This project is fully pre-configured for Vercel with zero extra setup needed.

### Method 1: Deploy via GitHub (Recommended)

1. Push this codebase to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Ashish Essentials"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** > **"Import Git Repository"**.
4. Select your `ashish-essentials` repository.
5. Vercel will automatically detect:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your site will be live on a `*.vercel.app` URL with automatic SSL.

---

### Method 2: Deploy using Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. Run deployment from the root directory:
   ```bash
   vercel
   ```
3. Follow the CLI prompts. For production deployment:
   ```bash
   vercel --prod
   ```

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

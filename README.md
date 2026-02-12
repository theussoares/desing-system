# 🎨 Design System (Remote Module)

> Vue 3 + Vite remote that exposes **reusable UI components** consumed by the Host and other micro-frontends via Module Federation.

## Architecture

```
Design System (Remote)
├── exposes → BaseButton, BaseCard, BaseInput, BaseNavbar, BaseBadge, BaseSpinner
├── shared  → vue (reuses Host instance)
└── output  → dist/v1.0.0/assets/remoteEntry.js (immutable)
```

This remote is the **single source of truth** for UI components. Changes here automatically reflect in all consuming applications.

## Tech Stack

| Layer      | Technology                               |
| ---------- | ---------------------------------------- |
| Framework  | Vue 3                                    |
| Build      | Vite 7                                   |
| Federation | `@originjs/vite-plugin-federation`       |
| Styling    | TailwindCSS 3                            |
| Language   | TypeScript                               |
| Deploy     | Vercel (auto-deploy on push to `master`) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 5001)
npx vite dev --port 5001

# Build for production (outputs to dist/v1.0.0/)
npm run build

# Preview production build
npx vite preview --port 5001
```

## Exposed Components

| Component       | Path                             | Description                                    |
| --------------- | -------------------------------- | ---------------------------------------------- |
| `./BaseButton`  | `src/components/BaseButton.vue`  | Button with variants, sizes, and loading state |
| `./BaseCard`    | `src/components/BaseCard.vue`    | Card container with slot-based content         |
| `./BaseInput`   | `src/components/BaseInput.vue`   | Text input with label and validation           |
| `./BaseNavbar`  | `src/components/BaseNavbar.vue`  | Top navigation bar with brand and links        |
| `./BaseBadge`   | `src/components/BaseBadge.vue`   | Small label/badge component                    |
| `./BaseSpinner` | `src/components/BaseSpinner.vue` | Loading spinner animation                      |

### Consuming from the Host

```ts
const BaseButton = defineAsyncComponent(
  () => import("design_system/BaseButton"),
);

const BaseNavbar = defineAsyncComponent(
  () => import("design_system/BaseNavbar"),
);
```

## Project Structure

```
desing-system/
├── src/
│   ├── components/
│   │   ├── BaseButton.vue       # Exposed
│   │   ├── BaseCard.vue         # Exposed
│   │   ├── BaseInput.vue        # Exposed
│   │   ├── BaseNavbar.vue       # Exposed
│   │   ├── BaseBadge.vue        # Exposed
│   │   ├── BaseSpinner.vue      # Exposed
│   │   └── HelloWorld.vue       # Dev-only demo
│   ├── assets/                  # Static assets
│   ├── App.vue                  # Standalone dev shell
│   ├── main.ts                  # Entry point
│   └── style.css                # Global styles
├── vite.config.ts               # Federation + versioned build config
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS config
├── vercel.json                  # CORS + cache headers + /latest rewrite
└── .github/workflows/deploy.yml # CI: validate build + verify artifact
```

## Versioning

Every build generates **immutable artifacts** under a versioned path:

```
dist/
└── v1.0.0/
    └── assets/
        ├── remoteEntry.js    # Federation entry point
        ├── BaseButton-[hash].js
        ├── BaseCard-[hash].js
        └── ...
```

- **Version** is read from `package.json` at build time
- **`/latest/`** is a Vercel rewrite that points to the current version
- Versioned paths (`/v1.0.0/`) are cached for **1 year** (immutable)
- `/latest/` is cached for **5 minutes**

### Bumping the Version

```bash
# Update in package.json
"version": "1.1.0"

# Build produces dist/v1.1.0/
npm run build

# Update /latest rewrite in vercel.json
"/latest/(.*)" → "/v1.1.0/$1"
```

## CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. **Checkout** → **Install** → **Build**
2. **Verify** that `dist/v{VERSION}/assets/remoteEntry.js` exists
3. **Deploy** handled automatically by Vercel GitHub Integration

## CDN & CORS

Configured in `vercel.json`:

- **CORS** — `Access-Control-Allow-Origin: *` on all versioned assets
- **Cache (versioned)** — `max-age=31536000, immutable` (1 year)
- **Cache (latest)** — `max-age=300` (5 minutes)

## Adding a New Component

1. Create the component in `src/components/NewComponent.vue`
2. Add to `vite.config.ts` exposes:
   ```ts
   exposes: {
     './NewComponent': './src/components/NewComponent.vue',
   }
   ```
3. Bump the version in `package.json`
4. Update the `/latest/` rewrite in `vercel.json`
5. Push to `master` — CI validates and Vercel deploys automatically

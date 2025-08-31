# Visual Product Matcher

A modern, mobile-first web app that finds visually similar products from a 60-item demo catalog.

Live (Vercel): Publish from the v0 preview using the “Publish” button.
Repository: Click the GitHub icon in the top-right of the v0 preview to push this code.

## Features
- Upload image file or paste image URL (preview included)
- Uses MobileNet (TensorFlow.js) to compute image embeddings client-side
- Cosine similarity ranking against cached catalog embeddings
- Filters: minimum similarity slider, category select
- Clean, responsive UI (TailwindCSS + shadcn/ui)
- Loading + error states, localStorage caching of catalog embeddings

## Running locally (in v0)
- Open the Preview; everything runs in-browser with TF.js (no API keys required).
- Click Publish (Vercel) to deploy a live URL.

## Technical Approach (≈200 words)
This app uses a lightweight, client-side embedding pipeline so it deploys easily and runs on the free tier. On load, the app initializes TensorFlow.js (WebGL backend) and lazily downloads MobileNet (V2, alpha=0.5) to balance accuracy, size, and speed. To avoid CORS and ensure consistent embeddings, all 60 product images are hosted locally under /public/products. We compute product embeddings once per session with a small concurrency throttle and show a progress bar; embeddings are cached in localStorage keyed by the model version. For a user query, we accept either a local upload or a URL, render a preview, extract an embedding via model.infer(image, true), and compute cosine similarity against the catalog embeddings. Results are ranked and filtered by category and a similarity threshold with accessible, responsive components from shadcn/ui. The UI deliberately mirrors a polished e‑commerce prototype: clear hierarchy, compact control panel, consistent spacing, subtle hover states, and WCAG‑friendly contrast using a simple palette (brand blue, neutrals, and a soft accent). Code is modular, commented at decision points, and avoids hidden magic. The architecture is framework-native (Next.js App Router) and deploys cleanly to Vercel with no server dependencies.

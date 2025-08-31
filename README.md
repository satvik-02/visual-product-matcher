Visual Product Matcher

A modern, mobile-friendly web application that helps users find visually similar products from a demo catalog of 60 items.

Features

Upload an image file or paste an image URL (with live preview).

Uses MobileNet (TensorFlow.js) to extract image features directly in the browser.

Ranks products by cosine similarity against pre-computed catalog embeddings.

Filtering options: similarity threshold slider and category selection.

Responsive, clean UI built with TailwindCSS and shadcn/ui components.

Loading indicators, error handling, and local caching of catalog embeddings for faster use.

Live Deployed Link - https://visualproductmatcher.vercel.app




Working & Deployment:

The application is designed to run fully in the browser, making it lightweight and easy to deploy. On startup, TensorFlow.js initializes with the WebGL backend for efficient performance, and the MobileNet V2 model (with reduced alpha for speed and size) is loaded on demand. Product images are stored under /public/products, ensuring no CORS issues and consistent embedding generation.

When the catalog is loaded, embeddings for all 60 product images are computed once per session. To optimize performance, this process is throttled with limited concurrency and cached in localStorage, so repeat visits don’t require reprocessing. Users can then upload an image or provide an image URL. A preview of the input image is shown, and an embedding is generated using MobileNet’s feature extraction. Cosine similarity is computed between the input embedding and the stored catalog embeddings, producing a ranked list of visually similar items.

The interface provides interactive controls: a similarity threshold slider to filter weaker matches and a category dropdown to narrow results. Styling is minimal yet polished, with clear hierarchy, spacing, and accessibility-friendly colors.

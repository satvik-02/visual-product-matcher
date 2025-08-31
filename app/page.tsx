"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import NextImage from "next/image"
import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-backend-webgl"
import * as mobilenet from "@tensorflow-models/mobilenet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { products, type Product } from "@/app/data/products"

type EmbeddingMap = Record<string, number[]>

const MODEL_VERSION = "mobilenet_v2_alpha_0.5"
const EMBED_CACHE_KEY = `vpm_embeddings_${MODEL_VERSION}_v1`

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < a.length; i++) {
    const x = a[i]
    const y = b[i]
    dot += x * y
    na += x * x
    nb += y * y
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb)
  return denom ? dot / denom : 0
}

async function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img as unknown as HTMLImageElement)
    img.onerror = (e) => reject(e)
    img.src = src
  })
}

async function toEmbedding(model: mobilenet.MobileNet, imgEl: HTMLImageElement): Promise<number[]> {
  // Using infer(..., true) returns an internal activation usable as an embedding
  const activation = model.infer(imgEl, true) as tf.Tensor
  const arr = Array.from(await activation.data())
  activation.dispose()
  return arr
}

function useCatalogEmbeddings(items: Product[]) {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const modelRef = useRef<mobilenet.MobileNet | null>(null)
  const [embeddingMap, setEmbeddingMap] = useState<EmbeddingMap>({})

  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        setError(null)
        // Load TF backend & model once
        await tf.ready()
        await tf.setBackend("webgl")
        if (!modelRef.current) {
          modelRef.current = await mobilenet.load({ version: 2, alpha: 0.5 })
        }

        // Try cache
        const cached = localStorage.getItem(EMBED_CACHE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached) as EmbeddingMap
          setEmbeddingMap(parsed)
          setReady(true)
          setProgress(100)
          return
        }

        // Compute embeddings with simple concurrency throttle
        const map: EmbeddingMap = {}
        const batch = 4
        let completed = 0

        for (let i = 0; i < items.length; i += batch) {
          const slice = items.slice(i, i + batch)
          await Promise.all(
            slice.map(async (p) => {
              if (cancelled) return
              const imgEl = await loadImageElement(p.imageUrl)
              const emb = await toEmbedding(modelRef.current!, imgEl)
              map[p.id] = emb
              completed++
              setProgress(Math.round((completed / items.length) * 100))
            }),
          )
        }

        if (cancelled) return
        localStorage.setItem(EMBED_CACHE_KEY, JSON.stringify(map))
        setEmbeddingMap(map)
        setReady(true)
      } catch (e: any) {
        setError(e?.message || "Failed to prepare catalog.")
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [items])

  return { ready, error, progress, modelRef, embeddingMap }
}

type RankedProduct = Product & { score: number }

export default function Page() {
  // Filters and state
  const [minScore, setMinScore] = useState(0.2)
  const [category, setCategory] = useState<string>("all")

  const { ready, error, progress, modelRef, embeddingMap } = useCatalogEmbeddings(products)

  // Query state
  const [querySrc, setQuerySrc] = useState<string | null>(null)
  const [queryFile, setQueryFile] = useState<File | null>(null)
  const [urlInput, setUrlInput] = useState("")
  const [ranking, setRanking] = useState<RankedProduct[] | null>(null)
  const [working, setWorking] = useState(false)
  const [queryError, setQueryError] = useState<string | null>(null)

  const categories = useMemo(() => {
    const set = new Set<string>(["all"])
    products.forEach((p) => set.add(p.category))
    return Array.from(set)
  }, [])

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    setRanking(null)
    setQueryError(null)
    if (f) {
      setQueryFile(f)
      setQuerySrc(URL.createObjectURL(f))
    } else {
      setQueryFile(null)
      setQuerySrc(null)
    }
  }

  async function onUseUrl() {
    setRanking(null)
    setQueryError(null)
    if (!urlInput) return
    setQuerySrc(urlInput)
  }

  async function runSearch() {
    if (!querySrc) {
      setQueryError("Please upload an image or paste an image URL.")
      return
    }
    if (!ready || !modelRef.current) {
      setQueryError("Catalog is still preparing. Please wait.")
      return
    }
    try {
      setWorking(true)
      const imgEl = await loadImageElement(querySrc)
      const q = await toEmbedding(modelRef.current, imgEl)

      const ranked: RankedProduct[] = products
        .map((p) => {
          const emb = embeddingMap[p.id]
          const score = emb ? cosineSimilarity(q, emb) : 0
          return { ...p, score }
        })
        .sort((a, b) => b.score - a.score)

      setRanking(ranked)
    } catch (e: any) {
      setQueryError(e?.message || "Failed to process the image.")
    } finally {
      setWorking(false)
    }
  }

  const filtered = useMemo(() => {
    const list = ranking ?? []
    return list.filter((p) => p.score >= minScore && (category === "all" || p.category === category))
  }, [ranking, minScore, category])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
        <header className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">Visual Product Matcher</h1>
            <p className="text-sm text-muted-foreground">
              Upload an image or paste a URL to find visually similar products.
            </p>
          </div>
        </header>

        {/* Catalog preparation state */}
        {!ready && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-pretty text-base md:text-lg">Preparing catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Loading MobileNet and computing embeddings for {products.length} products…
              </p>
              <div className="h-2 w-full overflow-hidden rounded bg-muted">
                <div
                  className={cn("h-full bg-blue-600 transition-all")}
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                />
              </div>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-base">1. Upload or Paste URL</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <Input type="file" accept="image/*" onChange={onFileChange} aria-label="Upload image" />
                <p className="mt-1 text-xs text-muted-foreground">Choose a file from your device</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  aria-label="Image URL"
                />
                <Button onClick={onUseUrl} variant="secondary">
                  Use URL
                </Button>
              </div>
              {!!querySrc && (
                <div className="relative aspect-square w-full overflow-hidden rounded border">
                  {/* Use next/image for optimization of local images; external URLs fallback to raw <img> via priority false */}
                  {querySrc.startsWith("/") ? (
                    <NextImage src={querySrc || "/placeholder.svg"} alt="Query preview" fill className="object-cover" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={querySrc || "/placeholder.svg"}
                      alt="Query preview"
                      className="h-full w-full object-cover"
                      crossOrigin="anonymous"
                    />
                  )}
                </div>
              )}
              <Button onClick={runSearch} disabled={!ready || working} className="bg-blue-600 hover:bg-blue-600/90">
                {working ? "Searching…" : "Find Similar"}
              </Button>
              {queryError && <p className="text-sm text-red-600">{queryError}</p>}
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">2. Filters</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Minimum similarity</label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[minScore]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={(v) => setMinScore(v[0] ?? 0)}
                      aria-label="Minimum similarity score"
                    />
                    <span className="w-12 text-right text-sm tabular-nums">{minScore.toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={(v) => setCategory(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c[0]?.toUpperCase() + c.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border bg-muted/20 p-3 text-sm text-muted-foreground">
                Tip: Start with a clear product image on a plain background for best results.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Results */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-pretty text-lg font-semibold tracking-tight">Results</h2>
            <p className="text-sm text-muted-foreground">
              {ranking ? `${filtered.length} of ${ranking.length} shown` : "Run a search to see results"}
            </p>
          </div>

          {!ranking ? (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                No results yet. Upload an image and click “Find Similar”.
              </CardContent>
            </Card>
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                No matches at this threshold/category. Lower the minimum similarity or change category.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <Card key={p.id} className="overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative aspect-square w-full">
                    {/* Use next/image for optimization of local images; external URLs fallback to raw <img> via priority false */}
                    <NextImage src={p.imageUrl || "/placeholder.svg"} alt={p.name} fill className="object-cover" />
                  </div>
                  <CardContent className="space-y-1 p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium leading-5">{p.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {p.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">${p.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">sim {p.score.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Neutral footer */}
        <footer className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © 2025 Visual Product Matcher.
        </footer>
      </div>
    </main>
  )
}

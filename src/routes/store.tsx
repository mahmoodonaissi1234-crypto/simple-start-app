import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { ShowroomScene } from "@/components/store/ShowroomScene";
import { ProductPanel } from "@/components/store/ProductPanel";
import type { Suit } from "@/data/suits";

export const Route = createFileRoute("/store")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Virtual Showroom — Suits" },
      { name: "description", content: "Browse suits in a fully animated 3D virtual showroom." },
    ],
  }),
  component: StorePage,
});

function StorePage() {
  const [selectedSuit, setSelectedSuit] = useState<Suit | null>(null);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0b0b10]">
      <Canvas shadows camera={{ position: [0, 2.4, 7], fov: 50 }} className="h-full w-full">
        <Suspense fallback={null}>
          <ShowroomScene selectedSuit={selectedSuit} onSelect={setSelectedSuit} />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto absolute left-4 top-4 flex items-center gap-3"
        >
          <Link
            to="/"
            className="rounded-md border border-white/15 bg-black/50 px-3 py-1.5 text-sm text-white/80 backdrop-blur-md transition-colors hover:text-white"
          >
            ← Back
          </Link>
          <div className="rounded-md border border-white/15 bg-black/50 px-3 py-1.5 text-sm text-white/60 backdrop-blur-md">
            Drag to orbit · Scroll to zoom · Click a suit to inspect
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pointer-events-none absolute bottom-4 left-4 text-sm font-medium uppercase tracking-[0.3em] text-white/40"
        >
          The Suit Room
        </motion.h1>

        <ProductPanel suit={selectedSuit} onClose={() => setSelectedSuit(null)} />
      </div>

      <Toaster />
    </div>
  );
}

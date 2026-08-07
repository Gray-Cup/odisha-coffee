"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProductImageZoom({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`group relative block h-full w-full cursor-zoom-in ${className ?? ""}`}
          aria-label={`Zoom in on ${alt}`}
        >
          <Image src={src} alt={alt} fill className="object-cover" />
          <span className="absolute bottom-2 right-2 flex items-center justify-center rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="relative h-[80vh] w-full">
          <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

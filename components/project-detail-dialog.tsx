"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Info,
  Layers,
  Sparkles,
  ArrowUpRight,
  Lock,
} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects-data";

interface ProjectDetailDialogProps {
  projects: Project[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export default function ProjectDetailDialog({
  projects,
  selectedIndex,
  onSelect,
  onClose,
}: ProjectDetailDialogProps) {
  const project =
    selectedIndex !== null && selectedIndex >= 0 && selectedIndex < projects.length
      ? projects[selectedIndex]
      : null;

  // Viewing state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  // Touch gesture state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const thumbnailStripRef = useRef<HTMLDivElement | null>(null);

  // Reset zoom, pan, and loading state when project changes
  useEffect(() => {
    if (selectedIndex !== null) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setImageLoading(true);

      // Auto-scroll the active thumbnail into view
      if (thumbnailStripRef.current) {
        const activeThumb = thumbnailStripRef.current.querySelector(
          `[data-thumb-index="${selectedIndex}"]`
        );
        if (activeThumb) {
          activeThumb.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }
  }, [selectedIndex]);

  // Handle browser fullscreen state sync
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleBrowserFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore fullscreen rejection if denied by browser
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(Number((prev + 0.4).toFixed(1)), 2.8));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(Number((prev - 0.4).toFixed(1)), 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleImageToggleZoom = useCallback(() => {
    if (zoom === 1) {
      setZoom(1.8);
    } else {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  // Mouse pan handlers for zoomed view
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing if inside an input or textarea
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (selectedIndex > 0) {
            onSelect(selectedIndex - 1);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (selectedIndex < projects.length - 1) {
            onSelect(selectedIndex + 1);
          }
          break;
        case "Escape":
          e.preventDefault();
          if (showInfo) {
            setShowInfo(false);
          } else {
            onClose();
          }
          break;
        case "+":
        case "=":
          e.preventDefault();
          handleZoomIn();
          break;
        case "-":
        case "_":
          e.preventDefault();
          handleZoomOut();
          break;
        case "0":
          e.preventDefault();
          handleResetZoom();
          break;
        case "i":
        case "I":
          e.preventDefault();
          setShowInfo((prev) => !prev);
          break;
        case "t":
        case "T":
          e.preventDefault();
          setShowThumbnails((prev) => !prev);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleBrowserFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedIndex,
    projects.length,
    onSelect,
    onClose,
    showInfo,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    toggleBrowserFullscreen,
  ]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      selectedIndex === null ||
      zoom > 1
    ) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only trigger if horizontal swipe is prominent (> 50px) and mostly horizontal
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0 && selectedIndex < projects.length - 1) {
        onSelect(selectedIndex + 1);
      } else if (deltaX > 0 && selectedIndex > 0) {
        onSelect(selectedIndex - 1);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!project || selectedIndex === null) return null;

  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < projects.length - 1;
  const prevProject = hasPrev ? projects[selectedIndex - 1] : null;
  const nextProject = hasNext ? projects[selectedIndex + 1] : null;

  return (
    <DialogPrimitive.Root
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        {/* Full screen backdrop */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300" />

        {/* Full screen immersive dialog content */}
        <DialogPrimitive.Content
          aria-describedby="project-detail-description"
          className="fixed inset-0 z-50 flex h-dvh w-screen flex-col overflow-hidden bg-[#07090e]/95 text-foreground select-none outline-none"
        >
          {/* Accessible Hidden Title & Description for Screen Readers */}
          <DialogPrimitive.Title className="sr-only">
            {project.title} - Project Details & Full Screen Image
          </DialogPrimitive.Title>
          <DialogPrimitive.Description
            id="project-detail-description"
            className="sr-only"
          >
            {project.description}
          </DialogPrimitive.Description>

          {/* ==================== TOP NAVIGATION HEADER ==================== */}
          <header className="relative z-30 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-xl sm:px-6">
            {/* Left: Project title & Counter */}
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 font-mono text-xs font-semibold text-accent shadow-sm">
                <Sparkles className="size-3" />
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-white sm:text-base md:text-lg">
                  {project.title}
                </h2>
                <p className="hidden text-xs text-muted-foreground sm:block truncate">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            {/* Right: Controls & Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Zoom Controls (Desktop/Tablet) */}
              <div className="hidden items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md md:flex">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  aria-label="Zoom out"
                  className="size-7 rounded-full text-white/80 hover:bg-white/15 hover:text-white disabled:opacity-30"
                >
                  <ZoomOut className="size-3.5" />
                </Button>
                <span className="w-12 text-center font-mono text-[11px] font-medium text-white/90">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= 2.8}
                  aria-label="Zoom in"
                  className="size-7 rounded-full text-white/80 hover:bg-white/15 hover:text-white disabled:opacity-30"
                >
                  <ZoomIn className="size-3.5" />
                </Button>
                {zoom > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleResetZoom}
                    aria-label="Reset zoom"
                    className="size-7 rounded-full text-accent hover:bg-accent/20"
                    title="Reset zoom (0)"
                  >
                    <RotateCcw className="size-3.5" />
                  </Button>
                )}
              </div>

              {/* Toggle Info Drawer */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowInfo((prev) => !prev)}
                aria-label={showInfo ? "Hide project information" : "Show project information"}
                className={`size-9 rounded-full transition-colors ${
                  showInfo
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white"
                }`}
                title="Project details (i)"
              >
                <Info className="size-4" />
              </Button>

              {/* Toggle Thumbnails */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowThumbnails((prev) => !prev)}
                aria-label={showThumbnails ? "Hide thumbnails" : "Show thumbnails"}
                className={`hidden size-9 rounded-full sm:inline-flex transition-colors ${
                  showThumbnails
                    ? "border border-accent/40 bg-accent/20 text-accent"
                    : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white"
                }`}
                title="Toggle thumbnails (t)"
              >
                <Layers className="size-4" />
              </Button>

              {/* Toggle Browser Fullscreen */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleBrowserFullscreen}
                aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
                className="hidden size-9 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white sm:inline-flex"
                title="Full screen (f)"
              >
                {isFullscreen ? (
                  <Minimize2 className="size-4" />
                ) : (
                  <Maximize2 className="size-4" />
                )}
              </Button>

              {/* Live Demo Quick Link */}
              {project.link && (
                <Button
                  size="sm"
                  className="hidden h-9 gap-1.5 rounded-full bg-accent px-4 text-xs font-semibold text-white shadow-lg shadow-accent/20 hover:bg-accent/90 md:inline-flex"
                  asChild
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Live Demo</span>
                  </a>
                </Button>
              )}

              {/* Close Button */}
              <DialogPrimitive.Close asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="size-9 rounded-full border border-white/15 bg-white/10 text-white hover:bg-destructive hover:border-destructive hover:text-white transition-colors"
                  title="Close (Esc)"
                >
                  <X className="size-4" />
                </Button>
              </DialogPrimitive.Close>
            </div>
          </header>

          {/* ==================== FULL SCREEN IMAGE STAGE ==================== */}
          <main
            className="relative flex flex-1 min-h-0 w-full items-center justify-center overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              cursor:
                zoom > 1
                  ? isDragging
                    ? "grabbing"
                    : "grab"
                  : "zoom-in",
            }}
          >
            {/* Ambient Background Glow Effect & Fine Tech Grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.12) 0%, transparent 65%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Previous Project Floating Button */}
            <button
              type="button"
              onClick={() => hasPrev && onSelect(selectedIndex - 1)}
              disabled={!hasPrev}
              aria-label={
                prevProject
                  ? `Previous project: ${prevProject.title}`
                  : "Previous project"
              }
              className="group absolute left-3 top-1/2 z-30 -translate-y-1/2 flex size-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-accent hover:bg-accent hover:text-white disabled:pointer-events-none disabled:opacity-20 md:left-6 md:size-14"
            >
              <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-0.5" />
              {prevProject && (
                <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-3 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-opacity group-hover:block">
                  {prevProject.title}
                </span>
              )}
            </button>

            {/* Next Project Floating Button */}
            <button
              type="button"
              onClick={() => hasNext && onSelect(selectedIndex + 1)}
              disabled={!hasNext}
              aria-label={
                nextProject
                  ? `Next project: ${nextProject.title}`
                  : "Next project"
              }
              className="group absolute right-3 top-1/2 z-30 -translate-y-1/2 flex size-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-accent hover:bg-accent hover:text-white disabled:pointer-events-none disabled:opacity-20 md:right-6 md:size-14"
            >
              <ChevronRight className="size-6 transition-transform group-hover:translate-x-0.5" />
              {nextProject && (
                <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-3 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-opacity group-hover:block">
                  {nextProject.title}
                </span>
              )}
            </button>

            {/* Image Container with Zoom & Pan */}
            <div
              onClick={handleImageToggleZoom}
              className="relative flex h-full w-full items-center justify-center p-3 sm:p-6 md:p-10 select-none"
            >
              {/* Shimmer loading skeleton */}
              {imageLoading && (
                <div className="absolute inset-8 flex items-center justify-center rounded-2xl bg-white/5 animate-pulse">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <div className="size-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                    <p className="text-xs font-medium">Loading high-resolution preview...</p>
                  </div>
                </div>
              )}

              <div
                className="relative flex max-h-[82dvh] max-w-[94vw] items-center justify-center transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1920}
                  height={1080}
                  priority
                  unoptimized
                  onLoad={() => setImageLoading(false)}
                  className={`max-h-[80dvh] max-w-[92vw] w-auto h-auto rounded-xl object-contain shadow-2xl ring-1 ring-white/10 transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            </div>

            {/* Mobile / Quick Zoom Hint Badge */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] text-white/70 backdrop-blur-md lg:block">
              {zoom > 1 ? "Drag to pan • Click to reset" : "Click image to zoom • Use ← → arrows"}
            </div>
          </main>

          {/* ==================== BOTTOM FLOATING SUMMARY PILL ==================== */}
          {!showInfo && (
            <div className="pointer-events-none absolute bottom-24 left-1/2 z-30 -translate-x-1/2 px-4 w-full max-w-2xl sm:bottom-28">
              <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/75 p-3 shadow-2xl backdrop-blur-xl sm:px-5 sm:py-3.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-white sm:text-base">
                      {project.title}
                    </h3>
                    <span className="hidden rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-semibold text-accent sm:inline-block">
                      {project.tags[0]}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {project.link ? (
                    <Button
                      size="sm"
                      className="h-8 gap-1 rounded-full bg-accent px-3.5 text-xs font-semibold text-white hover:bg-accent/90"
                      asChild
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="size-3" />
                        <span>Live Demo</span>
                      </a>
                    </Button>
                  ) : project.disabledLabel ? (
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-[11px] font-medium text-white/70">
                      <Lock className="size-3 text-accent" />
                      <span>{project.disabledLabel}</span>
                    </span>
                  ) : null}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowInfo(true)}
                    className="h-8 gap-1 rounded-full border-white/20 bg-white/10 px-3 text-xs font-medium text-white hover:bg-white/20"
                  >
                    <Info className="size-3" />
                    <span>Details</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== FULL PROJECT DETAILS DRAWER ==================== */}
          {showInfo && (
            <aside className="absolute inset-x-0 bottom-0 z-40 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-white/15 bg-[#0e121a]/95 p-6 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom duration-300 sm:p-8 md:max-w-3xl md:inset-x-auto md:right-0 md:top-16 md:bottom-0 md:max-h-full md:rounded-t-none md:rounded-l-3xl md:border-t-0 md:border-l md:slide-in-from-right">
              {/* Drawer Top Bar */}
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    Featured Project
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedIndex + 1} of {projects.length}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInfo(false)}
                  className="size-8 rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/20 hover:text-white"
                  aria-label="Close project info"
                >
                  <X className="size-4" />
                </Button>
              </div>

              {/* Title & Description */}
              <h3 className="mb-3 text-2xl font-black text-white sm:text-3xl">
                {project.title}
              </h3>
              <p className="mb-6 text-sm font-medium text-accent">
                {project.shortDescription}
              </p>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="mb-8">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/80">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/90 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                {project.link ? (
                  <Button
                    className="flex-1 gap-2 rounded-xl bg-accent py-5 font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent/90"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      {project.linkLabel ?? "Open Live Demo"}
                    </a>
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="secondary"
                    className="flex-1 gap-2 rounded-xl py-5 text-xs opacity-60"
                  >
                    {project.disabledLabel ? (
                      <>
                        <Lock className="size-3.5 text-accent" />
                        <span>{project.disabledLabel}</span>
                      </>
                    ) : (
                      "Live Demo Coming Soon"
                    )}
                  </Button>
                )}

                {project.github && (
                  <Button
                    variant="outline"
                    className="gap-2 rounded-xl border-white/20 bg-white/5 py-5 font-semibold text-white hover:bg-white/10"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" />
                      View Code
                    </a>
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => window.open(project.image, "_blank")}
                  className="gap-2 rounded-xl border-white/20 bg-white/5 py-5 font-semibold text-white hover:bg-white/10"
                >
                  <ArrowUpRight className="size-4" />
                  Full Resolution
                </Button>
              </div>
            </aside>
          )}

          {/* ==================== BOTTOM THUMBNAIL QUICK-SWITCHER ==================== */}
          {showThumbnails && (
            <footer className="relative z-30 shrink-0 border-t border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <span className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:block">
                  All Projects ({projects.length})
                </span>

                <div
                  ref={thumbnailStripRef}
                  className="flex flex-1 items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20"
                >
                  {projects.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-thumb-index={idx}
                        onClick={() => onSelect(idx)}
                        aria-label={`Switch to project: ${item.title}`}
                        className={`group relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 sm:h-16 sm:w-28 ${
                          isSelected
                            ? "border-accent ring-2 ring-accent scale-105 shadow-lg shadow-accent/20"
                            : "border-white/10 opacity-50 hover:border-white/40 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="112px"
                          unoptimized
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 transition-opacity ${
                            isSelected
                              ? "bg-accent/15"
                              : "bg-black/30 group-hover:bg-transparent"
                          }`}
                        />
                        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 font-mono text-[9px] font-bold text-white backdrop-blur-sm">
                          {idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </footer>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

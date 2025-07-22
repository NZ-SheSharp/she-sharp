import { GalleryHeroSection } from "@/components/sections/media/gallery/gallery-hero-section";
import { GalleryGridSection } from "@/components/sections/media/gallery/gallery-grid-section";
import { GalleryCTASection } from "@/components/sections/media/gallery/gallery-cta-section";

export default function PhotoGalleryPage() {
  return (
    <>
      <GalleryHeroSection />
      <GalleryGridSection />
      <GalleryCTASection />
    </>
  );
}
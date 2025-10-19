import GalleryPage from "@/components/pages/cards";
import UploadFruitPage from "@/components/pages/upload-fruit-cards";
import UploadJuicePage from "@/components/pages/upload-juice-cards";

export default function Home() {
  return (
    <>
      <UploadFruitPage />
      <UploadJuicePage />
      <GalleryPage />
    </>
  );
}

import GalleryPage from "@/components/pages/cards";
import UploadFruitCardPage from "@/components/pages/upload-fruit-cards";
import UploadJuiceCardPage from "@/components/pages/upload-juice-cards";

export default function Home() {
  return (
    <>
      <UploadFruitCardPage />
      <UploadJuiceCardPage />
      <GalleryPage />
    </>
  );
}

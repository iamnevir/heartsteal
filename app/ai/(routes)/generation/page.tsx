import ImageGenerationMain from "@/components/generation/image-generation-main";
import SidebarPicker from "@/components/generation/sidebar-picker";

const ImageGenerationPage = () => {
  return (
    <div className="w-full h-full">
      <SidebarPicker />
      <ImageGenerationMain />
    </div>
  );
};

export default ImageGenerationPage;

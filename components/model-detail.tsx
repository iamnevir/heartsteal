import { useLanguage } from "@/hooks/use-language";
import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { Aperture, Atom, Biohazard, BrainCog, CandyCane } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useRouter } from "next/navigation";

const ModelDetail = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const models = [
    {
      name: "Heart Steal",
      des:
        language === "Vietnamese"
          ? "Heart Steal là mô hình dall-e-2 được cung cấp bởi OpenAi, có khả năng tạo ảnh nhanh nhưng lại kém về mặt chất lượng."
          : "Heart Steal is a dall-e-2 model provided by OpenAi, which is capable of fast image generation but poor in quality.",
      badge: "Popular",
      bg: "https://app.leonardo.ai/img/get-started/background-text-to-image.webp",
      icon: Atom,
    },
    {
      name: "Heart Steal V2",
      des:
        language === "Vietnamese"
          ? "Heart Steal V2 là mô hình được cung cấp bởi Bing của Microsoft đây là mô hình có tốc độ tạo ảnh chậm nhưng mang lại chất lượng tốt."
          : "Heart Steal V2 is a model provided by Microsoft's Bing. This is a model with slow image creation speed but good quality.",
      badge: "Popular",
      bg: "https://app.leonardo.ai/img/get-started/background-realtime-canvas.webp",
      icon: Aperture,
    },
    {
      name: "Dream",
      des:
        language === "Vietnamese"
          ? "Dream là mô hình được cung cấp bởi DreamStudio có khả năng tạo ảnh với tốc độ nhanh và mang lại chất lượng ảnh tốt."
          : "Dream is a model offered by DreamStudio that is capable of creating images at fast speeds and delivering good image quality.",
      badge: "Beta",
      bg: "https://app.leonardo.ai/img/get-started/background-canvas-editor.webp",
      icon: CandyCane,
    },
    {
      name: "Imagine",
      des:
        language === "Vietnamese"
          ? "Imagine là mô hình được cung cấp bởi Imagine API có khả năng tạo ảnh với tốc độ nhanh và đa dạng phong cách."
          : "Imagine is a model provided by the Imagine API that is capable of creating images at fast speeds and providing stable image quality and a variety of styles.",
      badge: "Pro",
      bg: "https://app.leonardo.ai/img/get-started/background-text-to-image.webp",
      icon: Biohazard,
    },
    {
      name: "Heart Steal Pro",
      des:
        language === "Vietnamese"
          ? "Heart Steal Pro là mô hình dall-e-3 được cung cấp bởi Open Ai có khả năng xử lý ảnh tốt và chất lượng, tốc tộ phản hồi cao."
          : "Heart Steal Pro is a dall-e-3 model powered by Open Ai that has good image processing capabilities and high quality and response speed.",
      badge: "Pro",
      bg: "https://app.leonardo.ai/img/get-started/background-motion.webp",
      icon: BrainCog,
    },
  ];
  return (
    <div className="flex sm:flex-row flex-col items-center gap-5 pt-5 sm:pl-64 px-5">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {models.map((item, index) => (
            <CarouselItem
              onClick={() => router.push("/ai/generation")}
              key={index}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 cursor-pointer p-3"
            >
              <Card key={index}>
                <CardBody>
                  <div className=" group relative scale-110 flex items-center justify-center p-3">
                    <Image
                      fill
                      alt=""
                      className=" opacity-40"
                      src={item.bg}
                      sizes="(max-width: 768px) 100vw,66vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <item.icon className="group-hover:scale-125 duration-500 sm:w-[80px] sm:h-[80px] w-10 h-10" />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className=" flex flex-col gap-2">
                    <span className=" text-sm font-semibold">{item.name}</span>
                    <span className=" text-xs dark:text-white/50">
                      {item.des}
                    </span>{" "}
                    <Chip className="bg-gr ml-auto">{item.badge}</Chip>
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ModelDetail;

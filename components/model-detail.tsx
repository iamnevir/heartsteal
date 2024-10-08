import { useLanguage } from "@/hooks/use-language";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { User2Icon, Wand2 } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useRouter } from "next/navigation";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { cn } from "@/lib/utils";

const ModelDetail = () => {
  const models = useQuery(api.model.getmodels);

  return (
    <div className="flex sm:flex-row flex-col items-center justify-center gap-5 pt-5 sm:pl-64 px-5">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {models?.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-1 pl-5"
            >
              <ModelItem item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export const ModelItem = ({ item }: { item: Doc<"model"> }) => {
  const { language } = useLanguage();
  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImageByModel,
    { modelId: item.modelId },
    { initialNumItems: 20 }
  );
  const generation = useGenerateImage();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal
        backdrop="blur"
        scrollBehavior="outside"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full">
          <>
            <ModalBody>
              <div className="flex sm:flex-row flex-col item-start gap-4 py-2 w-full">
                <Image
                  className="rounded-md sm:w-[240px] sm:h-[370px] w-full"
                  alt=""
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                  src={item.avatar ? item.avatar : ""}
                  sizes="(max-width: 768px) 100vw,66vw"
                  width={512}
                  height={512}
                  style={{
                    objectFit: "cover",
                  }}
                />

                <div className=" flex flex-col items-start gap-3 w-full">
                  <div className="cursor-pointer w-fit h-fit p-0 m-0">
                    <User
                      name={item.author ? item.author : "Unknow"}
                      avatarProps={{
                        name: item.author?.charAt(0),
                        className: "w-[30px] h-[30px] bg-gr ",
                      }}
                    />
                  </div>

                  <span className="gradient-text font-semibold">
                    {item.name}
                  </span>

                  <Divider />
                  <span className=" text-xs text-white/50">
                    {language === "Vietnamese" ? "Mô tả" : "Description"}
                  </span>
                  <span className="text-sm">{item.desc}</span>
                  <Button
                    onPress={() => {
                      generation.setTab("history");
                      generation.setModel(item.modelId);
                      router.push(`/ai/generation`);
                    }}
                    className="bg-gr w-full rounded-md "
                  >
                    {" "}
                    {language === "Vietnamese"
                      ? "Tạo ảnh với mô hình này"
                      : "Generate with this Model"}
                    <Wand2 size={17} />
                  </Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter
              className={cn(
                " grid  gap-4 sm:pr-2 py-2 sm:py-10 sm:grid-cols-4 grid-cols-2"
              )}
            >
              {results?.map((item, index) => (
                <Image
                  key={index}
                  className={"rounded-md"}
                  alt=""
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                  src={item.url}
                  sizes="(max-width: 768px) 100vw,66vw"
                  width={512}
                  height={512}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              ))}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <Card className="h-full justify-start items-start">
        <CardBody className="overflow-hidden">
          <div
            onClick={onOpen}
            className="cursor-pointer group relative w-full h-[200px] scale-110 flex items-center justify-center p-3"
          >
            <Image
              fill
              alt=""
              className="-translate-y-2"
              src={item.avatar!}
              sizes="(max-width: 768px) 100vw,66vw"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </CardBody>
        <CardFooter className="">
          <div className=" flex flex-col gap-2">
            <span className=" text-sm font-semibold ">{item.name}</span>
            <span className=" text-xs dark:text-white/50">
              {item.desc}
            </span>{" "}
            <div className=" flex items-center justify-between">
              <div className=" flex items-center gap-1">
                <User2Icon size={17} />
                <span className=" text-xs font-semibold">{item.author}</span>
              </div>

              <Chip className="bg-gr">{item.isPro ? "Premium" : "Free"}</Chip>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ModelDetail;

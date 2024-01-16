import { useLanguage } from "@/hooks/use-language";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  LucideProps,
  Palette,
  X,
} from "lucide-react";
import Image from "next/image";
import { ForwardRefExoticComponent, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "../ui/carousel";
import { cn } from "@/lib/utils";
type GuideProps = {
  title: string;
  icon: ForwardRefExoticComponent<LucideProps>;
  slide: {
    bg: string;
    title: string;
    desc: string | React.ReactNode;
    subTitle?: string;
  }[];
};
const Guide = () => {
  const [isDetail, setIsDetail] = useState(false);
  const { language } = useLanguage();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [open, setOpen] = useState<{ o: boolean; i: number }>({
    o: false,
    i: 0,
  });
  const guides: GuideProps[] = [
    {
      title: "Chào mừng / Tổng quan",
      icon: HeartHandshake,
      slide: [
        {
          bg: "https://utfs.io/f/ef127a47-6a0a-4b3a-98f3-c96b07ec2cf5-ekh8vq.png",
          title: "Chào mừng đến HeartSteal Ai!",
          desc: (
            <article className="prose prose-p:leading-4 prose-p:text-[13px]  dark:prose-p:text-white/60">
              <ul>
                <p>
                  Chúng tôi rất vui khi được bạn tham gia cùng chúng tôi trong
                  hành trình sản xuất sáng tạo được tăng cường bằng AI. Để giúp
                  bạn định hướng, chúng tôi đã tổng hợp ngắn gọn ở cấp độ cao về
                  một số tính năng của nền tảng.
                </p>
                <p>
                  Bạn có thể xem qua hướng dẫn này bất kỳ lúc nào bằng cách nhấp
                  vào biểu tượng ? biểu tượng bên cạnh tiêu đề ở đầu phần Trang
                  chủ.
                </p>
                <p>
                  Tương tự, trong các tính năng khác nhau của nền tảng, cùng một
                  màu tím ? có thể nhấp vào biểu tượng để xem qua hướng dẫn bắt
                  đầu nhanh của tính năng đó.,
                </p>
              </ul>
            </article>
          ),
        },
        {
          bg: "https://utfs.io/f/1252b3bf-1149-40ce-ab54-3d068c66ce7b-sdtaqc.png",
          title: "Tổng quan về nền tảng",
          subTitle: "Trang chủ",
          desc: (
            <article className="prose prose-li:text-sm prose-li:text-white/50">
              <ul>
                <li>
                  <span className="gradient-text font-semibold">
                    Tin cộng đồng
                  </span>{" "}
                  được cập nhật liên tục với những sáng tạo của người dùng. Tại
                  đây bạn có thể cập nhật các Hình ảnh Xu hướng, Mới và Hàng đầu
                  mới nhất.
                </li>
                <li>
                  <span className="gradient-text font-semibold">
                    Hình ảnh công khai
                  </span>{" "}
                  cũng cho bạn biết lời nhắc và cài đặt nào đã được sử dụng để
                  tạo chúng. Sử dụng những thứ này để lấy cảm hứng!
                </li>
                <li>
                  <span className="gradient-text font-semibold">Chia sẻ</span>{" "}
                  những sáng tạo của riêng bạn và đóng góp cho cộng đồng toàn
                  cầu của chúng tôi.
                </li>
              </ul>
            </article>
          ),
        },
        {
          bg: "https://utfs.io/f/475616be-9951-4c7a-9f64-a95ffc6a8dbf-2gsehc.png",
          title: "Trình tạo ảnh",
          subTitle: "Trao quyền cho trí tưởng tượng của bạn",
          desc: (
            <article className="prose prose-li:text-sm prose-li:text-white/50">
              <ul>
                <li>
                  Sử dụng{" "}
                  <span className="gradient-text font-semibold">văn bản</span>,{" "}
                  <span className="gradient-text font-semibold">
                    lời nhắc hình ảnh
                  </span>{" "}
                  hoặc{" "}
                  <span className="gradient-text font-semibold">
                    hình ảnh thành hình ảnh
                  </span>{" "}
                  để tạo hình ảnh 2D mới.
                </li>
                <li>
                  Khám phá các tính năng như{" "}
                  <span className="gradient-text font-semibold">
                    con lắc ngẫu nhiên
                  </span>{" "}
                  và{" "}
                  <span className="gradient-text font-semibold">
                    lời nhắc tiêu cực
                  </span>{" "}
                </li>
                <li>
                  Trải nghiệm đa dạng{" "}
                  <span className="gradient-text font-semibold">
                    mô hình AI
                  </span>{" "}
                  với nhiều tính năng thú vị khác.
                </li>
                <li>
                  Trải nghiệm Professor với{" "}
                  <span className="gradient-text font-semibold">
                    tăng kích thước
                  </span>{" "}
                  và{" "}
                  <span className="gradient-text font-semibold">xóa nền</span>{" "}
                  ảnh
                </li>
              </ul>
            </article>
          ),
        },
      ],
    },
    {
      title: "Tạo ảnh với AI",
      icon: Palette,
      slide: [
        {
          bg: "https://utfs.io/f/475616be-9951-4c7a-9f64-a95ffc6a8dbf-2gsehc.png",
          title: "Tạo ảnh từ văn bản",
          subTitle: "Giải phóng sức mạnh tưởng tượng của bạn",
          desc: (
            <article className="prose prose-li:text-sm prose-li:text-white/50">
              <ul>
                <li>
                  Giải phóng khả năng sáng tạo của bạn với{" "}
                  <span className="gradient-text font-semibold">AI </span> của
                  chúng tôi {"-"} từ nhân vật đến phong cảnh, khái niệm, hình
                  nền, v.v., tất cả đều theo nhiều phong cách khác nhau.
                </li>
                <li>
                  {" "}
                  Chỉ cần mô tả tầm nhìn của bạn bằng ngôn ngữ đơn giản và để AI
                  biến nó thành hiện thực. Chọn từ nhiều mẫu được tinh chỉnh để
                  phù hợp với nhiều chủ đề và phong cách khác nhau.
                </li>

                <li>
                  Hãy sẵn sàng để ngạc nhiên trước những gì khả năng sáng tạo
                  của bạn có thể đạt được!
                </li>
              </ul>
            </article>
          ),
        },
        {
          bg: "https://utfs.io/f/06ba79c3-17d1-47ee-9102-6d83ba678d5d-d27vsl.png",
          title: "Cài đặt & Thông số",
          subTitle: "Trao quyền cho sự sáng tạo của bạn một cách chính xác",
          desc: (
            <article className="prose prose-li:text-sm prose-li:text-white/50">
              <ul>
                <li>
                  {" "}
                  Giành quyền kiểm soát quá trình tạo, điều chỉnh các khía cạnh
                  như
                  <span className="gradient-text font-semibold">
                    {" "}
                    kích thước hình ảnh, tỷ lệ khung hình, tỷ lệ hướng dẫn và
                    thông số
                  </span>
                  .
                </li>
                <li>
                  {" "}
                  Tạo các hình ảnh do AI tạo ra phù hợp hoàn hảo với tầm nhìn
                  sáng tạo của bạn bằng cách tận dụng các cài đặt và thông số có
                  thể tùy chỉnh để đạt được kết quả mong muốn.
                </li>
              </ul>
            </article>
          ),
        },
        {
          bg: "https://app.leonardo.ai/img/modal-onboarding-feature/image-generation/04.webp",
          title: "Tạo hình ảnh từ hình ảnh",
          subTitle: "Xây dựng trên hình ảnh hiện có",
          desc: (
            <article className="prose prose-li:text-sm prose-li:text-white/50">
              <ul>
                <li>
                  Tương tự nhưng khác với tính năng nhắc nhở bằng hình ảnh,
                  <span className="gradient-text font-semibold">
                    {" "}
                    ảnh từ ảnh{" "}
                  </span>{" "}
                  cho phép bạn tải lên một hình ảnh duy nhất và chuyển đổi hình
                  ảnh đó thành một hình ảnh khác.
                </li>
                <li>
                  <span className="gradient-text font-semibold">
                    {" "}
                    Lời nhắc{" "}
                  </span>
                  phải tắt để sử dụng tính năng này. Cường độ đầu vào cho biết
                  đầu ra mới có thể sai lệch bao nhiêu so với hình ảnh đã tải
                  lên của bạn - cường độ đầu vào càng cao thì độ lệch càng ít.
                </li>
              </ul>
            </article>
          ),
        },
        {
          bg: "https://utfs.io/f/7d0eaded-f111-4a2a-9ab2-a3e6d076edb1-mamx9v.png",
          title: "Mặt nạ ảnh",
          subTitle: "Chỉnh sửa ảnh theo ý của bạn",
          desc: (
            <article className="prose prose-li:text-sm prose-li:text-white/50">
              <ul>
                <li>
                  {" "}
                  Sử dụng{" "}
                  <span className="gradient-text font-semibold">
                    {" "}
                    ảnh đầu vào
                  </span>{" "}
                  và một{" "}
                  <span className="gradient-text font-semibold">
                    {" "}
                    mặt nạ
                  </span>{" "}
                  bất kì để tạo ra ảnh mới theo ý thích của bạn.
                </li>
                <li>
                  {" "}
                  Cả hình ảnh và mặt nạ được tải lên đều phải là{" "}
                  <span className="gradient-text font-semibold">
                    {" "}
                    hình ảnh PNG{" "}
                  </span>
                  hình vuông có
                  <span className="gradient-text font-semibold">
                    {" "}
                    kích thước nhỏ hơn 4 MB
                  </span>{" "}
                  và cũng phải có cùng kích thước với nhau. Các vùng không trong
                  suốt của mặt nạ không được sử dụng khi tạo đầu ra, vì vậy
                  chúng không nhất thiết phải khớp với hình ảnh gốc như ví dụ
                  trên.
                </li>
              </ul>
            </article>
          ),
        },
        {
          bg: "https://utfs.io/f/3b97c0d8-b43c-4756-b0e1-0a76bf7a2df8-8qeeyd.png",
          title: "Xóa nền & tăng chất lượng",
          subTitle: "Xóa nền ảnh và tăng gấp đôi chất lượng",
          desc: (
            <article className="prose prose-li:text-sm prose-li:text-white/50">
              <ul>
                <li>
                  {" "}
                  Sử dụng tính năng{" "}
                  <span className="gradient-text font-semibold">
                    {" "}
                    xóa nền
                  </span>{" "}
                  và{" "}
                  <span className="gradient-text font-semibold">
                    {" "}
                    tăng chất lượng
                  </span>{" "}
                  ngay trong trình xem ảnh của bạn.
                </li>
                <li>
                  <span className="gradient-text font-semibold"> Xóa nền</span>{" "}
                  sẽ loại bỏ nền của ảnh, giúp bạn có nhưng tấm ảnh chân dung
                  đẹp cho bất kì khung hình nào. Tính năng
                  <span className="gradient-text font-semibold">
                    {" "}
                    tăng chất lượng
                  </span>{" "}
                  giúp ảnh của bạn rõ nét hơn, giúp tăng gấp đôi độ phân giải
                  của ảnh mà vẫn giữ nguyên nội dung cốt lõi.
                </li>
              </ul>
            </article>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Modal
        placement="center"
        classNames={{ closeButton: "bg-black/10 z-10 backdrop-blur-lg" }}
        className={cn("max-w-sm", open.o && "max-w-[500px]")}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {!open.o ? (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center justify-center mt-3">
                  {language === "Vietnamese" ? "Bắt đầu" : "Get Started"}
                </ModalHeader>
                <ModalBody className="px-7">
                  <span className="text-xs">
                    {" "}
                    {language === "Vietnamese"
                      ? "Bạn mới sử dụng Heartsteal.Ai? Cần trợ giúp để tìm ra cái gì là gì? Việc giới thiệu của chúng tôi sẽ giúp hướng dẫn bạn làm quen với nền tảng."
                      : "New to Leonardo.Ai? Need help with figuring out what's what? Our onboarding will help to guide you around the platform."}
                  </span>
                  <span className="text-xs">
                    {language === "Vietnamese"
                      ? "Bạn cần giúp gì?"
                      : "What do you need help with?"}
                  </span>
                  <div className=" flex flex-col gap-3 items-center">
                    {guides.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setOpen({ o: true, i: index });
                        }}
                        className=" w-full h-12 flex items-center justify-between px-3 text-sm font-medium bg-white/5 rounded-lg cursor-pointer hover:bg-white/15 duration-500"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-5 h-5" />
                          {item.title}
                        </div>
                        <ChevronRight />
                      </div>
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter className="flex items-center justify-center">
                  <Button className="bg-gr" onPress={onClose}>
                    Done
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        ) : (
          <ModalContent className="p-0">
            <div
              onClick={() => setOpen({ o: false, i: -1 })}
              className=" absolute left-2 z-10 rounded-full group top-2 p-2 cursor-pointer bg-black/10 backdrop-blur-lg"
            >
              <ChevronLeft className=" w-4 h-4 group-hover:scale-125 duration-500" />
            </div>
            <ModalBody className="p-0">
              <GuideItem item={guides[open.i]} />
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
      <div
        onClick={onOpen}
        className=" group flex items-center justify-center p-2 cursor-pointer hover:bg-slate-900 duration-500 rounded-full border border-slate-700"
      >
        <span className=" group-hover:scale-105 duration-500 flex items-center justify-center w-4 h-4 text-xs rounded-full bg-gr">
          ?
        </span>
      </div>
    </>
  );
};

const GuideItem = ({ item }: { item: GuideProps }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <>
      <Carousel
        setApi={setApi}
        draggable={false}
        opts={{
          align: "start",
        }}
        className="w-full h-full"
      >
        <CarouselContent className="">
          {item.slide.map((i, ind) => (
            <CarouselItem key={ind}>
              <Card className=" h-full border-none shadow-none ">
                <CardHeader className="px-10 pb-0 backdrop-blur-lg overflow-hidden">
                  <div className=" absolute w-full h-full left-0 top-0 bg-gr opacity-25 "></div>
                  <div className="group w-full translate-y-3 h-[230px] relative scale-110 flex items-center justify-center">
                    <Image
                      fill
                      alt=""
                      className="rounded-[10px]"
                      src={i.bg}
                      sizes="(max-width: 768px) 100vw,66vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody className="overflow-hidden items-center border-none">
                  <span className=" font-semibold text-lg">{i.title}</span>
                  <span className=" font-semibold">{i.subTitle}</span>
                  {i.desc}
                </CardBody>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselFooter count={item.slide.length} current={current} />
      </Carousel>
    </>
  );
};
const CarouselFooter = ({
  count,
  current,
}: {
  count: number;
  current: number;
}) => {
  const { scrollNext, canScrollNext, scrollPrev, canScrollPrev } =
    useCarousel();
  const { language } = useLanguage();
  return (
    <div className=" flex items-center gap-3 justify-center h-14">
      <div
        onClick={scrollPrev}
        className={cn(
          " rounded-lg p-3 flex items-center justify-center cursor-pointer hover:bg-white/10 bg-white/5",
          !canScrollPrev && "opacity-50 pointer-events-none"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </div>
      <div className=" flex items-center justify-center gap-2">
        {Array(count)
          .fill(0)
          .map((item, index) => (
            <span
              key={index}
              className={cn(
                " rounded-full w-2 h-2 bg-white/50 duration-500",
                current === index + 1 && "w-4 bg-gr"
              )}
            ></span>
          ))}
      </div>
      <Button
        onPress={scrollNext}
        className={cn(
          "text-sm bg-gr flex items-center justify-center rounded-md",
          !canScrollNext && "opacity-50 pointer-events-none"
        )}
      >
        {language === "Vietnamese" ? "Tiếp" : "Next"}
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Guide;

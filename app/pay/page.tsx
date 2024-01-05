"use client";

import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { ArrowLeft, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

const PayPage = () => {
  const router = useRouter();
  const language = useLanguage();
  const payCard =
    language.language !== "Vietnamese"
      ? [
          {
            title: "Free",
            price: "0$",
            subPrice: "Forever",
            sub: {
              title: "150 daily tokens",
              benefits: [
                { b: true, t: "150 fast tokens, resets once per day" },
                { b: false, t: "No relaxed rate image generation jobs" },
                { b: false, t: "No additional pending jobs" },
                { b: false, t: "No model training" },
                { b: false, t: "No model retention" },
                { b: false, t: "No Concurrency" },
              ],
            },
          },
          {
            title: "Professor",
            price: "799$",
            salePrice: "999$",
            subPrice: "Forever",
            sub: {
              title: "Unlimied tokens",
              benefits: [
                { b: true, t: "Unlimied fast tokens" },
                { b: true, t: "Unlimied rate image generation jobs" },
                { b: true, t: "Unlimied additional pending jobs" },
                { b: true, t: "Unlimied model training" },
                { b: true, t: "Unlimied model retention" },
                { b: true, t: "Unlimied Concurrency" },
              ],
            },
          },
        ]
      : [
          {
            title: "Miễn phí",
            price: "0đ",
            subPrice: "Vĩnh viễn",
            sub: {
              title: "150 tokens một ngày",
              benefits: [
                {
                  b: true,
                  t: "150 mã thông báo nhanh, đặt lại một lần mỗi ngày",
                },
                {
                  b: false,
                  t: "Không có công việc tạo hình ảnh có tỷ lệ thoải mái",
                },
                { b: false, t: "Không có công việc đang chờ xử lý bổ sung" },
                { b: false, t: "Không có mô hình đào tạo" },
                { b: false, t: "Không có mô hình lưu giữ" },
                { b: false, t: "Không đồng thời" },
              ],
            },
          },
          {
            title: "Pro",
            price: "799k",
            salePrice: "999k",
            subPrice: "Vĩnh viễn",
            sub: {
              title: "Tokens không giới hạn",
              benefits: [
                { b: true, t: "Tokens nhanh không giới hạn" },
                { b: true, t: "Công việc tạo hình ảnh hiếm không giới hạn" },
                {
                  b: true,
                  t: "Công việc đang chờ xử lý bổ sung không giới hạn",
                },
                { b: true, t: "Đào tạo mô hình không giới hạn" },
                { b: true, t: "Lưu giữ mô hình không giới hạn" },
                { b: true, t: "Đồng thời không giới hạn" },
              ],
            },
          },
        ];
  return (
    <div className=" w-full h-full flex items-center flex-col">
      <div
        onClick={() => router.back()}
        className=" text-sm font-semibold absolute left-7 cursor-pointer top-7 flex items-center gap-3"
      >
        <ArrowLeft size="17" className=" text-slate-400" />
        {language.language === "Vietnamese"
          ? "Trở về HeartSteal"
          : "Back to HeartSteal"}
      </div>
      <span className=" text-2xl font-semibold sm:mt-7 mt-14 text-center">
        {language.language === "Vietnamese"
          ? "Mở khóa sức mạnh của HeartSteal.Ai"
          : "Unlock the power of HeartSteal.Ai"}
      </span>
      <span className=" text-sm text-slate-400 mt-2">
        {language.language === "Vietnamese"
          ? "Chọn một kế hoạch phù hợp với nhu cầu của bạn"
          : "Choose a plan tailored to your needs"}
      </span>
      <div className="flex sm:flex-row flex-col items-start gap-10 mt-10 justify-center sm:px-0 px-3">
        {payCard.map((item, index) => (
          <Card key={index} classNames={{ base: "sm:h-[70dvh]" }}>
            <CardBody className=" items-center sm:max-w-60  p-5 h-full gap-2">
              <span className=" sm:text-xl text-3xl gradient-text">
                {item.title}
              </span>

              <span className="sm:text-md text-xl text-slate-500">
                {" "}
                <span
                  className={cn(
                    " font-semibold sm:text-3xl text-5xl text-white",
                    item.title === "Professor" ||
                      (item.title === "Pro" && "gradient-text")
                  )}
                >
                  {" "}
                  {item.price}
                </span>{" "}
                /month
              </span>
              <span className=" sm:text-sm text-lg text-slate-500">
                {item.subPrice}
              </span>
              {item.price == "0đ" || item.price === "0$" ? null : (
                <Button className="bg-gr sm:text-sm text-2xl sm:py-5 py-7 px-10 rounded-md">
                  {language.language === "Vietnamese" ? "Đăng ký" : "Subscribe"}
                </Button>
              )}

              <Card className=" mt-auto">
                <CardHeader>{item.sub.title}</CardHeader>
                <CardBody className=" gap-4">
                  {item.sub.benefits.map((i, ind) => (
                    <div
                      key={ind}
                      className=" flex sm:text-xs text-xl items-start gap-1"
                    >
                      {i.b ? (
                        <div className="">
                          <Check className=" text-green-500" size="17" />
                        </div>
                      ) : (
                        <div className="">
                          <X className=" text-rose-700" size="17" />{" "}
                        </div>
                      )}
                      {i.t}
                    </div>
                  ))}
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PayPage;

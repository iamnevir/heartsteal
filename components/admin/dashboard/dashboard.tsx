"use client";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { usePaginatedQuery, useQuery } from "convex/react";
import { BrainCog, CalendarHeart, ScrollText, Users } from "lucide-react";
import EventItem from "./event-item";
import { Area, AreaConfig } from "@ant-design/plots";
import { getDataForChart } from "@/lib/utils";
const DashBoard = () => {
  const { language } = useLanguage();
  const models = useQuery(api.model.getmodelsforAdmin);
  const users = useQuery(api.user.getUsers);
  const orders = useQuery(api.order.getorders);
  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImages,
    {},
    { initialNumItems: 5 }
  );
  if (models === undefined || users === undefined || orders === undefined) {
    return (
      <div className="">
        <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Skeleton className=" w-full h-40 rounded-md" />
          <Skeleton className=" w-full h-40 rounded-md" />
          <Skeleton className=" w-full h-40 rounded-md" />
        </div>
        <div className=" flex sm:flex-row flex-col mt-5 gap-5">
          <Skeleton className=" w-[35%] sm:h-[60dvh] rounded-md" />
          <Skeleton className=" w-[65%] sm:h-[60dvh] rounded-md" />
        </div>
      </div>
    );
  }
  if (!models || !users || !orders) {
    return null;
  }
  const data = getDataForChart(models, users, orders, language);
  const usersData = data?.filter((item) => item.countType === "Người dùng");
  const ordersData = data?.filter((item) => item.countType === "Đơn hàng");
  const modelsData = data?.filter((item) => item.countType === "Mô hình");
  const config: AreaConfig = {
    data: data ? data : [],
    yField: "count",
    xField: "date",
    isStack: false,
    seriesField: "countType",
    animation: true,
    smooth: true,
    slider: {
      start: 0,
      end: 1,
    },
  };
  return (
    <div>
      <div className=" flex sm:flex-row flex-col gap-5">
        <Card className="w-fit mt-4">
          <CardBody className="flex sm:flex-row">
            <div className=" flex p-2 gap-3">
              <BrainCog className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-xl dark:text-white/50">
                  {language === "Vietnamese" ? "Số lượng model" : "Total Model"}
                </span>
                <span className="font-semibold text-2xl">{models?.length}</span>
              </div>
              <Area
                data={modelsData!}
                style={{ maxWidth: "200px", maxHeight: "150px" }}
                xField="date"
                yField="count"
                appendPadding={[1, 0, 0, 0]}
                padding={0}
                syncViewPadding
                yAxis={{
                  label: {
                    style: {
                      stroke: "transparent",
                    },
                  },
                  grid: {
                    line: {
                      style: {
                        stroke: "transparent",
                      },
                    },
                  },
                }}
                autoFit
                tooltip={false}
                animation
                xAxis={false}
                smooth
                line={{ color: "#fa5560" }}
                areaStyle={() => {
                  return { fill: `l(270) 0:#fff 0.2#fa5560 1:#fa5560` };
                }}
              />
            </div>
          </CardBody>
        </Card>
        <Card className="w-fit mt-4">
          <CardBody className="flex sm:flex-row">
            <div className=" flex p-2 gap-3">
              <Users className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-xl dark:text-white/50">
                  {language === "Vietnamese"
                    ? "Số lượng người dùng"
                    : "Total User"}
                </span>
                <span className="font-semibold text-2xl">{users?.length}</span>
              </div>
              <Area
                data={usersData!}
                style={{ maxWidth: "200px", maxHeight: "150px" }}
                xField="date"
                yField="count"
                appendPadding={[1, 0, 0, 0]}
                padding={0}
                syncViewPadding
                yAxis={{
                  label: {
                    style: {
                      stroke: "transparent",
                    },
                  },
                  grid: {
                    line: {
                      style: {
                        stroke: "transparent",
                      },
                    },
                  },
                }}
                autoFit
                tooltip={false}
                animation
                xAxis={false}
                smooth
                line={{ color: "#b14bf4" }}
                areaStyle={() => {
                  return { fill: `l(270) 0:#fff 0.2#b14bf4 1:#b14bf4` };
                }}
              />
            </div>
          </CardBody>
        </Card>
        <Card className="w-fit mt-4">
          <CardBody className="flex sm:flex-row">
            <div className=" flex p-2 gap-3">
              <ScrollText className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-xl dark:text-white/50">
                  {language === "Vietnamese"
                    ? "Số lượng đơn hàng"
                    : "Total Order"}
                </span>
                <span className="font-semibold text-2xl">{orders?.length}</span>
              </div>
              <Area
                data={ordersData!}
                style={{ maxWidth: "200px", maxHeight: "150px" }}
                xField="date"
                yField="count"
                appendPadding={[1, 0, 0, 0]}
                padding={0}
                syncViewPadding
                yAxis={{
                  label: {
                    style: {
                      stroke: "transparent",
                    },
                  },
                  grid: {
                    line: {
                      style: {
                        stroke: "transparent",
                      },
                    },
                  },
                }}
                autoFit
                tooltip={false}
                animation
                xAxis={false}
                smooth
                line={{ color: "#4d91ff" }}
                areaStyle={() => {
                  return { fill: `l(270) 0:#fff 0.2#4d91ff 1:#4d91ff` };
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <div className=" flex  sm:flex-row flex-col gap-5 mt-5">
        <Card className=" w-full max-w-[400px] max-h-[450px]">
          <CardHeader>
            <div className=" flex items-center gap-3">
              <CalendarHeart className="w-5 h-5" />
              <span className="text-sm">
                {language === "Vietnamese" ? "Sự kiện mới" : "New Events"}
              </span>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className=" flex flex-col gap-2 p-2">
              {results.map((item, index) => (
                <EventItem item={item} key={index} />
              ))}
              {status === "CanLoadMore" ? (
                <Button
                  onPress={() => loadMore(5)}
                  className="bg-gr rounded-md"
                >
                  {language === "Vietnamese" ? "Xem thêm" : "Load More"}
                </Button>
              ) : null}
            </div>
          </CardBody>
        </Card>
        <Card className=" w-full">
          <CardBody>
            <Area {...config} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;

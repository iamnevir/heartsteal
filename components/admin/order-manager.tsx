import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import {
  Card,
  CardBody,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useQuery } from "convex/react";
import { useMediaQuery } from "usehooks-ts";
import { UserCheck2, Users } from "lucide-react";

import { useCallback } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { formatVietnameseDateTime } from "@/lib/utils";
import UserOrder from "./user-order";
import Loading from "@/app/loading";
const OrderManager = ({ userId }: { userId: string }) => {
  const user = useQuery(api.user.getUserByUser, { userId });
  const orders = useQuery(api.order.getorders);
  const isMobile = useMediaQuery("(max-width:768px)");
  const { language } = useLanguage();
  const columns = [
    { name: "Người dùng", uid: "userId" },
    { name: "Thanh toán", uid: "isPay" },
    { name: "Gói", uid: "amount" },
    { name: "Phương thức", uid: "bank" },
    { name: "Ngày tạo", uid: "_creationTime" },
  ];

  const renderCell = useCallback(
    (order: Doc<"order">, columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof Doc<"order">];
      switch (columnKey) {
        case "userId":
          return <UserOrder userId={order.userId} isMobile={isMobile} />;
        case "isPay":
          return (
            <Chip className={order.isPay ? "bg-gr" : "bg-red-500"}>
              {order.isPay ? "Đã thanh toán" : "Chưa thanh toán"}
            </Chip>
          );
        case "_creationTime":
          return formatVietnameseDateTime(order._creationTime);
        default:
          return cellValue;
      }
    },
    []
  );
  if (orders === undefined) {
    return <Loading />;
  }
  if (!user?.isAdmin) {
    return null;
  }
  return (
    <>
      <div className="sm:pl-64 sm:p-4 p-2">
        <span className="text-3xl font-semibold gradient-text">Đơn hàng</span>
        <Card className="w-fit mt-4">
          <CardBody className="flex sm:flex-row">
            <div className=" flex items-center p-5 gap-3">
              <Users className="w-20 h-20" />
              <div className="flex flex-col">
                <span className="text-xl text-white/50">
                  {language === "Vietnamese"
                    ? "Số lượng đơn hàng"
                    : "Total User"}
                </span>
                <span className="font-semibold text-2xl">{orders?.length}</span>
              </div>
            </div>
            <div className=" flex items-center p-5 gap-3">
              <UserCheck2 className="w-20 h-20" />
              <div className="flex flex-col">
                <span className="text-xl text-white/50">
                  {language === "Vietnamese" ? "Đã thanh toán" : "Premium User"}
                </span>
                <span className="font-semibold text-2xl">
                  {orders?.filter((f) => f.isPay === true).length}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className=" flex flex-col mt-4 gap-3">
          <span className="text-xl font-semibold">
            {language === "Vietnamese" ? "Tất cả đơn hàng" : "All Order"}
          </span>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={orders}>
              {(item) => (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default OrderManager;

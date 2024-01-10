import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import {
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  cn,
} from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { useMediaQuery } from "usehooks-ts";
import { Trash2, UserCheck2, Users } from "lucide-react";
import { useCallback, useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { formatVietnameseDateTime } from "@/lib/utils";
import ConfirmModal from "../confirm-modal";
import ChangePro from "./change-pro";
import ChangeRole from "./change-role";
import ChangeCoin from "./change-coin";
import Loading from "@/app/loading";
const UserManager = ({ userId }: { userId: string }) => {
  const user = useQuery(api.user.getUserByUser, { userId });
  const users = useQuery(api.user.getUsers);

  const remove = useMutation(api.user.remove);
  const isMobile = useMediaQuery("(max-width:768px)");
  const { language } = useLanguage();
  const [delele, setDelete] = useState<{ o: boolean; id?: Id<"user"> }>({
    o: false,
    id: undefined,
  });
  const columns = [
    { name: "Người dùng", uid: "username" },
    { name: "Coin", uid: "coin" },
    { name: "Quyền", uid: "isAdmin" },
    { name: "Premium", uid: "isPro" },
    { name: "Ngày tạo", uid: "_creationTime" },
    { name: "", uid: "actions" },
  ];

  const renderCell = useCallback((user: Doc<"user">, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Doc<"user">];
    switch (columnKey) {
      case "username":
        return (
          <User
            className={cn("ml-5 gradient-text ")}
            name={user.username}
            classNames={{ name: isMobile ? "text-xl" : "", base: "max-w-xs" }}
            description={
              user.favorite
                ? isMobile
                  ? user.favorite[0]
                  : user.favorite.join(", ")
                : ""
            }
            avatarProps={{
              title: "",
              name: user.username?.charAt(0).toUpperCase(),
              className: isMobile
                ? "w-10 h-10 bg-gr"
                : "w-[30px] h-[30px] bg-gr ",
            }}
          />
        );
      case "coin":
        return (
          <ChangeCoin coin={user.coin ? user.coin : 0} userId={user._id} />
        );
      case "isAdmin":
        return <ChangeRole isAdmin={!!user.isAdmin} userId={user._id} />;
      case "isPro":
        return <ChangePro isPro={!!user.isPro} userId={user._id} />;
      case "_creationTime":
        return formatVietnameseDateTime(user._creationTime);
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip
              color="danger"
              content={
                language === "Vietnamese" ? "Xóa người dùng" : "Delete user"
              }
            >
              <span
                onClick={() => setDelete({ o: true, id: user._id })}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <Trash2 className=" text-red-500" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  if (users === undefined) {
    return <Loading />;
  }
  if (!user?.isAdmin) {
    return null;
  }
  return (
    <>
      <ConfirmModal
        title={
          language === "Vietnamese"
            ? "Xác nhận xóa người dùng này?"
            : "Confirm delete this user?"
        }
        isOpen={delele.o}
        onClose={() => setDelete({ o: false, id: undefined })}
        handleDelete={() => {
          remove({ id: delele.id! });
          setDelete({ o: false, id: undefined });
        }}
      />
      <div>
        <div className="sm:pl-64 sm:p-4 p-2">
          <span className="text-3xl font-semibold gradient-text">Admin</span>
          <Card className="w-fit mt-4">
            <CardBody className="flex sm:flex-row">
              <div className=" flex items-center p-5 gap-3">
                <Users className="w-20 h-20" />
                <div className="flex flex-col">
                  <span className="text-xl dark:text-white/50">
                    {language === "Vietnamese"
                      ? "Số lượng người dùng"
                      : "Total User"}
                  </span>
                  <span className="font-semibold text-2xl">
                    {users?.length}
                  </span>
                </div>
              </div>
              <div className=" flex items-center p-5 gap-3">
                <UserCheck2 className="w-20 h-20" />
                <div className="flex flex-col">
                  <span className="text-xl dark:text-white/50">
                    {language === "Vietnamese"
                      ? "Người dùng vip"
                      : "Premium User"}
                  </span>
                  <span className="font-semibold text-2xl">
                    {users?.filter((f) => f.isPro === true).length}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className=" flex flex-col mt-4 gap-3">
            <span className="text-xl font-semibold">
              {language === "Vietnamese" ? "Tất cả người dùng" : "All User"}
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
              <TableBody items={users}>
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
      </div>{" "}
    </>
  );
};

export default UserManager;

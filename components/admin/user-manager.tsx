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
import { useMediaQuery } from "usehooks-ts";
import { Trash2, UserCheck2, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { backEndUrl, formatVietnameseDateTime } from "@/lib/utils";
import ConfirmModal from "../confirm-modal";
import ChangePro from "./change-pro";
import ChangeRole from "./change-role";
import ChangeCoin from "./change-coin";
import Loading from "@/app/loading";
import { toast } from "sonner";
const UserManager = ({ userId }: { userId: string }) => {
  const [u, setU] = useState<Doc<"user">>();
  const [users, setUsers] = useState<Doc<"user">[]>();
  const fetchUser = async () => {
    const response = await fetch(`${backEndUrl}/user/by_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();
    setU(data.user);
    if (data.user?.isAdmin) {
      const response2 = await fetch(`${backEndUrl}/user`, {
        method: "GET",
      });
      const data2 = await response2.json();
      setUsers(data2.users);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);
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
          <ChangeCoin
            coin={user.coin ? user.coin : 0}
            userId={user._id}
            reset={fetchUser}
          />
        );
      case "isAdmin":
        return (
          <ChangeRole
            isAdmin={!!user.isAdmin}
            userId={user._id}
            reset={fetchUser}
          />
        );
      case "isPro":
        return (
          <ChangePro isPro={!!user.isPro} userId={user._id} reset={fetchUser} />
        );
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
  if (!u?.isAdmin) {
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
        handleDelete={async () => {
          const res = await fetch(`${backEndUrl}/user/remove`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: delele.id,
            }),
          });
          if (res.status === 200) {
            toast.success(
              language === "Vietnamese"
                ? "Cập nhật thành công."
                : "Created Profile."
            );
          } else {
            toast.error(
              language === "Vietnamese"
                ? "Cập nhật không thành công."
                : "Created Failed."
            );
          }
          setDelete({ o: false, id: undefined });
          await fetchUser();
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

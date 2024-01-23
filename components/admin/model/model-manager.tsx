import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import {
  Button,
  Card,
  CardBody,
  Chip,
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
import { BrainCog, Edit, Trash2, UserCheck2, Users } from "lucide-react";
import { useCallback, useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { formatVietnameseDateTime } from "@/lib/utils";
import ConfirmModal from "../../confirm-modal";
import Loading from "@/app/loading";
import { toast } from "sonner";
import Image from "next/image";
import ChangeActive from "./change-active";
import CreateEditModel from "./create-edit-model";
import { useEdgeStore } from "@/lib/edgestore";
import ChangePro from "./change-pro";
const ModelManager = ({ userId }: { userId: string }) => {
  const user = useQuery(api.user.getUserByUser, { userId });
  const models = useQuery(api.model.getmodelsforAdmin);
  const remove = useMutation(api.model.remove);
  const { edgestore } = useEdgeStore();
  const { language } = useLanguage();
  const [delele, setDelete] = useState<{ o: boolean; model?: Doc<"model"> }>({
    o: false,
    model: undefined,
  });
  const columns = [
    { name: "Avatar", uid: "avatar" },
    { name: "Tên mô hình", uid: "name" },
    { name: "Hoạt động", uid: "isActive" },
    { name: "Premium", uid: "isPro" },
    { name: "Tác giả", uid: "author" },
    { name: "Phiên bản", uid: "version" },
    { name: "Mô hình cơ sở", uid: "baseModel" },
    { name: "Ngày tạo", uid: "_creationTime" },
    { name: "", uid: "actions" },
  ];

  const renderCell = useCallback(
    (model: Doc<"model">, columnKey: React.Key) => {
      const cellValue = model[columnKey as keyof Doc<"model">];
      switch (columnKey) {
        case "avatar":
          if (model.avatar) {
            return (
              <div className=" relative w-[150px] h-[100px]">
                <Image
                  src={model.avatar!}
                  alt={model.name ? model.name : "Unknown"}
                  fill
                  sizes="(max-width: 768px) 100vw,66vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          } else {
            return (
              <Chip color="danger" variant="flat">
                None
              </Chip>
            );
          }

        case "isActive":
          return <ChangeActive modelId={model._id} isActive={model.isActive} />;
        case "isPro":
          return <ChangePro modelId={model._id} isPro={!!model.isPro} />;
        case "_creationTime":
          return formatVietnameseDateTime(model._creationTime);
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <CreateEditModel currentModel={model} />

              <Tooltip
                color="danger"
                content={
                  language === "Vietnamese" ? "Xóa mô hình" : "Delete Model"
                }
              >
                <span
                  onClick={() => setDelete({ o: true, model: model })}
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
    },
    []
  );
  if (models === undefined) {
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
        onClose={() => setDelete({ o: false, model: undefined })}
        handleDelete={async () => {
          try {
            remove({ id: delele.model?._id! });
            toast.success(
              language === "Vietnamese" ? "Đã xóa mô hình." : "Model Deleted."
            );
            if (delele.model?.avatar) {
              await edgestore.publicFiles.delete({ url: delele.model?.avatar });
            }
          } catch (error) {
            console.log(error);
            toast.error(
              language === "Vietnamese"
                ? "Xóa người dùng không thành công."
                : "Delete Failed."
            );
          }
          setDelete({ o: false, model: undefined });
        }}
      />
      <div>
        <div className="sm:pl-64 sm:p-4 p-2">
          <span className="text-3xl font-semibold gradient-text">Model</span>
          <Card className="w-fit mt-4">
            <CardBody className="flex sm:flex-row">
              <div className=" flex items-center p-5 gap-3">
                <BrainCog className="w-20 h-20" />
                <div className="flex flex-col">
                  <span className="text-xl dark:text-white/50">
                    {language === "Vietnamese"
                      ? "Số lượng model"
                      : "Total Model"}
                  </span>
                  <span className="font-semibold text-2xl">
                    {models?.length}
                  </span>
                </div>
              </div>
              <div className=" flex items-center p-5 gap-3">
                <UserCheck2 className="w-20 h-20" />
                <div className="flex flex-col">
                  <span className="text-xl dark:text-white/50">
                    {language === "Vietnamese"
                      ? "Mô hình hoạt động"
                      : "Active Model"}
                  </span>
                  <span className="font-semibold text-2xl">
                    {models?.filter((f) => f.isActive === true).length}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className=" flex flex-col mt-4 gap-3">
            <div className=" flex items-center justify-between">
              <span className="text-xl font-semibold">
                {language === "Vietnamese" ? "Tất cả mô hình" : "All Model"}
              </span>
              <CreateEditModel />
            </div>

            <Table aria-label="Example table with custom ">
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
              <TableBody items={models}>
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

export default ModelManager;

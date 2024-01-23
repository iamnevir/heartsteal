"use client";
import CommunityFeed from "@/components/community-feed/community-feed";
import SearchBar from "@/components/community-feed/search-bar";
import { api } from "@/convex/_generated/api";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useGridImage } from "@/hooks/use-grid";
import { useLanguage } from "@/hooks/use-language";
import { Button, Divider, User } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { Wand2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModelFeed from "./model-feed";

const Model = ({ modelId }: { modelId: string }) => {
  const [search, setSearch] = useState("");
  const { grid, setGrid } = useGridImage();
  const model = useQuery(api.model.getmodelByModelId, { modelId });
  const { language } = useLanguage();
  const generation = useGenerateImage();
  const router = useRouter();
  if (!model) {
    return null;
  }
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">
          {language === "Vietnamese" ? "Mô hình" : "Model"}
        </span>{" "}
        {language === "Vietnamese" ? "sáng tạo" : "Creations"}
      </span>
      <div className="flex sm:flex-row flex-col item-start gap-4 py-2 sm:max-w-[50dvw] w-full">
        <Image
          className="rounded-md sm:w-[240px] sm:h-[370px] w-full"
          alt=""
          placeholder="blur"
          blurDataURL="/placeholder.png"
          src={model.avatar ? model.avatar : ""}
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
              name={model.author ? model.author : "Unknow"}
              avatarProps={{
                name: model.author?.charAt(0),
                className: "w-[30px] h-[30px] bg-gr ",
              }}
            />
          </div>

          <span className="gradient-text font-semibold">{model.name}</span>

          <Divider />
          <span className=" text-xs text-white/50">
            {language === "Vietnamese" ? "Mô tả" : "Description"}
          </span>
          <span className="text-sm">{model.desc}</span>
          <Button
            onPress={() => {
              generation.setTab("history");
              generation.setModel(model.modelId);
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
      <SearchBar setGrid={setGrid} setSearch={setSearch} search={search} />
      <Divider className="mt-3" />
      <ModelFeed model={model} grid={grid} search={search} />
    </div>
  );
};

export default Model;

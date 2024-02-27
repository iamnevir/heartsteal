"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as fal from "@fal-ai/serverless-client";
import { Button, Textarea } from "@nextui-org/react";
import { useLanguage } from "@/hooks/use-language";
import { ArrowLeft, BookUpIcon, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { useTheme } from "next-themes";
import { useCanvas } from "@/hooks/use-canvas";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

const seed = Math.floor(Math.random() * 100000);
const baseArgs = {
  sync_mode: true,
  strength: 0.99,
  seed,
};

const RealtimeCanvas = ({ userId }: { userId: string }) => {
  const { language } = useLanguage();

  const { theme } = useTheme();
  const router = useRouter();
  const [sceneData, setSceneData] = useState<any>(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [_appState, setAppState] = useState<any>(null);
  const [excalidrawExportFns, setexcalidrawExportFns] = useState<any>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [Comp, setComp] = useState<any>(null);
  const canvas = useCanvas();
  const u = useQuery(api.user.getUserByUser, { userId });
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setComp(comp.Excalidraw));
  }, []);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (u) {
      if (!u.isPro) {
        toast.error(
          language === "Vietnamese"
            ? "Hãy nâng cấp tài khoản để sử dụng."
            : "Upgrade premium to use."
        );
      }
    }
  }, [u]);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((module) =>
      setexcalidrawExportFns({
        exportToBlob: module.exportToBlob,
        serializeAsJSON: module.serializeAsJSON,
      })
    );
  }, []);

  const { send } = fal.realtime.connect("110602490-sdxl-turbo-realtime", {
    connectionKey: "realtime-nextjs-app",
    onResult(result) {
      if (result.error) return;
      canvas.setImage(result.images[0].url);
    },
  });

  async function getDataUrl(appState = _appState) {
    const elements = excalidrawAPI.getSceneElements();
    if (!elements || !elements.length) return;
    const blob = await excalidrawExportFns.exportToBlob({
      elements,
      exportPadding: 0,
      appState,
      quality: 0.5,
      files: excalidrawAPI.getFiles(),
      getDimensions: () => {
        return { width: 450, height: 450 };
      },
    });
    return await new Promise((r) => {
      let a = new FileReader();
      a.onload = r;
      a.readAsDataURL(blob);
    }).then((e: any) => e.target.result);
  }
  const onDownload = () => {
    if (canvas.image) {
      saveAs(canvas.image);
    }
  };
  return (
    <div className=" w-[100vw] h-[100vh] flex flex-col items-center gap-1 ">
      <div className=" p-4 flex w-full items-center justify-between">
        <div
          onClick={() => router.back()}
          className=" flex items-center sm:gap-3 gap-1 text-xs cursor-pointer"
        >
          <ArrowLeft className="sm:w-4 sm:h-4 w-6 h-6" />
          {language === "Vietnamese" ? "Quay lại" : "Go Back"}
        </div>
        <div className="font-semibold flex gap-1 text-xs">
          <span className="sm:flex hidden">HeartSteal.Ai </span>
          <span className="gradient-text">Realtime Canvas</span>
        </div>
        <div
          className={cn(
            "flex items-center gap-3",
            !u?.isPro && "pointer-events-none opacity-50"
          )}
        >
          <Button size="sm" className="bg-gr sm:flex hidden">
            {language === "Vietnamese"
              ? "Tăng độ phân giải ảnh"
              : "Upscale Image"}
          </Button>
          <Button size="sm" className="bg-gr sm:hidden">
            <BookUpIcon className="w-6 h-6" />
          </Button>
          <Button onPress={onDownload} size="sm" className="bg-gr">
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className=" flex items-center justify-center flex-col gap-3">
        <div className=" flex lg:flex-row flex-col items-center justify-center gap-3">
          <div
            className={cn(
              " lg:w-[500px] lg:h-[500px] w-[95vw] h-[50vh]",
              !u?.isPro && "pointer-events-none opacity-50"
            )}
          >
            {isClient && excalidrawExportFns && (
              <Comp
                theme={theme}
                initialData={{ elements: canvas.element }}
                excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
                onChange={async (elements: any, appState: any) => {
                  const newSceneData = excalidrawExportFns.serializeAsJSON(
                    elements,
                    appState,
                    excalidrawAPI.getFiles(),
                    "local"
                  );
                  if (newSceneData !== sceneData) {
                    setAppState(appState);
                    canvas.setElement(elements);
                    setSceneData(newSceneData);
                    let dataUrl = await getDataUrl(appState);
                    send({
                      ...baseArgs,
                      image_url: dataUrl,
                      prompt: canvas.prompt,
                    });
                  }
                }}
              />
            )}
          </div>
          <div className=" lg:w-[500px] lg:h-[500px] w-[95vw] h-[50vh] relative">
            {canvas.image !== "" ? (
              <Image
                src={canvas.image}
                placeholder="blur"
                blurDataURL="/logo.png"
                priority
                sizes="(max-width: 768px) 100vw,66vw"
                width={500}
                height={500}
                style={{
                  objectFit: "cover",
                }}
                alt="fal image"
              />
            ) : (
              <Image
                src="/logo.png"
                placeholder="blur"
                blurDataURL="/logo.png"
                priority
                sizes="(max-width: 768px) 100vw,66vw"
                width={500}
                height={500}
                style={{
                  objectFit: "cover",
                }}
                alt="fal image"
              />
            )}
          </div>
        </div>
        <div
          className={cn(
            " w-full",
            !u?.isPro && "pointer-events-none opacity-50"
          )}
        >
          <Textarea
            className=" w-full"
            classNames={{
              inputWrapper:
                "dark:bg-slate-900/70 bg-slate-200 rounded-md focus-visible:border-2",
              base: "h-12",
            }}
            value={canvas.prompt}
            placeholder={
              language === "Vietnamese"
                ? "Nhập mô tả cho bức ảnh của bạn..."
                : "Type a prompt..."
            }
            onValueChange={async (text) => {
              canvas.setPrompt(text);
              let dataUrl = await getDataUrl();
              send({
                ...baseArgs,
                prompt: text,
                image_url: dataUrl,
              });
            }}
            isRequired
            maxLength={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default RealtimeCanvas;

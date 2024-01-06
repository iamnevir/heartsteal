import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import { cn, timeResetCoin } from "@/lib/utils";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { Gem, Infinity as Infi, LucideShieldQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

const CoinControl = ({ userId }: { userId: string }) => {
  const user = useQuery(api.user.getUserByUser, { userId });
  const router = useRouter();
  const language = useLanguage();
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <div className=" w-full justify-center flex items-center mb-3">
      <div className=" rounded-full bg-[#0B0F17] sm:w-44 w-[80%] sm:h-12 h-14 p-4 flex items-center justify-center gap-1">
        {user?.isPro ? (
          <div className="w-6 h-6">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18.1777 8C23.2737 8 23.2737 16 18.1777 16C13.0827 16 11.0447 8 5.43875 8C0.85375 8 0.85375 16 5.43875 16C11.0447 16 13.0828 8 18.1788 8H18.1777Z"
                stroke="url(#radialGradient)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        ) : (
          <span className={cn(" sm:text-xs text-lg font-semibold")}>
            {user?.coin}
          </span>
        )}
        {isMobile ? (
          <Gem className=" w-5 h-5 sm:hidden text-red-400" />
        ) : (
          <div className="w-6 h-6 mt-1 sm:block hidden">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <radialGradient
                id="radialGradient"
                gradientTransform="rotate(-14)"
              >
                <stop
                  offset="0.01%"
                  style={{ stopColor: "rgb(250,85,96);stop-opacity:1" }}
                />
                <stop
                  offset="49.9%"
                  style={{ stopColor: "rgb(177,75,244);stop-opacity:1" }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgb(77,145,255);stop-opacity:1" }}
                />
              </radialGradient>
              <path
                fill="url(#radialGradient)"
                d="M8.5,23a9.069,9.069,0,0,0,3.5-.68,8.92,8.92,0,0,0,3.5.68c3.645,0,6.5-1.945,6.5-4.429V14.429C22,11.945,19.145,10,15.5,10c-.169,0-.335.008-.5.017V5.333C15,2.9,12.145,1,8.5,1S2,2.9,2,5.333V18.667C2,21.1,4.855,23,8.5,23ZM20,18.571C20,19.72,18.152,21,15.5,21S11,19.72,11,18.571v-.925a8.329,8.329,0,0,0,4.5,1.211A8.329,8.329,0,0,0,20,17.646ZM15.5,12c2.652,0,4.5,1.28,4.5,2.429s-1.848,2.428-4.5,2.428S11,15.577,11,14.429,12.848,12,15.5,12Zm-7-9C11.152,3,13,4.23,13,5.333S11.152,7.667,8.5,7.667,4,6.437,4,5.333,5.848,3,8.5,3ZM4,8.482A8.466,8.466,0,0,0,8.5,9.667,8.466,8.466,0,0,0,13,8.482V10.33a6.47,6.47,0,0,0-2.9,1.607,7.694,7.694,0,0,1-1.6.174c-2.652,0-4.5-1.23-4.5-2.333Zm0,4.445a8.475,8.475,0,0,0,4.5,1.184c.178,0,.35-.022.525-.031A3.1,3.1,0,0,0,9,14.429v2.085c-.168.01-.33.042-.5.042-2.652,0-4.5-1.23-4.5-2.334Zm0,4.444a8.466,8.466,0,0,0,4.5,1.185c.168,0,.333-.013.5-.021v.036a3.466,3.466,0,0,0,.919,2.293A7.839,7.839,0,0,1,8.5,21C5.848,21,4,19.77,4,18.667Z"
              ></path>
            </svg>
          </div>
        )}

        <Tooltip
          placement="right"
          size="sm"
          delay={100}
          closeDelay={100}
          content={
            !user?.isPro
              ? language.language === "Vietnamese"
                ? `Sẽ được đặt lại vào ${timeResetCoin()} giờ nữa`
                : `Resets in ${timeResetCoin()} hrs`
              : language.language === "Vietnamese"
              ? `Không giới hạn tokens`
              : `Unlimited Tokens`
          }
        >
          <LucideShieldQuestion
            size={isMobile ? "20" : "17"}
            className=" text-slate-400/70"
          />
        </Tooltip>
        {user?.isPro ? (
          <Chip className="bg-gr sm:text-[10px] text-sm font-semibold">
            Premium
          </Chip>
        ) : (
          <Button
            onPress={() => router.push("/payment")}
            className=" hover:scale-105 bg-gr rounded-full sm:text-[10px] text-sm font-semibold sm:max-h-6 px-5"
            size="sm"
          >
            {language.language === "Vietnamese" ? "Nâng cấp" : "Upgrade"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CoinControl;

import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useLanguage } from "@/hooks/use-language";
import { openaiApi } from "@/lib/utils";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import { motion } from "framer-motion";
import { Dices, Wand2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const Dive = () => {
  const generation = useGenerateImage();
  const { language } = useLanguage();
  const handleImprovePrompt = async () => {
    generation.setIsLoading(true);
    try {
      if (generation.prompt === "") {
        toast.error(
          language === "Vietnamese" ? "Nhập gì đó..." : "Type somethings..."
        );
      } else {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/Ar4ikov/gpt2-650k-stable-diffusion-prompt-generator",
          {
            headers: {
              Authorization: `Bearer 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`,
            },
            method: "POST",
            body: JSON.stringify({
              inputs: generation.prompt,
            }),
          }
        );
        const result = await response.json();
        generation.setPrompt(result[0].generated_text);

        toast.success(
          language === "Vietnamese"
            ? "Cải thiện lời nhắc thành công."
            : "Improved reminders successfully."
        );
      }
    } catch (error) {
      toast.error(
        language === "Vietnamese"
          ? "Cải thiện lời nhắc không thành công."
          : "Improved reminders failed."
      );
    } finally {
      generation.setIsLoading(false);
    }
  };
  const handleRandomPrompt = async () => {
    generation.setIsLoading(true);
    const prompt = [
      {
        role: "user",
        content: "Generate a random prompt for image generation",
      },
    ];
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: prompt,
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApi}`,
          },
        }
      );

      const generatedPrompt = response.data.choices[0].message.content;
      generation.setPrompt(
        generatedPrompt.substring(1, generatedPrompt.length - 1)
      );
      toast.success(
        language === "Vietnamese"
          ? "Tạo lời nhắc ngẫu nhiên thành công."
          : "Generate random prompt successfully."
      );
    } catch (error) {
      toast.error(
        language === "Vietnamese"
          ? "Tạo lời nhắc ngẫu nhiên không thành công."
          : "Generate random prompt failed."
      );
    } finally {
      generation.setIsLoading(false);
    }
  };
  return (
    <Dropdown aria-label="adu" placement="bottom-start">
      <DropdownTrigger>
        <motion.div
          whileInView={
            generation.isLoading
              ? {
                  scale: [1, 1.1, 1.1, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  transition: {
                    duration: 2,
                    ease: "easeInOut",
                  },
                }
              : {}
          }
          whileHover={{
            scale: [1, 1.1, 1.1, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            transition: {
              duration: 2,
              ease: "easeInOut",
            },
          }}
          className=" bg-slate-200 box-border dark:bg-slate-900/70 h-12 sm:w-12 w-14 p-2 cursor-pointer rounded-md flex items-center justify-center"
        >
          <svg viewBox="0 0 38 32" focusable="false" aria-hidden="true">
            <path
              d="M14.7942 13.4219H2.56634C1.15108 13.4219 0 14.6032 0 16.0558V28.6046C0 30.0571 1.15108 31.2385 2.56634 31.2385H14.7942C16.2095 31.2385 17.3606 30.0571 17.3606 28.6046V16.0565C17.3606 14.604 16.2095 13.4219 14.7942 13.4219ZM15.8509 28.6054C15.8509 29.2035 15.3769 29.69 14.7942 29.69H2.56634C1.98363 29.69 1.50961 29.2035 1.50961 28.6054V16.0565C1.50961 15.4585 1.98363 14.972 2.56634 14.972H14.7942C15.3769 14.972 15.8509 15.4585 15.8509 16.0565V28.6054Z"
              fill="url(#dice-gradient-icon-1-:r424:)"
            ></path>
            <path
              d="M4.5289 19.6193C5.36264 19.6193 6.03851 18.9256 6.03851 18.0699C6.03851 17.2142 5.36264 16.5206 4.5289 16.5206C3.69516 16.5206 3.01929 17.2142 3.01929 18.0699C3.01929 18.9256 3.69516 19.6193 4.5289 19.6193Z"
              fill="url(#dice-gradient-icon-2-:r424:)"
            ></path>
            <path
              d="M12.8316 19.6193C13.6654 19.6193 14.3412 18.9256 14.3412 18.0699C14.3412 17.2142 13.6654 16.5206 12.8316 16.5206C11.9979 16.5206 11.322 17.2142 11.322 18.0699C11.322 18.9256 11.9979 19.6193 12.8316 19.6193Z"
              fill="url(#dice-gradient-icon-3-:r424:)"
            ></path>
            <path
              d="M4.5289 28.1406C5.36264 28.1406 6.03851 27.4469 6.03851 26.5913C6.03851 25.7356 5.36264 25.0419 4.5289 25.0419C3.69516 25.0419 3.01929 25.7356 3.01929 26.5913C3.01929 27.4469 3.69516 28.1406 4.5289 28.1406Z"
              fill="url(#dice-gradient-icon-4-:r424:)"
            ></path>
            <path
              d="M12.8316 28.1406C13.6654 28.1406 14.3412 27.4469 14.3412 26.5913C14.3412 25.7356 13.6654 25.0419 12.8316 25.0419C11.9979 25.0419 11.322 25.7356 11.322 26.5913C11.322 27.4469 11.9979 28.1406 12.8316 28.1406Z"
              fill="url(#dice-gradient-icon-5-:r424:)"
            ></path>
            <path
              d="M37.8573 14.3802L33.8364 2.52847C33.37 1.15731 31.9086 0.429892 30.5689 0.907089L19.0203 5.03376C17.6836 5.5125 16.9756 7.01769 17.4413 8.3873L21.4621 20.2398C21.6878 20.9037 22.1513 21.4382 22.7679 21.7442C23.1219 21.92 23.5016 22.0083 23.8835 22.0083C24.1681 22.0083 24.4534 21.9595 24.7297 21.8604L36.2775 17.7337C37.6135 17.2565 38.3222 15.7521 37.8573 14.3802ZM35.7816 16.2703L24.233 20.397C23.9658 20.4923 23.6797 20.4768 23.4261 20.349C23.1718 20.2227 22.9808 20.0035 22.888 19.7293L18.8671 7.8768C18.6754 7.31206 18.9675 6.6931 19.517 6.49634L31.0655 2.36967C31.1803 2.32938 31.2965 2.31002 31.4112 2.31002C31.849 2.31002 32.2589 2.59122 32.4106 3.03821L36.4314 14.8891C36.6239 15.4538 36.3318 16.0736 35.7816 16.2703Z"
              fill="url(#dice-gradient-icon-6-:r424:)"
            ></path>
            <path
              d="M22.3634 10.3108C23.1971 10.3108 23.873 9.61718 23.873 8.7615C23.873 7.90582 23.1971 7.21216 22.3634 7.21216C21.5296 7.21216 20.8538 7.90582 20.8538 8.7615C20.8538 9.61718 21.5296 10.3108 22.3634 10.3108Z"
              fill="url(#dice-gradient-icon-7-:r424:)"
            ></path>
            <path
              d="M30.2044 7.50884C31.0382 7.50884 31.7141 6.81517 31.7141 5.9595C31.7141 5.10382 31.0382 4.41016 30.2044 4.41016C29.3707 4.41016 28.6948 5.10382 28.6948 5.9595C28.6948 6.81517 29.3707 7.50884 30.2044 7.50884Z"
              fill="url(#dice-gradient-icon-8-:r424:)"
            ></path>
            <path
              d="M25.0943 18.3581C25.9281 18.3581 26.6039 17.6644 26.6039 16.8087C26.6039 15.9531 25.9281 15.2594 25.0943 15.2594C24.2606 15.2594 23.5847 15.9531 23.5847 16.8087C23.5847 17.6644 24.2606 18.3581 25.0943 18.3581Z"
              fill="url(#dice-gradient-icon-9-:r424:)"
            ></path>
            <path
              d="M8.68027 24.1387C9.514 24.1387 10.1899 23.445 10.1899 22.5893C10.1899 21.7336 9.514 21.04 8.68027 21.04C7.84653 21.04 7.17065 21.7336 7.17065 22.5893C7.17065 23.445 7.84653 24.1387 8.68027 24.1387Z"
              fill="url(#dice-gradient-icon-10-:r424:)"
            ></path>
            <path
              d="M32.9352 15.5561C33.7689 15.5561 34.4448 14.8624 34.4448 14.0067C34.4448 13.1511 33.7689 12.4574 32.9352 12.4574C32.1014 12.4574 31.4255 13.1511 31.4255 14.0067C31.4255 14.8624 32.1014 15.5561 32.9352 15.5561Z"
              fill="url(#dice-gradient-icon-11-:r424:)"
            ></path>
            <defs>
              <linearGradient
                id="dice-gradient-icon-1-:r424:"
                x1="-7.46504"
                y1="13.4219"
                x2="19.693"
                y2="9.24026"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-2-:r424:"
                x1="1.72102"
                y1="16.5206"
                x2="6.44416"
                y2="15.7934"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-3-:r424:"
                x1="10.0238"
                y1="16.5206"
                x2="14.7469"
                y2="15.7934"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-4-:r424:"
                x1="1.72102"
                y1="25.0419"
                x2="6.44416"
                y2="24.3147"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-5-:r424:"
                x1="10.0238"
                y1="25.0419"
                x2="14.7469"
                y2="24.3147"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-6-:r424:"
                x1="8.39628"
                y1="0.760616"
                x2="40.7815"
                y2="-4.22538"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-7-:r424:"
                x1="19.5555"
                y1="7.21216"
                x2="24.2786"
                y2="6.48495"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-8-:r424:"
                x1="27.3966"
                y1="4.41016"
                x2="32.1197"
                y2="3.68295"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-9-:r424:"
                x1="22.2864"
                y1="15.2594"
                x2="27.0096"
                y2="14.5322"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-10-:r424:"
                x1="5.87239"
                y1="21.04"
                x2="10.5955"
                y2="20.3128"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
              <linearGradient
                id="dice-gradient-icon-11-:r424:"
                x1="30.1273"
                y1="12.4574"
                x2="34.8504"
                y2="11.7302"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA5560"></stop>
                <stop offset="0.5" stop-color="#B14BF4"></stop>
                <stop offset="1" stop-color="#4D91FF"></stop>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </DropdownTrigger>
      <DropdownMenu aria-label="og" className=" ">
        <DropdownItem
          onClick={handleRandomPrompt}
          key="new"
          startContent={<Dices className="w-4 h-4" />}
        >
          {language === "Vietnamese"
            ? "Lời nhắc ngẫu nhiên"
            : "New Random Prompt"}
        </DropdownItem>
        <DropdownItem
          onClick={handleImprovePrompt}
          key="improve"
          startContent={<Wand2Icon className="w-4 h-4" />}
        >
          {language === "Vietnamese" ? "Cải thiện lời nhắc" : "Improve Prompt"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Dive;

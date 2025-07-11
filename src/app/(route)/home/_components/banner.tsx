"use client";

import Button from "@/components/button";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import WordCloudtWrapper from "./word-cloud-wrapper";
import { useUserStore } from "@/stores/use-user-store";
import { toast } from "sonner";

export default function Banner() {
  const route = useRouter();
  const isLogin = useUserStore((s) => s.isLogin);

  const handleClick = () => {
    if (isLogin) {
      route.push(ROUTES.SNACK_NEWS);
    } else {
      toast.warning("로그인 후 이용가능합니다");
    }
  };

  return (
    <div className="flex h-100">
      <div className="bg-primary-100 w-63">
        <div className="mt-22 ml-7">
          <p className="subtitle font-semibold">
            관심있는 분야에 <br /> 핫한 뉴스를 모아보세요
          </p>
          <Button
            onClick={handleClick}
            className="caption1 font-regular mt-4 px-5"
          >
            큨! 보러가기
          </Button>
        </div>
      </div>
      <div className="bg-primary-50 flex w-162 flex-grow items-center">
        <WordCloudtWrapper />
      </div>
    </div>
  );
}

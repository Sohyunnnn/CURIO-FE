import Image from "next/image";
import React, { useState } from "react";
import Button from "../button";
import { IMAGES_PATH } from "@/constants/images";
import Subscribe from "./subscribe";
import ProfileCard from "./profile-card";
import TrandRanking from "./trand-ranking";
import TrandingNews from "./tranding-news";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { usePathname } from "next/navigation";
import FontSize from "../font-size";
import Summary from "../summary";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(true);

  const isDetailPage = pathname.startsWith("/detail");

  const handleClick = () => {
    router.push(ROUTES.LOGIN);
  };

  return (
    <aside className="min-h-screen w-85 border-l-1 border-gray-100 pl-10">
      {isDetailPage ? (
        <>
          <FontSize />
          <Summary />
          <TrandingNews />
        </>
      ) : isLogin ? (
        <div className="flex flex-col gap-6">
          <ProfileCard />
          <TrandRanking />
          <TrandingNews />
          <Subscribe />
        </div>
      ) : (
        <div className="bg-primary-50 relative mt-6 h-49.5 w-75 overflow-hidden rounded-lg pt-7.5 pl-7">
          <p className="subtitle font-semibold">
            CURIO에서
            <br />
            나만의 뉴스 커스텀 경험하기
          </p>
          <Button className="mt-6 px-8" onClick={handleClick}>
            로그인
          </Button>
          <Image
            src={IMAGES_PATH.LOGO}
            alt="logo"
            width={257}
            height={257}
            className="absolute -top-3 left-30 opacity-3"
          />
        </div>
      )}
    </aside>
  );
}

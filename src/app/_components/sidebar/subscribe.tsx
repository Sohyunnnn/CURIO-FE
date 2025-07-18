"use client";

import { IMAGES_PATH } from "@/constants/images";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../modal";
import Input from "../input";
import Button from "../button";
import { ShortcutIcon } from "assets";
import { usePatchSubscribe } from "@/hooks/use-user";
import { useUserStore } from "@/stores/use-user-store";
import { toast } from "sonner";

export default function Subscribe() {
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const email = useUserStore((s) => s.profile?.email || "");
  const [inputEmail, setInputEmail] = useState(email);

  const { mutate } = usePatchSubscribe();

  const handleClick = () => {
    SetIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      setInputEmail(email);
    }
  }, [isModalOpen, email]);

  const handleClose = () => {
    SetIsModalOpen(false);
  };

  const handleSubscribe = () => {
    mutate(
      { "newsletter-email": email },
      {
        onSuccess: () => {
          console.log("subscribe success");
          toast.success("신청이 완료되었습니다.");
        },
      },
    );
    SetIsModalOpen(false);
  };
  return (
    <>
      <div
        className="group relative mt-4.25 w-75 overflow-hidden rounded-2xl border border-gray-100 py-6 pl-6"
        onClick={handleClick}
      >
        <p className="body1 font-regular">
          실시간 트렌드를 메일로 받아봐요!
          <br />
          <span className="text-primary-600 flex items-center font-semibold group-hover:underline">
            지금 바로 메일로 받아보기
            <ShortcutIcon className="ml-0.5" />
          </span>
        </p>
        <Image
          src={IMAGES_PATH.LOGO}
          alt="logo"
          width={145}
          height={145}
          className="absolute -top-4.75 -right-2.5 opacity-3"
        />
      </div>
      {isModalOpen && (
        <Modal title="메일 전송하기" onClick={handleClose}>
          <div className="mt-7.5 flex flex-col gap-5">
            <p className="body1 font-semibold">
              닉네임님이 설정하신 <br /> 관심 카테고리별 인기 뉴스를 이메일로
              전해드려요.
              <br />
              바쁜 일상 속, 한눈에 정리된 뉴스를 받아보세요.
            </p>
            <label className="caption1 flex flex-col font-medium">
              이메일
              <Input
                placeholder="sample@naver.com"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </label>
          </div>
          <Button onClick={handleSubscribe} className="mt-7">
            신청하기
          </Button>
        </Modal>
      )}
    </>
  );
}

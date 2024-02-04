"use client";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();

  if (status === "loading")
    return (
      <header className="self-end flex gap-2">
        <ButtonSkeleton className="text-transparent">signup</ButtonSkeleton>
        <ButtonSkeleton className="text-transparent">login</ButtonSkeleton>
      </header>
    );

  if (data?.user)
    return (
      <header className="self-end flex gap-2">
        <span>닉네임: {data?.user.username}</span>
      </header>
    );

  return (
    <header className="self-end flex gap-2">
      <Link href="auth/signup">
        <Button>signup</Button>
      </Link>
      <Link href="auth/signin">
        <Button>login</Button>
      </Link>
    </header>
  );
};

export default Header;

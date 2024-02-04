"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data } = useSession();

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

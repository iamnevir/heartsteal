"use client";
import { useAuth } from "@clerk/nextjs";
import { Button, Link } from "@nextui-org/react";

const HomePageButton = () => {
  const auth = useAuth();
  return (
    <Button
      as={Link}
      href="/ai"
      className="bg-gr hover:scale-105 duration-500 transition-all px-10 py-7 text-lg font-semibold"
      variant="shadow"
    >
      {!auth ? "Create an account" : "Generation Now"}
    </Button>
  );
};

export default HomePageButton;

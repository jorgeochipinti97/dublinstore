import { Input } from "@/components/ui/input";
import React from "react";

const Page = () => {
  return (
    <div className="bg-black/90 h-screen flex items-center justify-center">
      <div className="flex justify-center w-full">
        <div className="w-6/12">
          <Input placeholder="Frase misteriosa" />
        </div>
      </div>
      <div className=" text-gray-800 opacity-50 absolute bottom-0 select-none right-0  p-5">
        Este mensaje
      </div>
    </div>
  );
};

export default Page;

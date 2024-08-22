"use client";
import React, { useState } from "react";
import coverPic from "../../../../public/images/coverImage.png";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { SmilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import CoverPicker from "@/components/Picker/CoverPicker";
import EmojiPickerComponent from "@/components/Picker/EmojiPicker";

type CoverImageType = string | StaticImageData;

function Page() {
  const [coverImage, setCoverImage] = useState<CoverImageType>(coverPic);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState<string | undefined>(undefined);

  const handleSetNewCover = (val: string | undefined) => {
    if (val) {
      setCoverImage(val);
    }
  };

  return (
    <div className="p-10 md:px-36 lg:px-52 xl:px-80 py-20">
      <div className="shadow-xl rounded-lg">
        <CoverPicker setNewCover={handleSetNewCover}>
          <div className="relative group cursor-pointer">
            <h2
              className="hidden absolute p-4 w-full h-full items-center justify-center 
            text-xl font-bold group-hover:flex"
            >
              Change Cover
            </h2>
            <div className="group-hover:opacity-80">
              <Image
                src={coverImage}
                alt="This is a cover-image."
                width={400}
                height={400}
                className="w-full h-[150px] rounded-t-lg object-cover"
              />
            </div>
          </div>
        </CoverPicker>

        <div className="p-12 ">
          <h2 className="font-medium text-xl">Create a new workspace.</h2>
          <h2 className="text-sm mt-3">
            This is a shared space where you can collaborate with your team. You
            can always rename it later.
          </h2>
          <div className="mt-8 flex gap-3 items-center">
            <EmojiPickerComponent setEmojiIcon={(val) => setEmoji(val)}>
              <Button variant="outline">{emoji ? emoji : <SmilePlus />}</Button>
            </EmojiPickerComponent>
            <Input
              placeholder="Workspace Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-7 flex justify-end gap-6">
            <Button disabled={!name.length}>Create</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

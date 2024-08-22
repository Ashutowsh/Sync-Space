"use client";
import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CoverOption from "../../../public/data/CoverOption";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface CoverPickerProps {
  children: ReactNode;
  setNewCover: (cover: string | undefined) => void;
}

const CoverPicker: React.FC<CoverPickerProps> = ({ children, setNewCover }) => {
  const [selectedCover, setSelectedCover] = useState<string | undefined>();

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Cover</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
              {CoverOption.map((cover, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCover(cover?.imageUrl)}
                  className={`${
                    selectedCover == cover?.imageUrl &&
                    "border-primary border-2"
                  } p-1 rounded-md`}
                >
                  <Image
                    src={cover?.imageUrl}
                    width={200}
                    height={140}
                    alt="It is a cover image."
                    className="h-[70px] w-full rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={() => setNewCover(selectedCover)}>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CoverPicker;

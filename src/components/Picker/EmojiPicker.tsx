"use client";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useState, useEffect, useRef, ReactNode } from "react";

interface EmojiPickerComponentProps {
  children: ReactNode;
  setEmojiIcon: (emoji: string) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({ children, setEmojiIcon }) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setOpenEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  return (
    <div ref={pickerRef}>
      <div onClick={() => setOpenEmojiPicker(true)}>{children}</div>
      {openEmojiPicker && (
        <div className="absolute z-10">
          <EmojiPicker
            onEmojiClick={(emojiData: EmojiClickData) => {
              setEmojiIcon(emojiData.emoji);
              setOpenEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;

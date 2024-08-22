"use client";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useState, ReactNode } from "react";

interface EmojiPickerComponentProps {
  children: ReactNode;
  setEmojiIcon: (emoji: string) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({ children, setEmojiIcon }) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  return (
    <div>
      <div onClick={() => setOpenEmojiPicker(true)}>{children}</div>
      {openEmojiPicker && (
        <div className="absolute z-10">
          <EmojiPicker
            emojiStyle="facebook"
            onEmojiClick={(emojiData: EmojiClickData) => {
              setEmojiIcon(emojiData.emoji);
              setOpenEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPickerComponent;

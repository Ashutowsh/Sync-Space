import React, { useState, useEffect } from 'react';
import CoverPicker from '../Picker/CoverPicker';
import EmojiPickerComponent from "@/components/Picker/EmojiPicker";
import Image from 'next/image';
import coverPic from "../../../public/images/coverImage.png";
import { useDocumentStore } from '@/store/documentsStore';
import { SmilePlus } from 'lucide-react';
import { Input } from '../ui/input';
import { useDebounceCallback } from 'usehooks-ts';

function DocumentInfo({ params }: { params: { id: string; docId: string } }) {
  const [coverImage, setCoverImage] = useState<any>(coverPic);
  const [emoji, setEmoji] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const { renameDocument, documentList, updateDocumentInDatabase } = useDocumentStore();
  const debouncedRename = useDebounceCallback((newTitle) => {
    if (newTitle) {
      renameDocument(params.docId, newTitle);
      updateDocumentInDatabase(params.docId, {title : newTitle} );
    }
  }, 100);

  const handleSetNewCover = async (val: string | undefined) => {
    if (val) {
      setCoverImage(val);
      await updateDocumentInDatabase(params.docId,{ coverImage: val });
    }
  };

  const handleEmojiChange = async (val: string | undefined) => {
    if (val) {
      setEmoji(val);
      await updateDocumentInDatabase(params.docId,{ emoji: val });
    }
  };

  useEffect(() => {
    const doc = documentList.find(e => e.$id === params.docId);
    if (doc) {
      setTitle(doc.title);
      setCoverImage(doc.coverImage || coverPic);
      setEmoji(doc.emoji);
    }
  }, [params.docId, documentList]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedRename(newTitle);
  };

  return (
    <div>
      <CoverPicker setNewCover={handleSetNewCover}>
        <div className="relative group cursor-pointer">
          <h2
            className="hidden absolute p-7 w-full h-full items-center justify-center text-xl font-bold group-hover:flex"
          >
            Change Cover
          </h2>
          <div className="group-hover:opacity-80">
            <Image
              src={coverImage}
              alt="This is a cover-image."
              width={400}
              height={600}
              className="w-full h-[150px] rounded-t-lg object-cover"
            />
          </div>
        </div>
      </CoverPicker>

      <EmojiPickerComponent setEmojiIcon={handleEmojiChange}>
        <div className='absolute ml-10 rounded-md p-4 mt-[-40px] bg-[#ffffffb0] cursor-pointer'>
          {emoji ? <span className='text-3xl'>{emoji}</span> : <SmilePlus className='h-10 w-10 text-gray-500' />}
        </div>
      </EmojiPickerComponent>

      <div className='mt-10 px-39 py-10 ml-20'>
        <Input
          type='text'
          placeholder='Untitled Document'
          defaultValue={title}
          className='font-bold text-4xl outline-none border-none'
          onChange={handleTitleChange}
        />
      </div>
    </div>
  );
}

export default DocumentInfo;
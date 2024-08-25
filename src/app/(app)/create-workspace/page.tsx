"use client";
import React, { useState } from "react";
import coverPic from "../../../../public/images/coverImage.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SmilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import CoverPicker from "@/components/Picker/CoverPicker";
import EmojiPickerComponent from "@/components/Picker/EmojiPicker";
import { Checkbox } from "@/components/ui/checkbox";
import { ID } from "node-appwrite";
import { databases } from "@/models/server/config";
import { workspaceCollection, db, documentCollection, documentOutputCollection } from "@/models/name";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Header/NavBar";


function Page() {
  const [coverImage, setCoverImage] = useState<any>(coverPic);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState<string | undefined>(undefined);
  const [createDocument, setCreateDocument] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const { user } = useUser();
  const { orgId } = useAuth();

  const handleSetNewCover = (val: string | undefined) => {
    if (val) {
      setCoverImage(val);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!name) return;
    setIsLoading(true);
    try {

      const response = await databases.createDocument(db, workspaceCollection, ID.unique(), {
        title: name,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        organizationId: orgId ? String(orgId) : user?.primaryEmailAddress?.emailAddress,
        emoji: emoji,
        coverImage: coverImage?.src
      });
      console.log("Workspace created:", response);

      if(createDocument){
        console.log(documentCollection)
        const responseDocument = await databases.createDocument(db, documentCollection, ID.unique(), {
          createdBy : user?.primaryEmailAddress?.emailAddress,
          workSpaceId : response.$id,
          title : "Untitled Document",
          emoji : emoji
        })

        console.log("Untitled Doc created.", responseDocument)

        const responseDocumentOutput = databases.createDocument(db, documentOutputCollection, responseDocument.$id, {
          documentId : responseDocument.$id,
          output : []
        })

        console.log("Untitled Doc Output created.", responseDocumentOutput)
      }

      router.replace(`/workspace/${response.$id}`);
      
    } catch (error) {
      console.error("Failed to create workspace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
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
                <Button variant="outline">
                  {emoji ? emoji : <SmilePlus />}
                </Button>
              </EmojiPickerComponent>
              <Input
                placeholder="Workspace Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Checkbox
                id="createDocument"
                checked={createDocument}
                onCheckedChange={(checked) => setCreateDocument(checked === true)}
              />
              <label htmlFor="createDocument" className="ml-2 text-sm">
                Want to create a new untitled document.
              </label>
            </div>

            <div className="mt-7 flex justify-end gap-6">
              <Button
                disabled={!name.length || isLoading}
                onClick={handleCreateWorkspace}
              >
                {isLoading ? (
                  <div className="inline-block w-4 h-4 border-2 border-t-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                ) : (
                  "Create"
                )}
              </Button>
              <Button variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
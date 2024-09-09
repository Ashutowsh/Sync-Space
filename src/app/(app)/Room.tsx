"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { databases } from "@/models/server/config";
import { db } from "@/models/name";  // Assuming usersCollection is part of your db
import { Query } from "node-appwrite";

interface RoomProps {
  children: ReactNode;
  params: {
    id: string;
    docId: string;
  };
}

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-t-8 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
      <div className="mt-4 text-xl font-semibold text-blue-500">Loading...</div>
      <p className="mt-2 text-lg text-gray-600">Please wait while we setup the room.</p>
      <p className="mt-2 text-lg text-gray-600">The loading will happen on every operation. I am working on this Sorry for the inconvinience. Application will improve day by day.</p>
    </div>
  );
};

export default Loader;


export function Room({ children, params }: RoomProps) {
  return (
    <LiveblocksProvider
      authEndpoint={`/api/liveblocks-auth?roomId=${params?.docId}`}
      resolveUsers={async ({ userIds }) => {
        try {
          const response = await databases.listDocuments(db, "66ccab89002a9d3dac41", [
            Query.equal("email", userIds),
          ]);
          return response?.documents;
        } catch (error) {
          console.error("Error in fetching users: ", error);
          return [];
        }
      }}
      resolveMentionSuggestions={async ({ text }) => {
        try {
          let users = await databases.listDocuments(db, "66ccab89002a9d3dac41", [
            Query.isNotNull("email"),
          ]);

          let usersList = users?.documents || [];
          console.log(usersList)
          if (text) {
            usersList = usersList.filter((user) =>
              user.name.toLowerCase().includes(text.toLowerCase())
            );
          }

          return usersList.map((user) => user.email);
        } catch (error) {
          console.error("Error in fetching mention suggestions: ", error);
          return [];
        }
      }}
    >
      <RoomProvider id={params?.docId}>
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

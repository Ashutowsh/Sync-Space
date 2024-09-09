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
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

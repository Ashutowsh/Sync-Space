"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import env from "@/env";
import { databases } from "@/models/server/config";
import { db, usersCollection } from "@/models/name";
import { Query } from "node-appwrite";

interface RoomProps {
  children : ReactNode,
  params: {
    id: string;
    docId: string;
  };
}

export function Room({ children, params }: RoomProps) {

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" 
      resolveUsers={async({userIds}) => {
        // console.log(userIds)
        let users
        try {
          users = await databases.listDocuments(db, "66ccab89002a9d3dac41", [
            Query.equal("email", userIds)
          ])
          
          // console.log(users)
        } catch (error) {
          console.log("Error in fetching users : ", error)
        }
        
        return users?.documents
      }}       resolveMentionSuggestions={async ({ text, roomId }) => {
        // Fetch all users from your back end
        let users
        try {
          users = await databases.listDocuments(db, "66ccab89002a9d3dac41", [
            Query.isNotNull("email")
          ])
          
          // console.log(users)
        } catch (error) {
          console.log("Error in fetching users : ", error)
        }
        let usersList = users?.documents;
        // console.log(usersList)
        // If there's a query, filter for the relevant users
        if (text) {
          // Filter any way you'd like, e.g. checking if the name matches
          usersList = usersList?.filter((user) => user.name.includes(text));
        }

        console.log("UsersList : ", usersList)
    
        // Return the filtered `userIds`
        return usersList?.map((user) => user.email)!;
      }}>
      <RoomProvider id={params?.docId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
"use client";

import Loader from "@/components/Loader";
import {
  LiveblocksProvider,
  //   RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
      {/* <RoomProvider id="my-room"> */}
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
      {/* </RoomProvider> */}
    </LiveblocksProvider>
  );
};

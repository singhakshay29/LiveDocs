import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type SearchParamProps = {
  params: {
    id: string;
  };
};

const Document = async ({ params: rawParams }: SearchParamProps) => {
  const params = await rawParams;
  const { id } = params;
  const clerkUser = await currentUser();
  if (
    !clerkUser ||
    !clerkUser.emailAddresses ||
    clerkUser.emailAddresses.length === 0
  ) {
    redirect("/sign-in");
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: email,
  });
  if (!room || !room.metadata) redirect("/");
  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });
  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));
  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;

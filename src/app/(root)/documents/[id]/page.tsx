import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type SearchParamProps = {
  params: {
    id: string;
  };
};

const Document = async ({ params }: SearchParamProps) => {
  const { id } = params;
  const clearkUser = await currentUser();
  if (
    !clearkUser ||
    !clearkUser.emailAddresses ||
    clearkUser.emailAddresses.length === 0
  ) {
    redirect("/sign-in");
  }

  const email = clearkUser.emailAddresses[0]?.emailAddress;
  if (!email) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: email,
  });

  if (!room || !room.metadata) redirect("/");

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={[]}
        currentUserType={"creator"}
      />
    </main>
  );
};

export default Document;

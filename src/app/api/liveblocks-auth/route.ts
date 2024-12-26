import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export async function POST() {
    // Get the current user from your database
    const clearkUser = await currentUser();
    if (!clearkUser) {
        redirect('/sign-in');
    }

    const { id, firstName, lastName, emailAddresses, imageUrl } = clearkUser;

    const user = {
        id,
        info: {
            id,
            name: `${firstName} ${lastName}`,
            email: emailAddresses[0].emailAddress,
            avatar: imageUrl,
            color: getUserColor(id)
        }
    }

    // Identify the user and return the result
    const { status, body } = await liveblocks.identifyUser(
        {
            userId: user.info.email,
            groupIds: [],
        },
        { userInfo: user.info },
    );

    return new Response(body, { status });
}
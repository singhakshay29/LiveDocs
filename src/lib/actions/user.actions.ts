'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
    try {
        const { data } = await clerkClient.users.getUserList({
            emailAddress: userIds
        });
        const users = data.map((user: { id: string; firstName: string; lastName: string; emailAddress: { emailAddress: string; }[]; imageUrl: string; }) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddress[0].emailAddress,
            avatar: user.imageUrl
        }));
        const sortedUsers = userIds.map((email) => users.find((user) => user.email === email));
        return parseStringify(sortedUsers);
    } catch (error) {
        console.error(`Error fetching users: ${error}`);
    }
};

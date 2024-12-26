import { useOthers } from "@liveblocks/react";
import Image from "next/image";
import React from "react";

interface Collaborator {
  id: string;
  avatar: string;
  name: string;
  color: string;
}

const ActiveCollaborative: React.FC = () => {
  const others = useOthers();

  const collaborators: Collaborator[] = others.map((item) => item.info);

  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          <Image
            src={avatar}
            alt={name}
            width={100}
            height={100}
            className="inline-block size-8 rounded-full ring-2 ring-dark-100"
            style={{ border: `3px solid ${color}` }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborative;

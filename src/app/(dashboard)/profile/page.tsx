"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const session = useSession();
  useEffect(() => {}, []);
  return (
    <div>
      <h1>{JSON.stringify(session.data?.user, null, " ")}</h1>
    </div>
  );
}

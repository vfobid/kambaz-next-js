"use client";
import * as client from "./client";
import { useEffect } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await client.profile();
        dispatch(setCurrentUser(currentUser));
      } catch (err: unknown) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);
  return <>{children}</>;
}

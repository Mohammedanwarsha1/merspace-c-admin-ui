import { useQuery } from "@tanstack/react-query";
import { self } from "../http/api";
import { useEffect } from "react";
import { useAuthStore } from "../store";
import { Outlet } from "react-router-dom";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

export const Root = () => {
  const { setUser } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
  });
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);
  if (isLoading) {
    return <div>Loading ....</div>;
  }
  return <Outlet />;
};

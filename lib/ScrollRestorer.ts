import { useRouter } from "next/router";
import { FC } from "react";
import { useScrollRestoration } from "./useScrollRestoration";

export const ScrollRestorer: FC = () => {
  const router = useRouter();

  useScrollRestoration(router);

  return null;
};

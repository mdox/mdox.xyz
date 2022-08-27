import type { AppProps } from "next/app";
import { useEffect } from "react";
import { finishScrollRestoration } from "~/lib/useScrollRestoration";
import { setIsClient, setIsNotClient } from "~/store/store-is-client";
import Layout from "../components/Layout/Layout";

import "../styles/globals.scss";

export default function App({ Component, pageProps, router }: AppProps) {
  finishScrollRestoration();

  useEffect(() => {
    setIsClient();
    return () => {
      setIsNotClient();
    };
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

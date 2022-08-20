import type { AppProps } from "next/app";
import { finishScrollRestoration } from "~/lib/useScrollRestoration";
import Layout from "../components/Layout/Layout";

import "../styles/globals.scss";

export default function App({ Component, pageProps, router }: AppProps) {
  finishScrollRestoration();

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

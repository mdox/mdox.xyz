import { readFile } from "fs/promises";
import { GetStaticProps } from "next";
import { WithRouterProps } from "next/dist/client/with-router";
import Image from "next/image";
import { withRouter } from "next/router";
import { useState } from "react";
import Content from "~/components/Content";
import ImageViewer from "~/components/ImageViewer";
import Modal from "~/components/Modal";
import Show from "~/components/Show";
import genRSS from "~/lib/genRSS";
import BasedHead from "../components/BasedHead";

export type HomePageProps = {
  content: string;
};

export default withRouter(HomePage);

function HomePage(props: HomePageProps & WithRouterProps) {
  // States
  const [stateIsShowImageViewer, setStateIsShowImageViewer] = useState(false);

  // Renders
  return (
    <>
      <BasedHead
        {...{
          url: props.router.asPath,
          type: "website",
          title: `MDOX`,
          description: `MDOX: Portfolio, personal music project, philosophical pictures, information technology.`,
          image: `/assets/image/god-speech-512.png`,
          imageWidth: 512,
          imageHeight: 512,
          imageAlt: `An experience in a picture, in what form "God" appeared to me for a speech for myself.`,
        }}
      />

      <div className="flex md:float-right">
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer"
            onClick={() => setStateIsShowImageViewer(true)}
          >
            <Image
              src="/assets/image/portrait.png"
              width={192}
              height={192}
              quality={100}
              alt="Marci"
              className="rounded"
            ></Image>
          </div>
        </div>
      </div>
      <Content>{props.content}</Content>

      <Show when={stateIsShowImageViewer}>
        <Modal
          allowEscapeClose
          onEscapeClose={() => setStateIsShowImageViewer(false)}
        >
          <ImageViewer
            imageUrls={["/assets/image/portrait.png"]}
            onClose={() => setStateIsShowImageViewer(false)}
          ></ImageViewer>
        </Modal>
      </Show>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const content = await readFile("content/home/home.md", "utf-8");

  await genRSS();

  return {
    props: {
      content,
    },
  };
};

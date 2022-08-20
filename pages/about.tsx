import BasedHead from "components/BasedHead";
import Content from "components/Content";
import { readFile } from "fs/promises";
import { GetStaticProps } from "next";
import withRouter, { WithRouterProps } from "next/dist/client/with-router";

export type AboutPageProps = {
  content: string;
};

export default withRouter(AboutPage);

function AboutPage(props: AboutPageProps & WithRouterProps) {
  return (
    <>
      <BasedHead
        {...{
          url: props.router.asPath,
          type: "website",
          title: `MDOX About`,
          description: `Sources about: resume, work.`,
          image: `/assets/image/god-speech-512.png`,
          imageWidth: 512,
          imageHeight: 512,
          imageAlt: `An experience in a picture, in what form "God" appeared to me for a speech for myself.`,
        }}
      />

      <Content>{props.content}</Content>
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const content = await readFile("content/about/about.md", "utf-8");

  return {
    props: {
      content,
    },
  };
};

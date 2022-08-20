import { readFile } from "fs/promises";
import { GetStaticProps } from "next";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import BasedHead from "~/components/BasedHead";
import Content from "~/components/Content";

export type ContentPageProps = {
  content: string;
};

export default withRouter(ContactPage);

function ContactPage(props: ContentPageProps & WithRouterProps) {
  return (
    <>
      <BasedHead
        {...{
          url: props.router.asPath,
          type: "website",
          title: `MDOX Contact`,
          description: `Contact informations.`,
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

export const getStaticProps: GetStaticProps<ContentPageProps> = async () => {
  const content = await readFile("content/contact/contact.md", "utf-8");

  return {
    props: {
      content,
    },
  };
};

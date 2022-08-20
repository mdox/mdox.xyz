import Content from "components/Content";
import { readFile } from "fs/promises";
import { GetStaticProps } from "next";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import BasedHead from "~/components/BasedHead";

export type SupportPageProps = {
  content: string;
};

export default withRouter(SupportPage);

function SupportPage(props: SupportPageProps & WithRouterProps) {
  return (
    <>
      <BasedHead
        {...{
          url: props.router.asPath,
          type: "website",
          title: `MDOX Support`,
          description: `Here you can support me by donations.`,
          image: `/assets/image/portrait.png`,
          imageWidth: 512,
          imageHeight: 512,
          imageAlt: `Portrait about me, Márton Dávid Orosz.`,
        }}
      />

      <Content>{props.content}</Content>
    </>
  );
}

export const getStaticProps: GetStaticProps<SupportPageProps> = async () => {
  const content = await readFile("content/support/support.md", "utf-8");

  return {
    props: {
      content,
    },
  };
};

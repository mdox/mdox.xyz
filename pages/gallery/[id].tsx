import { readFile } from "fs/promises";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { WithRouterProps } from "next/dist/client/with-router";
import Link from "next/link";
import { withRouter } from "next/router";
import Button from "~/components/Button";
import BasedHead from "../../components/BasedHead";
import ClientWrap from "../../components/ClientWrap";
import GalleryCard from "../../components/GalleryCard";
import { GalleryPost } from "../../lib/post-types";
import { ScrollRestorer } from "../../lib/ScrollRestorer";

export type GalleryPageProps = {
  item: GalleryPost;
};

export default withRouter(GalleryPage);

function GalleryPage(props: GalleryPageProps & WithRouterProps) {
  // Renders
  return (
    <>
      <BasedHead
        key={props.item.id}
        {...{
          url: props.router.asPath,
          type: "website",
          title: `MDOX ${props.item.title}`,
          description: `${props.item.description}`,
          image: `${props.item.images[0].imagePath}`,
          imageWidth: props.item.images[0].imageWidth,
          imageHeight: props.item.images[0].imageHeight,
          imageAlt: `${props.item.title}`,
        }}
      />

      <ClientWrap>
        <div className="flex flex-col gap-2">
          <GalleryCard key={props.item.id} {...props.item}></GalleryCard>
          <Link href="/gallery">
            <a className="self-start">
              <Button>Back to Gallery Page</Button>
            </a>
          </Link>
        </div>

        <ScrollRestorer />
      </ClientWrap>
    </>
  );
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const items: GalleryPost[] = JSON.parse(
    await readFile("database/gallery-posts.json", "utf-8")
  );

  return {
    paths: items.map((item) => ({ params: { id: item.id } })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<GalleryPageProps>> {
  const id = context.params?.id as string;
  const items: GalleryPost[] = JSON.parse(
    await readFile("database/gallery-posts.json", "utf-8")
  );
  const item = items.find((item) => item.id === id)!;

  return {
    props: {
      item,
    },
  };
}

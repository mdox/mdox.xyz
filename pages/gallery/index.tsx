import { readFile } from "fs/promises";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { useMemo } from "react";
import { finishScrollRestoration } from "~/lib/useScrollRestoration";
import BasedHead from "../../components/BasedHead";
import CategoryTabs from "../../components/CategoryTabs";
import ClientWrap from "../../components/ClientWrap";
import GalleryCard from "../../components/GalleryCard";
import { GalleryPost } from "../../lib/post-types";
import { ScrollRestorer } from "../../lib/ScrollRestorer";
import { categorize, insertALL } from "../../lib/utils";
import {
  setGalleryCategory,
  useStoreGalleryCategory,
} from "../../store/store-gallery-category";

export type GalleryPageProps = {
  items: GalleryPost[];
};

export default withRouter(GalleryPage);

function GalleryPage(props: GalleryPageProps & WithRouterProps) {
  // Stores
  const storeGalleryCategory = useStoreGalleryCategory();

  // Memos
  const { map, order } = useMemo(() => {
    const { map, order } = categorize(props.items, ["Digital", "Real"]);
    insertALL(props.items, map, order);
    return { map, order };
  }, [props.items]);

  // Events
  function onSelectCategory(category: string) {
    setGalleryCategory(category);
    finishScrollRestoration();
  }

  // Renders
  return (
    <>
      <BasedHead
        {...{
          url: props.router.asPath,
          type: "website",
          title: `MDOX Gallery`,
          description: `MDOX Gallery: digital art, visual art.`,
          image: `/assets/image/god-speech-512.png`,
          imageWidth: 512,
          imageHeight: 512,
          imageAlt: `An experience in a picture, in what form "God" appeared to me for a speech for myself.`,
        }}
      />

      <ClientWrap>
        <div className="flex flex-col gap-2" suppressHydrationWarning={true}>
          <CategoryTabs
            categories={order}
            selection={storeGalleryCategory.category}
            onSelect={onSelectCategory}
          ></CategoryTabs>
          <div className="flex flex-col gap-2">
            {map[storeGalleryCategory.category].map((item) => (
              <GalleryCard key={item.id} {...item}></GalleryCard>
            ))}
          </div>
        </div>

        <ScrollRestorer />
      </ClientWrap>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<GalleryPageProps>> {
  const items: GalleryPost[] = JSON.parse(
    await readFile("database/gallery-posts.json", "utf-8")
  );

  return {
    props: {
      items,
    },
  };
}

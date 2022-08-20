import { readFile } from "fs/promises";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { useEffect, useMemo } from "react";
import BasedHead from "../../components/BasedHead";
import CategoryTabs from "../../components/CategoryTabs";
import ClientWrap from "../../components/ClientWrap";
import MusicCard from "../../components/MusicCard/MusicCard";
import { MusicPost } from "../../lib/post-types";
import { ScrollRestorer } from "../../lib/ScrollRestorer";
import { categorize, insertALL } from "../../lib/utils";
import { setMusicList } from "../../store/store-music";
import {
  setMusicCategory,
  useStoreMusicCategory,
} from "../../store/store-music-category";

export type MusicPageProps = {
  items: MusicPost[];
};

export default withRouter(MusicPage);

function MusicPage(props: MusicPageProps & WithRouterProps) {
  // Stores
  const storeMusicCategory = useStoreMusicCategory();

  // Memos
  const { map, order } = useMemo(() => {
    const { map, order } = categorize(props.items, ["Main"]);
    insertALL(props.items, map, order);
    return { map, order };
  }, [props.items]);

  // Effects
  useEffect(() => {
    setMusicList(map[storeMusicCategory.category]);
  }, [storeMusicCategory.category]);

  // Renders
  return (
    <>
      <BasedHead
        {...{
          url: props.router.asPath,
          type: "website",
          title: `MDOX Music`,
          description: `MDOX Music: ambient, electronic, experimental.`,
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
            selection={storeMusicCategory.category}
            onSelect={setMusicCategory}
          ></CategoryTabs>
          <div className="flex flex-col gap-2">
            {map[storeMusicCategory.category].map((item) => (
              <MusicCard key={item.id} {...item}></MusicCard>
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
): Promise<GetStaticPropsResult<MusicPageProps>> {
  const items: MusicPost[] = JSON.parse(
    await readFile("database/music-posts.json", "utf-8")
  );

  return {
    props: {
      items,
    },
  };
}

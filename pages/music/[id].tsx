import { readFile } from "fs/promises";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import BasedHead from "../../components/BasedHead";
import Button from "../../components/Button";
import ClientWrap from "../../components/ClientWrap";
import MusicCard from "../../components/MusicCard/MusicCard";
import { MusicPost } from "../../lib/post-types";
import { ScrollRestorer } from "../../lib/ScrollRestorer";
import { setMusicList, useStoreMusicList } from "../../store/store-music";

export type SingleMusicPageProps = {
  item: MusicPost;
};

export default withRouter(SingleMusicPage);

function SingleMusicPage(props: SingleMusicPageProps & WithRouterProps) {
  if (!useStoreMusicList.getState().items?.length) {
    setMusicList([props.item]);
  }

  return (
    <>
      <BasedHead
        {...{
          url: props.router.asPath,
          type: "music.song",
          title: `MDOX ${props.item.title}`,
          description: `${props.item.description}`,
          image: `${props.item.imagePath}`,
          imageWidth: props.item.imageWidth,
          imageHeight: props.item.imageHeight,
          imageAlt: `Picture about the song: ${props.item.title}`,
          audio: props.item.audioPath,
          musicDuration: props.item.audioDuration,
          musicMusician: "Dresmor Alakazard",
        }}
      />

      <ClientWrap>
        <div className="flex flex-col gap-2">
          <MusicCard key={props.item.id} {...props.item}></MusicCard>
          <Button className="self-start" onClick={() => props.router.back()}>
            Go Back
          </Button>
        </div>

        <ScrollRestorer />
      </ClientWrap>
    </>
  );
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const items: MusicPost[] = JSON.parse(
    await readFile("database/music-posts.json", "utf-8")
  );

  return {
    paths: items.map((item) => ({ params: { id: item.id } })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<SingleMusicPageProps>> {
  const id = context.params?.id as string;
  const items: MusicPost[] = JSON.parse(
    await readFile("database/music-posts.json", "utf-8")
  );
  const item = items.find((item) => item.id === id)!;

  return {
    props: {
      item,
    },
  };
}

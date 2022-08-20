import create from "zustand";

import { MusicPost } from "../lib/post-types";

export type StoreMusicPlayProps = { isPlaying?: boolean };
export type StoreMusicTimeProps = { time?: number };
export type StoreMusicProps = { value?: MusicPost | null };
export type StoreMusicListProps = { items?: MusicPost[] };

export const useStoreMusicPlay = create<StoreMusicPlayProps>(() => ({}));
export const useStoreMusicTime = create<StoreMusicTimeProps>(() => ({}));
export const useStoreMusic = create<StoreMusicProps>(() => ({}));
export const useStoreMusicList = create<StoreMusicListProps>(() => ({}));

export function setMusicPlay(isPlaying: boolean) {
  useStoreMusicPlay.setState({ isPlaying });
}

export function setMusicTime(time: number) {
  useStoreMusicTime.setState({ time });
}

export function setMusic(value?: MusicPost | null) {
  useStoreMusic.setState({ value });
}

export function setMusicList(items: MusicPost[]) {
  useStoreMusicList.setState({ items });
}

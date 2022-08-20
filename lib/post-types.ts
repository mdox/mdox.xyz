export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

export type ImagePost = {
  imagePath: string;
  imageWidth: number;
  imageHeight: number;
};

export type AudioPost = {
  audioPath: string;
  audioDuration: number;
};

export type MusicPost = Post & AudioPost & ImagePost & {};

export type GalleryPost = Post & {
  images: ImagePost[];
};

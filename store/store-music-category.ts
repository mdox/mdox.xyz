import create from "zustand";

export type StoreMusicCategoryProps = {
  category: string;
};

export const useStoreMusicCategory = create<StoreMusicCategoryProps>(() => ({
  category: "ALL",
}));

export function setMusicCategory(category: string) {
  useStoreMusicCategory.setState({ category });
}

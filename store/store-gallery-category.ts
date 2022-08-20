import create from "zustand";

export type StoreGalleryCategoryProps = {
  category: string;
};

export const useStoreGalleryCategory = create<StoreGalleryCategoryProps>(
  () => ({
    category: "Digital",
  })
);

export function setGalleryCategory(category: string) {
  useStoreGalleryCategory.setState({ category });
}

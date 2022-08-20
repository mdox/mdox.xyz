import create from "zustand";

export type StoreModalsCountProps = {
  count: number;
};

export const useStoreModalsCount = create<StoreModalsCountProps>(() => ({
  count: 0,
}));

export function increaseModalsCount() {
  useStoreModalsCount.setState({
    count: useStoreModalsCount.getState().count + 1,
  });
}

export function decreaseModalsCount() {
  useStoreModalsCount.setState({
    count: useStoreModalsCount.getState().count - 1,
  });
}

useStoreModalsCount.subscribe((state) => {
  if (state.count === 0) {
    globalThis.document.body.classList.remove("hide-scroll");
  } else if (state.count === 1) {
    globalThis.document.body.classList.add("hide-scroll");
  }
});

import { create } from "zustand";

type SearchStore = {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  toggle: () => void;
};

const useSearch = create<SearchStore>((set, get) => ({
  isOpen: false,
  handleOpen: () => set({ isOpen: true }),
  handleClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));

export default useSearch;

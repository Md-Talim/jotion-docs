import { create } from "zustand";

type CoverImageStore = {
  url?: string;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleReplace: (url: string) => void;
};

const useCoverImage = create<CoverImageStore>((set) => ({
  url: undefined,
  isOpen: false,
  handleOpen: () => set({ isOpen: true, url: undefined }),
  handleClose: () => set({ isOpen: false, url: undefined }),
  handleReplace: (url) => set({ isOpen: true, url }),
}));

export default useCoverImage;

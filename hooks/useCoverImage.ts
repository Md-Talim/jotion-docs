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
  handleOpen: () => set({ isOpen: true }),
  handleClose: () => set({ isOpen: false }),
  handleReplace: (url) => set({ isOpen: true, url }),
}));

export default useCoverImage;

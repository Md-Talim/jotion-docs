import { create } from "zustand";

type settingsStore = {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const useSettings = create<settingsStore>((set) => ({
  isOpen: false,
  handleOpen: () => set({ isOpen: true }),
  handleClose: () => set({ isOpen: false }),
}));

export default useSettings;

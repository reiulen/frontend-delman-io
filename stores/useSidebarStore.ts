import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
    isOpenSidebar: boolean;
    toggleSidebar: () => void;
}


export const useSidebarStore = create<SidebarState>()(
    persist(
        (set) => ({
            isOpenSidebar: false,
            toggleSidebar: () => set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
        }),
        {
            name: "sidebar-store",
            getStorage: () => ({
                setItem: (...args) => window.localStorage.setItem(...args),
                removeItem: (...args) => window.localStorage.removeItem(...args),
                getItem: async (...args) =>
                    new Promise((resolve) => {
                        if (typeof window === "undefined") {
                            resolve(null);
                        } else {
                            setTimeout(() => {
                                resolve(window.localStorage.getItem(...args));
                            }, 0);
                        }
                    }),
            }),
        }
    )
);

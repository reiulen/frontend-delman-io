import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AlertDialog {
    alertDialog: {
        isOpen: boolean;
        title: string;
        message: string;
        textConfirm: string;
        textCancel: string;
        cancelRef?: React.MutableRefObject<HTMLButtonElement> | null;
        onConfirm: () => void;
        onCancel: () => void;
    };
    isLoading: boolean;
    resetAlertDialog: () => void;
    setAlertDialog: (alertDialog: AlertDialog["alertDialog"]) => void;
    setLoading: (isLoading: boolean) => void;
}


export const useAlertDialogStore = create<AlertDialog>()(
    (set) => ({
        alertDialog: {
            isOpen: false,
            isLoading: false,
            title: "",
            message: "",
            cancelRef: null,
            textConfirm: "",
            textCancel: "",
            onConfirm: () => { },
            onCancel: () => { },
        },
        isLoading: false,
        resetAlertDialog: () => set({ 
            alertDialog: { 
                isOpen: false, 
                title: "",
                message: "", 
                textConfirm: "",
                textCancel: "",
                cancelRef: null, 
                onConfirm: () => { }, 
                onCancel: () => { }, 
            } 
        }),
        setAlertDialog: (alertDialog) => set({ alertDialog }),
        setLoading: (isLoading) => set({ isLoading }),
    })
);

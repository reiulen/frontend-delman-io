import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
} from '@chakra-ui/react'
import { useAlertDialogStore } from '@/stores/useAlertDialogStore'

export default function AlertDialogConfirmation() {
    const { isLoading, alertDialog, resetAlertDialog } = useAlertDialogStore((state) => state);
    return (
        <AlertDialog
            isOpen={alertDialog.isOpen}
            leastDestructiveRef={alertDialog.cancelRef as any}
            onClose={alertDialog.onCancel}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {alertDialog.title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {alertDialog.message}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={alertDialog.cancelRef} onClick={alertDialog.onCancel}>
                            {alertDialog.textCancel}
                        </Button>
                        <Button isLoading={isLoading} colorScheme='red' onClick={alertDialog.onConfirm} ml={3}>
                            {alertDialog.textConfirm}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

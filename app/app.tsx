'use client'
import AlertDialogConfirmation from '@/components/ui/Alert/AlertDialogConfirmation'
import { themeChakra } from '@/utils/chakraThemes'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = {
    children: React.ReactNode
}

function App({ children }: Props) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <CacheProvider>
                <ChakraProvider theme={themeChakra}>
                    {children}
                    <AlertDialogConfirmation />
                </ChakraProvider>
            </CacheProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
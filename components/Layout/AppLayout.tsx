'use client'
import Navbar from '@/components/Layout/Navbar/Navbar'
import Sidebar from '@/components/Layout/Sidebar/Sidebar'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { useSidebarStore } from '@/stores/useSidebarStore'
import useStore from '@/stores/useStore'

type LayoutProps = {
    children: React.ReactNode
}

export default function AppLayout({
    children,
}: LayoutProps) {
    const isOpenSidebar = useStore(useSidebarStore, (state) => state.isOpenSidebar);
    return (
        <Box minH="100vh">
            <Navbar />
            <Box
                paddingTop={{ base: 16, md: 10 }}
            >
                <Sidebar />
                <Box
                    ml={{
                        base: 0,
                        md: isOpenSidebar ? 20 : 60
                    }}
                    pt={{
                        base: 0,
                        md: 8
                    }}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

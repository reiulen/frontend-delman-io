import Header from '@/components/ui/Header/Index'
import { Box } from '@chakra-ui/react'
import React from 'react'
import SearchUser from './SearchUser';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Search User | Delman Io Frontend',
    description: 'Delman Io Frontend',
}

export default function page() {
    return (
        <div>
            <Header
                title="Search User"
                subtitle="Search existing user"
            />
            <Box
                p={{ base: 5 }}
            >
                <Box
                    w={{ base: 'full', lg: '50%' }}
                >
                   <SearchUser />
                </Box>
            </Box>
        </div>
    )
}

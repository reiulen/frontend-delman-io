import Header from '@/components/ui/Header/Index'
import { Box } from '@chakra-ui/react'
import React from 'react'
import UserRegistrationForm from './UserRegistrationForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Users Registration | Delman Io Frontend',
    description: 'Delman Io Frontend',
}

export default function page() {
    return (
        <div>
            <Header
                title="User Registration"
                subtitle="Add new user"
            />
            <Box
                p={{ base: 5 }}
            >
                <UserRegistrationForm />
            </Box>
        </div>
    )
}

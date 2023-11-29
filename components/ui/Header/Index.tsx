import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    children?: React.ReactNode
    title?: string
    subtitle?: string
}

export default function Header({
    children,
    title,
    subtitle,
}: Props) {
    return (
        <Box
            paddingLeft={{ base: 4 }}
            paddingBottom={{ base: 2 }}
            borderBottom="1px"
            borderBottomColor={'gray.200'}>
            {
                children ? children : (
                    <>
                        {
                            title && (
                                <Text
                                    fontSize="3xl"
                                    fontWeight="semibold"
                                    color={'gray.700'}>
                                    {title}
                                </Text>
                            )
                        }
                        {
                            subtitle && (
                                <Text
                                    fontSize="md"
                                    color={'blue.600'}
                                    fontWeight="bold">
                                    {subtitle}
                                </Text>
                            )
                        }
                    </>
                )
            }
        </Box>
    )
}

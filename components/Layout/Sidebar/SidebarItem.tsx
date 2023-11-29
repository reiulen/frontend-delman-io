import { useSidebarStore } from '@/stores/useSidebarStore'
import useStore from '@/stores/useStore'
import { Box, Flex, FlexProps, Icon, Text, useColorModeValue, useStatStyles } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactText } from 'react'
import { IconType } from 'react-icons'

interface SidebarItem extends FlexProps {
    icon: IconType,
    href?: string | undefined,
    children: ReactText
}
export default function SidebarItem({
    icon,
    href,
    children,
    ...rest
}: SidebarItem) {
    const pathname = usePathname();
    const sidebarActive = pathname === href;
    const isOpenSidebar = useStore(useSidebarStore, (state) => state.isOpenSidebar);
    return (
        <Box
            as={href ? Link : 'div'}
            {...(href && { href })}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                px="5"
                py="3"
                role="group"
                cursor="pointer"
                position='relative'
                fontWeight='500'
                className={sidebarActive ? 'active-class' : ''}
                sx={{
                    '&:hover, &.active-class': {
                        bg: 'blackAlpha.50',
                        color: 'blue.600',
                        fontWeight: 600,
                        '&:before': {
                            content: '""',
                            height: 'full',
                            width: '3px',
                            bg: 'blue.600',
                            position: 'absolute',
                            left: 0,
                        }
                    },
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="20"
                        _groupHover={{
                            color: 'blue.600',
                            fontWeight: 600,
                        }}
                        as={icon}
                    />
                )}
                <Text
                    sx={{ 
                        display: {
                            base: isOpenSidebar ? 'block' : 'none', 
                            md: isOpenSidebar ? 'none' : 'block' 
                        }
                    }}>
                    {children}
                </Text>
            </Flex>
        </Box>
    )
}
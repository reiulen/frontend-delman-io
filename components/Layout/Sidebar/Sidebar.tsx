'use client'
import React, { useEffect, useRef } from 'react'
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { SidebarData } from './Sidebar.constants'
import SidebarItem from './SidebarItem'
import { HiOutlineMenuAlt2 } from "react-icons/hi"
import { useSidebarStore } from '@/stores/useSidebarStore'
import useStore from '@/stores/useStore'

export default function Sidebar({ ...rest }) {
  const isOpenSidebar = useStore(useSidebarStore, (state) => state.isOpenSidebar);
  const { toggleSidebar } = useSidebarStore();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 768 &&
        sidebarRef.current && (!sidebarRef.current.contains(event.target as Node)) && 
        isOpenSidebar && 
        !(event.target as HTMLElement)?.className?.includes('toggle__sidebar')) {
        toggleSidebar();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpenSidebar]);

  return (
    <Box
      ref={sidebarRef}
      as="nav"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      sx={{
        width: { 
          base: isOpenSidebar ? 60 : 0, 
          md: isOpenSidebar ? 20 : 60, 
          lg: isOpenSidebar ? 20 : 60 
        },
        display: {
          base: isOpenSidebar ? 'block' : 'none',
          md: 'block'
        }
      }}
      transition="width .1s ease-in-out"
      py={2}
      zIndex={99}
      pos="fixed"
      top="14"
      h="full"
      {...rest}>
      <SidebarItem
        className='toggle__sidebar'
        display={{ base: 'none', md: 'flex' }}
        icon={HiOutlineMenuAlt2}
        onClick={() => toggleSidebar()}>
        Menu
      </SidebarItem>
      {SidebarData.map((item) => (
        <SidebarItem key={item.name} icon={item.icon} href={item.href}>
          {item.name}
        </SidebarItem>
      ))}
    </Box>
  )
}



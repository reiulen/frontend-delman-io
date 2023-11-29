'use client'
import { useSidebarStore } from '@/stores/useSidebarStore'
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'

export default function Navbar() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 10 }}
        borderBottom={1}
        position={'fixed'}
        top={0}
        w={'full'}
        zIndex={999}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1 }}
          align={{
            base: 'center',
            md: 'start'
          }}
          justify={{
            base: 'space-between',
            md: 'start'
          }}>
          <Flex
            onClick={() => toggleSidebar()}
            className='toggle__sidebar'
            display={{ base: 'flex', md: 'none' }}
            align="center"
            px="5"
            py="3"
            role="group"
            cursor="pointer"
            fontWeight='500'
            position='relative'>
            <Icon
              mr="4"
              fontSize="20"
              _groupHover={{
                color: 'blue.600',
                fontWeight: 600,
              }}
              as={HiOutlineMenuAlt2}
            />
            Menu
          </Flex>
          <Text
            mx={{ base: 'auto', md: 0 }}
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight={600}
          >
            delman.io
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
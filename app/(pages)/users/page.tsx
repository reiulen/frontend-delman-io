import { Box, useColorModeValue, Text } from '@chakra-ui/react';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import TableUsers from './TableUsers';
import Header from '@/components/ui/Header/Index';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users Data | Delman Io Frontend',
  description: 'Delman Io Frontend',
}

export default function page() {
  return (
    <div>
      <Header
        title="Users Data"
        subtitle="List of Users Data"
      />
      <Box
        padding={{ base: 4 }}
      >
        <TableUsers />
      </Box>
    </div>
  )
}


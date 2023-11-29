import { Box, useColorModeValue, Text } from '@chakra-ui/react';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import TableDashboard from './TableDashboard';
import Header from '@/components/ui/Header/Index';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Data | Delman Io Frontend',
  description: 'Delman Io Frontend',
}

export default function page() {
  return (
    <div>
      <Header
        title="Sales Dashboard"
        subtitle="List of Sales Data"
      />
      <Box
        padding={{ base: 4 }}
      >
        <TableDashboard />
      </Box>
    </div>
  )
}


import { Skeleton } from '@chakra-ui/react'
import React from 'react'

export default function SkeletonServerTable() {
  return Array.from({ length: 5 }).map((_, index) => (
    <Skeleton key={index} height="35px" my="3" />
  ))
}

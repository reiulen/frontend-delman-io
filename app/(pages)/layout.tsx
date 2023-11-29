import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'

type LayoutProps = {
  children: React.ReactNode
}

export default function layout({
  children,
}: LayoutProps) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}

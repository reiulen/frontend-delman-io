import type { Metadata } from 'next'
import App from './app'

export const metadata: Metadata = {
  title: 'Delman Io Frontend',
  description: 'Delman Io Frontend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  )
}

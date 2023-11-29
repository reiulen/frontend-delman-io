import { render, screen } from '@testing-library/react'
import TableUsers from '@/app/(pages)/users/TableUsers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('Table User Rendering - Rendering', () => {
  describe('TableUsers', () => {
    it('should render table headers', async () => {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <TableUsers />
        </QueryClientProvider>
      )

      const idHeader = screen.getByText('id')
      const nameHeader = screen.getByText('name')
      const emailHeader = screen.getByText('email')

      expect(idHeader)
      expect(nameHeader)
      expect(emailHeader)
    })
  })
})
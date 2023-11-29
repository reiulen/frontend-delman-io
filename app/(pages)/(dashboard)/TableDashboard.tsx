'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    ColumnDef,
} from '@tanstack/react-table'
import ServerTable from '@/components/ui/Table/ServerTable/Index'
import { FetchListSalesQuery } from '@/services/useSalesQuery'
import { SalesResponse } from '@/types/api/sales-response'

export default function TableDashboard() {
    const defaultColumns: ColumnDef<SalesResponse>[] = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'id',
        },
        {
            accessorKey: 'sales_id',
            header: 'sales_id',
        },
        {
            accessorKey: 'item_id',
            header: 'item_id',
        },
        {
            accessorKey: 'qty',
            header: 'qty',
        },
        {
            accessorKey: 'consumen_name',
            header: 'consumen_name',
        },
        {
            accessorKey: 'transaction_date',
            header: 'transaction_date',
        },
    ], [])
    const defaultColumn = useMemo(
        () => ({
            size: 195,
            resizable: true,
        }),
        []
    );
    const [data, setData] = useState<SalesResponse[]>([])
    const {
        data: dataListSales,
        isLoading,
        isPending,
        isSuccess,
        isFetching,
        refetch,
    } = FetchListSalesQuery({});

    useEffect(() => {
        if (isSuccess) {
            setData(dataListSales?.data)
        }
    }, [isSuccess, dataListSales])

    return (
       <ServerTable
            isLoading={isLoading}
            isPending={isPending}
            isSuccess={isSuccess}
            isFetching={isFetching}
            refetch={refetch}
            data={data}
            defaultColumn={defaultColumn}
            defaultColumns={defaultColumns}
       />
    )
}
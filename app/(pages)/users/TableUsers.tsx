'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    ColumnDef,
} from '@tanstack/react-table'
import { FetchListUserQuery } from '@/services/useUsersQuery'
import { UserResponse } from '@/types/api/user-response'
import ServerTable from '@/components/ui/Table/ServerTable/Index'


export default function TableUsers() {
    const defaultColumns: ColumnDef<UserResponse>[] = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'id',
        },
        {
            accessorKey: 'name',
            header: 'name',
        },
        {
            accessorKey: 'email',
            header: 'email',
        },
        {
            accessorKey: 'country_name',
            header: 'country_name',
        },
        {
            accessorKey: 'device_id',
            header: 'device_id',
        },
        {
            accessorKey: 'bitcoin_address',
            header: 'bitcoin_address',
        },
        {
            accessorKey: 'avatar',
            header: 'avatar',
        },
        {
            accessorKey: 'login_ip',
            header: 'login_ip',
        },
        {
            accessorKey: 'active_device_mac',
            header: 'active_device_mac',
        },
        {
            accessorKey: 'notes',
            header: 'notes',
        },
        {
            accessorKey: 'age',
            header: 'age',
        },
        {
            accessorKey: 'referral_id',
            header: 'referral_id',
        },
        {
            accessorKey: 'locale',
            header: 'locale',
        },
        {
            accessorKey: 'favorite_music',
            header: 'favorite_music',
        },
        {
            accessorKey: 'phone_number',
            header: 'phone_number',
        },
        {
            accessorKey: 'twitter_username',
            header: 'twitter_username',
        },
        {
            accessorKey: 'job',
            header: 'job',
        },
        {
            accessorKey: 'invoice_email_address',
            header: 'invoice_email_address',
        },
        {
            accessorKey: 'hmac_secret',
            header: 'hmac_secret',
        },
        {
            accessorKey: 'favorite_quote',
            header: 'favorite_quote',
        },
        {
            accessorKey: 'primary_color',
            header: 'primary_color',
        },
        {
            accessorKey: 'secondary_color',
            header: 'secondary_color',
        },
        {
            accessorKey: 'material',
            header: 'material',
        },
        {
            accessorKey: 'shipping_address',
            header: 'shipping_address',
        },
        {
            accessorKey: 'zip_code',
            header: 'zip_code',
        },
        {
            accessorKey: 'latitude',
            header: 'latitude',
        },
        {
            accessorKey: 'longitude',
            header: 'longitude',
        },
        {
            accessorKey: 'favorite_animal',
            header: 'favorite_animal',
        },
        {
            accessorKey: 'app_version',
            header: 'app_version',
        },
        {
            accessorKey: 'timezone',
            header: 'timezone',
        }
    ], [])

    const defaultColumn = useMemo(
        () => ({
            size: 170,
            resizable: true,
        }),
        []
    );

    const [data, setData] = useState<UserResponse[]>([])
    const {
        data: dataListUsers,
        isLoading,
        isPending,
        isSuccess,
        isFetching,
        refetch,
    } = FetchListUserQuery({});

    useEffect(() => {
        if (isSuccess) {
            setData(dataListUsers?.data)
        }
    }, [isSuccess, dataListUsers])

    return (
       <ServerTable
            isLoading={isLoading}
            isPending={isPending}
            isSuccess={isSuccess}
            isFetching={isFetching}
            refetch={refetch}
            data={data}
            defaultColumns={defaultColumns}
            defaultColumn={defaultColumn}
       />
    )
}
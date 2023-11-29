import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FixedSizeList as List } from "react-window"

import {
    useReactTable,
    ColumnResizeMode,
    getCoreRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table'
import { BsArrowsExpandVertical } from 'react-icons/bs'
import { Box, Icon } from '@chakra-ui/react'
import { FaAngleRight, FaBoxOpen, FaTimesCircle } from 'react-icons/fa'
import SkeletonServerTable from './SkeletonServeTable'
import CardInfo from '../../Card/CardInfo'

type ColumnBodyProps = {
    index: number;
    style: React.CSSProperties;
}

type ServerTableProps = {
    data: any[];
    defaultColumns: ColumnDef<any>[];
    defaultColumn: any;
    isSuccess?: boolean;
    isLoading?: boolean;
    isPending?: boolean;
    isFetching?: boolean;
    refetch?: () => void;
}

export default function ServerTable({
    data,
    defaultColumns,
    defaultColumn,
    isLoading,
    isPending,
    isSuccess,
    isFetching,
    refetch,
}: ServerTableProps) {
    const [columns] = useState<typeof defaultColumns>(() => [
        ...defaultColumns,
    ])
    const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onEnd')
    const [expandedCells, setExpandedCells] = useState<string[]>([])
    const [toggleExpandedCells, setToggleExpandedCells] = useState<string[]>([]);
    const cellRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const tableRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (refetch)
            refetch()
    }, [])

    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: true,
        columnResizeMode,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
    },
    )

    const checkOverflow = () => {
        const updatedExpandedCells = [];
        for (const cellId in cellRefs.current) {
            const cellRef = cellRefs.current[cellId];
            if (cellRef) {
                const isOverflowing = cellRef.scrollWidth > cellRef.clientWidth;
                if (isOverflowing)
                    updatedExpandedCells.push(cellId);
            }
        }
        setExpandedCells(updatedExpandedCells);
    }

    const handleToggleExpandedCells = (cellId: string) => {
        const index = toggleExpandedCells.indexOf(cellId);
        if (index > -1)
            toggleExpandedCells.splice(index, 1);
        else
            toggleExpandedCells.push(cellId);
        setToggleExpandedCells([...toggleExpandedCells]);
    }

    const widthTable = table.getHeaderGroups()?.[0].headers?.reduce(
        (acc, header) => acc + header?.column?.getSize(),
        0
    )

    useEffect(() => {
        checkOverflow();
        return () => {
            setExpandedCells([]);
            setToggleExpandedCells([]);
        }
    }, [data, widthTable])


    const ColumnBody = useCallback(({ index, style }: ColumnBodyProps) => {
        const row = table.getRowModel().rows[index];
        const cells = row.getVisibleCells();
        const cellExpanded = cells.filter(cell => toggleExpandedCells.includes(cell.id)).length > 0;
        return <Box
            key={row.id}
            style={{
                ...style,
                height: 'fit-content',
                zIndex: cellExpanded ? 999 : 0,
            }}
            sx={{
                w: 'fit-content',
                display: 'flex',
                flexWrap: 'wrap',
                height: 'full',
                alignItems: 'start',
            }}>
            {cells.map(cell => {
                const cellId = cell.id;
                const isExpanded = expandedCells.includes(cellId);
                const isToggleExpanded = toggleExpandedCells.includes(cellId);
                return (
                    <Box
                        key={cell.id}
                        sx={{
                            position: 'relative',
                        }}
                    >
                        <Box
                            ref={(ref) => (cellRefs.current[cellId] = ref)}
                            sx={{
                                w: cell.column.getSize(),
                                border: '1px solid',
                                borderColor: isToggleExpanded ? 'blue.500' : 'gray.200',
                                padding: isToggleExpanded ? '10px 14px' : '6px 10px',
                                overflow: 'hidden',
                                display: 'block',
                                textOverflow: 'ellipsis',
                                whiteSpace: isToggleExpanded ? 'normal' : 'nowrap',
                                position: 'relative',
                                bg: 'white',
                            }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Box>
                        {
                            isExpanded && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: isToggleExpanded ? 2 : 0,
                                        right: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: isToggleExpanded ? 'auto' : 'full',
                                    }}>
                                    {
                                        isToggleExpanded ? (
                                            <Box
                                                as={'button'}
                                                onClick={() => handleToggleExpandedCells(cellId)}
                                                sx={{
                                                    borderRadius: '50%',
                                                    height: '17px',
                                                    width: '17px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Icon
                                                    fontSize={15}
                                                    as={FaTimesCircle}
                                                    color='gray.400' />
                                            </Box>
                                        ) : (
                                            <Box
                                                as={'button'}
                                                onClick={() => handleToggleExpandedCells(cellId)}
                                                sx={{
                                                    background: 'gray.400',
                                                    borderRadius: '50%',
                                                    height: '17px',
                                                    width: '17px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Icon
                                                    fontSize={15}
                                                    as={FaAngleRight}
                                                    color='white' />
                                            </Box>
                                        )
                                    }

                                </Box>
                            )
                        }
                    </Box>
                )
            })}
        </Box>
    }, [expandedCells, toggleExpandedCells])

    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'gray.200',
                overflow: 'auto',
                width: '100%',
            }}
        >
            <Box
                ref={tableRef}
                sx={{
                    w: 'full',
                    borderSpacing: 0,
                    borderCollapse: 'collapse',
                    '&.is__resizing': {
                        cursor: 'col-resize',
                    },
                }}>
                <Box>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Box
                            key={headerGroup.id}
                            sx={{
                                display: 'flex',
                                width: 'fit-content',
                            }}>
                            {headerGroup.headers.map(header => (
                                <Box
                                    key={header.id}
                                    as={'span'}
                                    sx={{
                                        w: header.getSize(),
                                        position: 'relative',
                                        padding: '2px 4px',
                                        border: '1px solid',
                                        borderColor: 'gray.200',
                                        bg: 'gray.100',
                                        textTransform: 'none',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textAlign: 'center',
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    <Box
                                        as='div'
                                        onMouseDown={(event) => {
                                            header.getResizeHandler()(event)
                                        }}
                                        onTouchStart={(event) => {
                                            header.getResizeHandler()(event)
                                        }}
                                        className={`${header.column.getIsResizing() ? 'is__resizing' : ''}`}
                                        sx={{
                                            transform: columnResizeMode === 'onEnd' &&
                                                header.column.getIsResizing()
                                                ? `translateX(${table.getState().columnSizingInfo.deltaOffset
                                                }px)`
                                                : '',
                                            position: 'absolute',
                                            top: 0,
                                            right: 1,
                                            height: 'full',
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'col-resize',
                                            userSelect: 'none',
                                            touchAction: 'none',
                                            zIndex: 999,
                                            '&.is__resizing': {
                                                bg: 'gray.200',
                                                opacity: 1,
                                            },
                                        }}>
                                        <BsArrowsExpandVertical size={14} />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
                {
                    isLoading || isPending || isFetching ? (
                        <SkeletonServerTable />
                    ) : data?.length > 0 ? (
                        <Box>
                            <List
                                height={500}
                                itemCount={
                                    table.getRowModel().rows.length
                                }
                                itemSize={36}
                                onScroll={() => {
                                    checkOverflow();
                                }}
                                width={widthTable}>
                                {ColumnBody}
                            </List>
                        </Box>
                    ) : (
                        <CardInfo
                            mt={16}
                            alignItems='center'
                            justifyContent='center'
                            iconInfo={FaBoxOpen}
                            text='No data found'
                        />
                    )
                }

            </Box>
        </Box>
    )
}

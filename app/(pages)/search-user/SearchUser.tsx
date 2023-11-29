'use client'
import React, { useEffect, useState, useRef, LegacyRef, SetStateAction } from 'react'
import { FixedSizeList as List } from 'react-window'
import { FaSearch, FaTimesCircle, FaBoxOpen } from 'react-icons/fa'
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Spinner,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import { FetchListUserQuery } from '@/services/useUsersQuery';
import { UserResponse } from '@/types/api/user-response';
import { AiOutlineFileSearch } from 'react-icons/ai'
import DetailUser from './DetailUser'
import CardInfo from '@/components/ui/Card/CardInfo'

type ListColumnBodyUserProps = {
    index: number;
    style: React.CSSProperties;
}

export default function SearchUser() {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);
    const [dataListUsers, setDataListUsers] = useState<UserResponse[]>([])
    const [detailDataUser, setDetailDataUser] = useState({} as UserResponse)
    const [search, setSearch] = useState<string>('');
    const {
        data: responseDataListUsers,
        isLoading,
        isPending,
        isSuccess,
        isFetching,
        refetch,
    } = FetchListUserQuery({});

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (isSuccess) setDataListUsers(responseDataListUsers?.data);
    }, [isSuccess, responseDataListUsers?.data]);

    const handleSearch = (value: string) => {
        setSearch(value);
        const filteredData = responseDataListUsers?.data.filter((user: UserResponse) => {
            return user.email.toLowerCase().includes(value.toLowerCase());
        });
        setDataListUsers(filteredData);
    }

    const ListColumnBodyUser = ({ index, style }: ListColumnBodyUserProps) => {
        return (
            <Box
                key={index}
                style={style}
            >
                <Card
                    mb={4}
                    boxShadow='none'
                    align='center'
                    border='1px solid'
                    borderColor='gray.200'
                    p={6}
                    borderRadius={0}>
                    <CardBody textAlign='center'>
                        <Box borderBottom='1px solid' borderColor='gray.300' pb={4} px={12}>
                            <Heading size='md'>{dataListUsers[index]?.name}</Heading>
                            <Text mt={2} color='gray.600' fontWeight='normal'>
                                {dataListUsers[index]?.email}
                            </Text>
                        </Box>
                        <Button
                            ref={btnRef}
                            onClick={() => {
                                onOpen();
                                setDetailDataUser(dataListUsers?.[index]);
                            }}
                            colorScheme='blue' borderRadius={2} mt={4}>
                            View User Profile
                        </Button>
                    </CardBody>
                </Card>
            </Box>
        )
    }

    return (
        <>
            <InputGroup borderRadius={0}>
                <InputLeftElement>
                    <Icon as={FaSearch} color={'gray.600'} size={14} />
                </InputLeftElement>
                <Input
                    pr='4.5rem'
                    type='text'
                    placeholder='Search user by email'
                    borderRadius={0}
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {search?.length > 0 && (
                    <InputRightElement width='2.5rem'>
                        <Button
                            onClick={() => handleSearch('')}
                            bg={'transparent'}
                            _hover={{ bg: 'transparent' }}
                            p={2}>
                            <Icon as={FaTimesCircle} color={'gray.500'} size={14} />
                        </Button>
                    </InputRightElement>
                )}
            </InputGroup>
            {
                dataListUsers.length > 0 && search?.length > 0 ? (
                    <List
                        height={600}
                        itemCount={dataListUsers?.length}
                        itemSize={240}
                        width='100%'
                        style={{
                            overflow: 'auto',
                            marginTop: '20px'
                        }}
                    >
                        {ListColumnBodyUser}
                    </List>
                ) : dataListUsers?.length < 1 && search?.length > 0 ? (
                    <CardInfo
                        mt={16}
                        alignItems='center'
                        justifyContent='center'
                        iconInfo={FaBoxOpen}
                        text={`No user found with email ${search}`}
                    />
                ) : (
                    <CardInfo
                        mt={16}
                        alignItems='center'
                        justifyContent='center'
                        iconInfo={AiOutlineFileSearch}
                        text='Search user by email to view user profile'
                    />
                )
            }
            <DetailUser
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setDetailDataUser({} as UserResponse);
                }}
                refetch={refetch}
                detailDataUser={detailDataUser}
            />

            {
                (isLoading || isPending || isFetching) && (
                    <Flex
                        justifyContent='center'
                        alignItems='center'
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 999,
                            height: '100vh',
                            width: '100%',
                            background: 'rgba(0,0,0,0.5)',
                        }}>
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </Flex>
                )
            }
        </>
    )
}

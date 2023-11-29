import React, { useEffect, useRef } from 'react'
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    Heading,
    Table,
    Tbody,
    Td,
    Text,
    Tr,
    useToast,
} from '@chakra-ui/react'
import { UserResponse } from '@/types/api/user-response';
import { useAlertDialogStore } from '@/stores/useAlertDialogStore';
import { MutationDeleteUser } from '@/services/useUsersQuery';
import { AxiosError } from 'axios';

type UserDetailProp = {
    isOpen: boolean;
    onClose: () => void;
    detailDataUser: UserResponse;
    refetch: () => void;
}

type ListAttributesUser = {
    label: string;
    key: keyof UserResponse;
}

export default function DetailUser({
    isOpen,
    onClose,
    detailDataUser,
    refetch
}: UserDetailProp) {
    const toast = useToast()
    const listAttributesUser: ListAttributesUser[] = [
        {
            label: 'Id',
            key: 'id'
        },
        {
            label: 'Name',
            key: 'name'
        },
        {
            label: 'Email',
            key: 'email'
        },
        {
            label: 'Country Name',
            key: 'country_name'
        },
        {
            label: 'Device Id',
            key: 'device_id'
        },
        {
            label: 'Bitcoin Address',
            key: 'bitcoin_address'
        },
        {
            label: 'Avatar',
            key: 'avatar'
        },
        {
            label: 'Login Ip',
            key: 'login_ip'
        },
        {
            label: 'Active Device Mac',
            key: 'active_device_mac'
        },
        {
            label: 'Notes',
            key: 'notes'
        },
        {
            label: 'Age',
            key: 'age'
        },
        {
            label: 'Referral Id',
            key: 'referral_id'
        },
        {
            label: 'Locale',
            key: 'locale'
        },
        {
            label: 'Favorite Music',
            key: 'favorite_music'
        },
        {
            label: 'Phone Number',
            key: 'phone_number'
        },
        {
            label: 'Twitter Username',
            key: 'twitter_username'
        },
        {
            label: 'Job',
            key: 'job'
        },
        {
            label: 'Invoice Email Address',
            key: 'invoice_email_address'
        },
        {
            label: 'Hmac Secret',
            key: 'hmac_secret'
        },
        {
            label: 'Favorite Quote',
            key: 'favorite_quote'
        },
        {
            label: 'Primary Color',
            key: 'primary_color'
        },
        {
            label: 'Secondary Color',
            key: 'secondary_color'
        },
        {
            label: 'Material',
            key: 'material'
        },
        {
            label: 'Shipping Address',
            key: 'shipping_address'
        },
        {
            label: 'Zip Code',
            key: 'zip_code'
        },
        {
            label: 'Latitude',
            key: 'latitude'
        },
        {
            label: 'Longitude',
            key: 'longitude'
        },
        {
            label: 'Favorite Animal',
            key: 'favorite_animal'
        },
        {
            label: 'App Version',
            key: 'app_version'
        },
        {
            label: 'Timezone',
            key: 'timezone'
        }
    ]
    const { setLoading, resetAlertDialog, setAlertDialog } = useAlertDialogStore((state) => state);
    const btnRef = useRef<HTMLButtonElement>(null);

    const { mutate: mutationDelete, isPending: isPendigMutation } = MutationDeleteUser({
        id: detailDataUser?.id,
        onError: (error: AxiosError) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message || error?.message || 'Something went wrong',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })
        },
        onSuccess: (data) => {
            toast({
                title: 'User deleted successfully.',
                description: data?.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })
            onClose()
            refetch()
            resetAlertDialog()
        }
    });

    const handleDeleteUser = () => {
        setAlertDialog({
            isOpen: true,
            title: 'Delete user',
            message: `Are you sure want to delete user ${detailDataUser?.name} ?`,
            textConfirm: 'Delete',
            textCancel: 'Cancel',
            onConfirm: () => {
                mutationDelete({
                    id: detailDataUser?.id,
                    name: detailDataUser?.name,
                    email: detailDataUser?.email
                })
            },
            onCancel: () => {
                resetAlertDialog()
            }
        })
    }

    useEffect(() => {
        setLoading(isPendigMutation)
    }, [isPendigMutation])

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
            size={'sm'}
        >
            <DrawerContent
                bg={'gray.50'}
                boxShadow={'lg'}

            >
                <DrawerCloseButton />
                <DrawerBody py={6} px={4}>
                    <Box
                        borderBottom='1px solid'
                        borderColor='gray.300'
                        pb={4}
                    >
                        <Heading size="md">
                            User Details
                        </Heading>
                        <Text mt={2} color='gray.600' fontWeight='normal' fontSize='sm'>
                            This is inquiry about user with email : {detailDataUser?.email}
                        </Text>
                    </Box>
                    <Box
                        h={'calc(100vh - 200px)'}
                        w='full'
                        py={4}
                        overflowY={'auto'}
                        display={'block'}>
                        <Table>
                            <Tbody>
                                {
                                    listAttributesUser.map((attribute: ListAttributesUser, index: number) => (
                                        <Tr key={index}>
                                            <Td
                                                width='35%'
                                                fontWeight='semibold'
                                                p='3px 30px 3px 0px'
                                                border={'none'}
                                                color={'gray.800'}
                                                whiteSpace='nowrap'
                                                fontSize={'md'}
                                                textAlign={'left'}
                                                verticalAlign={'top'}
                                            >
                                                {attribute?.label}
                                            </Td>
                                            <Td
                                                width='65%'
                                                fontWeight='semibold'
                                                p='3px 30px 3px 0px'
                                                border={'none'}
                                                color={'gray.800'}
                                                fontSize={'md'}
                                                wordBreak={'break-all'}

                                            >
                                                {detailDataUser?.[attribute?.key as keyof UserResponse]}
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                    </Box>
                </DrawerBody>
                <DrawerFooter
                    borderTop={'1px solid'}
                    borderColor={'gray.300'}
                    mb={4}
                    px={4}
                    justifyContent={'space-between'}>
                    <Button variant='transparent' color='gray.500' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme='red'
                        onClick={handleDeleteUser}
                    >Delete user</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

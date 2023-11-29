import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons';

type CardInfoProps = {
    iconInfo: IconType;
    text: string;
    childern?: React.ReactNode;
    [key: string]: any;
}

export default function CardInfo({
    iconInfo,
    text,
    childern,
    ...res
}: CardInfoProps) {
    return (
        <Flex {...res}>
            <Box
                textAlign={'center'}>
                {
                    iconInfo && (
                        <Icon
                            as={iconInfo}
                            color={'gray.500'}
                            fontSize={64}
                        />
                    )
                }
                {
                    text && (
                        <Text mt={2} color='gray.600' fontWeight='normal'>
                            {text}
                        </Text>
                    )
                }
            </Box>
        </Flex>
    )
}

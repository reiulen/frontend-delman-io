'use client'
import React from 'react'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useForm, SubmitHandler } from "react-hook-form"
import { MutationAddUser } from '@/services/useUsersQuery'

type Inputs = {
  name: string
  email: string
}

export default function UserRegistrationForm() {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const { mutate: mutationAdd, isPending: isPendigMutation } =
    MutationAddUser({
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      },
      onSuccess: (data) => {
        toast({
          title: "User added successfully.",
          description: data?.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
        reset()
        clearErrors()
      }
    })

  const onSubmit: SubmitHandler<Inputs> = (data) => mutationAdd(data)

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      flexDirection="column"
      gap={4}
      w={{ base: 'full', lg: '40%' }}>
      <FormControl isInvalid={errors?.name ? true : false}>
        <FormLabel>Name</FormLabel>
        <Input
          {...register("name", {
            required: "Please provide a name",
          })}
          type="text"
          borderRadius={2}
        />
        {
          errors?.name && <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={errors?.email ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register("email", {
            required: "Please provide an email",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format"
            }
          })}
          borderRadius={2} />
        {
          errors?.email && <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        }
      </FormControl>

      <Button
        type='submit'
        isLoading={isPendigMutation}
        isDisabled={Object.values(errors).filter(val => val).length > 0 ? true : false}
        loadingText='Submitting'
        w='fit-content'
        colorScheme='blue'
        borderRadius={4}
        mt={2}>
        Submit User
      </Button>
    </Flex>
  )
}

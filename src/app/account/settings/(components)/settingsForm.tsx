'use client'
import { FormField } from '@/components/inputs/FormField'
import { UserSettingsSchema } from '@/core/schemas/userDataSchema'
import { GetUserSettings, updateUserSettings } from '@/core/user/settings'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

export default function UserSettingsForm() {
  const queryKey = ['user.settings']
  const {
    data: userSettings,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: GetUserSettings,
  })

  const { mutate } = useMutation({
    onSuccess(response, _variables, _onMutateResult, context) {
      if (response.isError) {
        response.errors.forEach((err) => {
          toast.error('Formulário inválido', {
            description: err,
          })
        })
        return
      }
      context.client.setQueryData(queryKey, () => {
        toast.success('Dados atualizados.')
        console.log(response)
        return response.data
      })
    },
    onError: (_error, _variables, _onMutateResult, ctx) => {
      console.log(_error)
      ctx.client.setQueryData(queryKey, (old) => old)
    },
    retry: 3,
    mutationFn: updateUserSettings,
  })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const parsedValues = UserSettingsSchema.safeParse(
      Object.fromEntries(formData.entries()),
    )
    if (!parsedValues.success) {
      parsedValues.error.issues.forEach((issue) => {
        toast.warning(`Dados inválidos`, {
          description: `${issue.message}`,
        })
      })
      return
    }
    mutate(parsedValues.data)
  }
  if (isError) return <div>{error.message}</div>
  return (
    <form
      className="grid gap-2 grid-cols-1 bg-gray-800 inset-shadow-lg inset-shadow-gray-800 rounded-md p-2 md:p-4 md:pt-1"
      onSubmit={onSubmit}
    >
      <FormField
        helpText="Seu nome para exibição na plataforma, pode ser alterado a qualquer momento."
        label="Nome"
        name="name"
        DefaultValue={userSettings?.name || ''}
        type="text"
        unit=""
        isLoading={isPending}
        disabled={false}
      />
      <FormField
        helpText=""
        label="Email"
        name="email"
        isBlur
        DefaultValue={userSettings?.email || ''}
        type="text"
        unit=""
        isLoading={isPending}
        disabled={true}
      />
      <FormField
        helpText=""
        label="Username"
        name="username"
        DefaultValue={userSettings?.username || ''}
        type="text"
        unit=""
        isBlur
        isLoading={isPending}
        disabled={false}
      />
      <FormField
        helpText="Seu nível de assinatura atual na plataforma. Assine para desbloquear mais recursos."
        label="Plano"
        name="plan"
        DefaultValue={userSettings?.plan || ''}
        type="text"
        unit=""
        isLoading={isPending}
        disabled={true}
      />
      <div className="flex flex-row justify-end items-end p-3 md:p-0">
        <button
          type="submit"
          className="transition-all text-base hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer 
          pt-2 pb-1 md:py-2 px-2 md:px-3 md:w-20 rounded-md text-center mt-2 scale-110"
          disabled={isPending || isError}
        >
          {!isPending && <span>Salvar</span>}
          {isPending && <span>Loading...</span>}
        </button>
      </div>
    </form>
  )
}

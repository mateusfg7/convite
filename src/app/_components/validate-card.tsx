'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { validateCode } from '~/lib/validate-code'

export function ValidateCard({
  onValidate,
}: {
  onValidate: (code: string | undefined) => void
}) {
  const [code, setCode] = useState('')

  function handleSubmit() {
    toast.promise(() => validateCode(code), {
      loading: 'Confirmando convite...',
      success: () => {
        setCode('')
        onValidate(code)

        return 'Presença confirmada!'
      },
      error: (err) => err.message,
    })
  }

  return (
    <Card className='max-w-[400px] w-full'>
      <CardHeader className='flex flex-wrap items-center justify-between'>
        <CardTitle>BrSuper</CardTitle>
        <CardDescription>Confirmação de presença</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Label>Código do convite</Label>
        <Input
          placeholder='D6H4X'
          className='text-center'
          value={code}
          onChange={(e) => {
            const { value } = e.target
            if (value.length <= 6) {
              setCode(value.trim().toUpperCase())
            }
          }}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className='w-full hover:cursor-pointer hover:bg-green-600'
        >
          <span>Confirmar presença</span>
          <Check />
        </Button>
      </CardFooter>
    </Card>
  )
}

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
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { validateCode } from '~/lib/validate-code'

import { CustomCardHeader } from './card-header'
import { useRouter } from 'next/navigation'

export function ValidateCard() {
  const [code, setCode] = useState('')

  const router = useRouter()

  function handleSubmit() {
    toast.promise(() => validateCode(code), {
      loading: 'Confirmando convite...',
      success: () => {
        setCode('')

        router.push(`/${code}`)

        return 'Convite validado!'
      },
      error: (err) => err.message,
    })
  }

  return (
    <Card className='max-w-[400px] w-full z-50 bg-card/70'>
      <CustomCardHeader>
        <CardDescription>Confirmação de presença</CardDescription>
      </CustomCardHeader>
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
        <Button onClick={handleSubmit} className='w-full hover:cursor-pointer'>
          <span>Validar convite</span>
          <Check />
        </Button>
      </CardFooter>
    </Card>
  )
}

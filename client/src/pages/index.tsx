import React, { useEffect } from 'react'
import { useRouter } from "next/router"
import { getCookie } from "@/layouts/AuthLayout"

export default function HomePage() {
  const router = useRouter()

  useEffect( () => {
    (getCookie('refreshToken')) ? router.push('/main/profile') : router.push('/auth/sign-in')
  }, [router])
}

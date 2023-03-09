import React, { useEffect } from 'react'
import { useRouter } from "next/router"

export default function HomePage() {
  const router = useRouter()

  useEffect( () => {
    (!localStorage.getItem('token')) ? router.push('/auth/sign-in') : router.push('/main/profile')
  }, [router])
}

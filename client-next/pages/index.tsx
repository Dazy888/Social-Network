import React, { useEffect } from 'react'
import { useRouter } from "next/router"

export default function HomePage() {
  const router = useRouter()

  useEffect( () => {
    if (!localStorage.getItem('token')) router.push('/login/sign-in')
  }, [])
}
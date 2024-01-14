import React from "react"
import Link from "next/link"

interface Props {
    question: string
    linkText: string
    path: 'in' | 'up'
}

export const Subtitle: React.FC<Props> = ({ linkText, question, path}) => (
    <>
        {question}? <Link className={'relative'} href={`/auth/sign-${path}`}>{linkText} here</Link>
    </>
)

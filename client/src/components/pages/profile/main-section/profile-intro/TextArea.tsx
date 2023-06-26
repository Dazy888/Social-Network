import React, { useRef } from "react"
import styles from "@/styles/Profile.module.scss"
import { UseFormRegister } from "react-hook-form"
import { ProfileIntroProps } from "@/models/profile.models"

interface Props {
    register: UseFormRegister<Pick<ProfileIntroProps, 'text'>>
}

const TextAreaComponent: React.FC<Props> = ({ register }) => {
    const divRef = useRef<HTMLDivElement | null>(null)

    return(
        <div ref={divRef} className={`${styles['gradient-border']} flex-center relative`} onFocus={() => divRef.current?.classList.add(styles['run-animation'])}
             onBlur={() => divRef.current?.classList.remove(styles['run-animation'])}>
            <textarea className={`w-full h-full px-2.5 py-3 text-black text-sm`} maxLength={150} {...(register('text'))}/>
        </div>
    )
}

export const TextArea = React.memo(TextAreaComponent)

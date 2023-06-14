import React from "react"
import styles from "@/styles/Authorization.module.scss"

interface Props {
    passInpType: 'password' | 'text'
    setPassInpType: (type: 'password' | 'text') => void
}

const AuthCheckboxComponent: React.FC<Props> = ({ setPassInpType, passInpType}) => (
    <div className={`${styles['auth__checkbox']} flex items-center mb-7`}>
        <input className={'mr-2.5'} onClick={() => ((passInpType === 'password') ? setPassInpType('text') : setPassInpType('password'))} name={'show-pass'} type={'checkbox'}/>
        <label>Show password</label>
    </div>
)

export const AuthCheckbox = React.memo(AuthCheckboxComponent)

import React from "react"
import { SetFieldValue } from "react-hook-form"

type PropsType = {
    label: string
    name: string
    register: any
    setValue: SetFieldValue<any>
    currentValue: string
}

export function InputFile({ name, label, register, setValue, currentValue }: PropsType) {
    return(
        <div className={'box'}>
            <label>{label}</label>
            <input {...(register(name))} type="file" onChange={(event: any) => {setValue(name, event.currentTarget.files[0])}} />
            <div className={'circle flex-property-set_center'}>
                <i className="fa-solid fa-upload"></i>
            </div>
            <span className={'photo-name'}>{currentValue}</span>
        </div>
    )
}
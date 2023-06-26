import React, { RefObject, useRef } from "react"
import styles from '@/styles/Settings.module.scss'

interface Props {
    label: 'Avatar' | 'Banner'
    uploadImage: (image: File | undefined) => void
    uploadedImage: string | undefined
}

export const FileInputComponent: React.FC<Props> = ({ label, uploadImage, uploadedImage }) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null)

    function changeListener(e: any) {
        const file = e.target.files[0]

        if (file) {
            uploadImage(file)
            e.target.value = null
            e.target.type = 'text'
            e.target.type = 'file'
        }
    }

    function clickHandler() {
        if (inputRef.current) inputRef.current.click()
    }

    return(
        <div>
            <label className={'block relative cursor-pointer'}>
                <button onClick={clickHandler} type={'button'} className={`z-10 absolute w-full tracking-wide text-base mui-btn-color block text-center text-white py-2 rounded-md ${styles['upload-btn']}`}>
                    <span>Upload {label}</span>
                </button>
                <input ref={inputRef} className={'w-full h-full opacity-0 left-0 absolute top-0'} type={'file'} onChange={(e) => changeListener(e)} />
            </label>
            {/*{(uploadedImage) &&*/}
            {/*    <div className={'text-center'}>*/}
            {/*        <span className={'leading-7'}>{uploadedImage}</span>*/}
            {/*        <i onClick={() => uploadImage(undefined)} className={'fa-solid fa-trash block text-red ml-2 cursor-pointer font-semibold'} />*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    )
}

export const FileInput = React.memo(FileInputComponent)

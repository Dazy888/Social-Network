import React from "react"
import { Button } from "@mui/material"

interface Props {
    label: 'Avatar' | 'Banner'
    uploadImage: (image: File | undefined) => void
    uploadedImage: string | undefined
}

export const FileInputComponent: React.FC<Props> = ({ label, uploadImage, uploadedImage }) => {
    function changeListener(e: any) {
        const file = e.target.files[0]

        if (file) {
            uploadImage(file)
            e.target.value = null
            e.target.type = 'text'
            e.target.type = 'file'
        }
    }

    return(
        <div className={'w-1/2'}>
            <Button variant={'contained'} component={'label'} className={'tracking-wide text-sm w-44 mui-btn-color mx-auto block text-center'}>
                Upload {label} <input onClick={(e: any) => e.target.value = null} onChange={(e) => changeListener(e)} type={'file'} hidden />
            </Button>
            {(uploadedImage) &&
                <div className={'text-center'}>
                    <span className={'leading-7'}>{uploadedImage}</span>
                    <i onClick={() => uploadImage(undefined)} className={'fa-solid fa-trash block text-red ml-2 cursor-pointer font-semibold'} />
                </div>
            }
        </div>
    )
}

export const FileInput = React.memo(FileInputComponent)

import React from "react"

interface IProps {
    isLoading: boolean
}

const SubmitBtnComponent: React.FC<IProps> = ({ isLoading }) => <button disabled={isLoading} className={`h-9 block text-sm font-semibold rounded-lg mx-auto py-1 px-4 text-white`}>Submit</button>
export const SubmitBtn = React.memo(SubmitBtnComponent)

type PropsType = {
    message: string
}

export function SuccessMessage({ message }: PropsType) {
    return(
        <div>
            <span className={'message'}>{message} <br/> <i className="fa-solid fa-circle-check"></i></span>
        </div>
    )
}
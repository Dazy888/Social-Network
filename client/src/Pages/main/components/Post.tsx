import React from "react"

type PropsType = {
    avatar: string
    name: string
    date: number
    text: string
}

export default React.memo(function Post({avatar, name, date, text}: PropsType) {
    let time

    if (Math.round(date / 1000 / 60) < 60) {
        time = `${Math.round(date / 1000 / 60)} minutes ago`
    }
    // console.log(Math.round(date / 1000 / 60))

    return(
        <div className={'post'}>
            <div className={'post__header flex-property-set_between'}>
                <div className={'post__user flex-property-set_between'}>
                    <img alt={'avatar'} src={avatar}/>
                    <div className={'post__information'}>
                        <h3 className={'title'}>{name}</h3>
                        <p className={'text'}>{time}</p>
                    </div>
                </div>
                <button className={'post__delete'}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
            <p className={'post__text'}>{text}</p>
            <hr className={'line'}/>
        </div>
    )
})
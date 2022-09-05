import {Header} from "./components/Header";
import {SideBar} from "./components/Side-Bar";
import {Content} from "./components/Content";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {getAuthStatus} from "../../store/reducers/auth-selectors";
import {useNavigate} from "react-router-dom";

type PropsType = {
    logout: () => any
    userName: string
}

export function MainPage({logout, userName}: PropsType) {
    const isAuth = useSelector(getAuthStatus)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) navigate('/login/sign-in')
    }, [isAuth])



    function escape() {
        logout()
    }

    return(
        <div id={'app-wrapper'}>
            <h1>Hello {userName}</h1>
            <button onClick={escape}>Logout</button>
            <Header />
            <SideBar />
            <Content />
        </div>
    )
}
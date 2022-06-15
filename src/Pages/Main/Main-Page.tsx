import {Header} from "../../Components/Header";
import {SideBar} from "../../Components/Side-Bar";
import {Content} from "../../Components/Content";
import React from "react";

export function MainPage() {
    return(
        <div id={'app-wrapper'}>
            <Header />
            <SideBar />
            <Content />
        </div>
    )
}
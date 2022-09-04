import {Header} from "./components/Header";
import {SideBar} from "./components/Side-Bar";
import {Content} from "./components/Content";
import React from "react";

export function MainPage() {
    return(
        <div id={'app-wrapper'}>
            <h1>User Hello</h1>
            <Header />
            <SideBar />
            <Content />
        </div>
    )
}
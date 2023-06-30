import React from "react"
import styles from '@/styles/Settings.module.scss'
import { LayoutProps } from "@/models/layouts.models"
import { MainLayout } from "@/layouts/MainLayout"
import { NavLink } from "@/components/common/NavLink"

const SettingsLayoutComponent: React.FC<LayoutProps> = ({ children, title }) => (
    <MainLayout title={title}>
        <section id={styles.settings} className={'w-full'}>
            <div className={`${styles.container} flex gap-10 mx-auto`}>
                <nav className={'flex-center text-white font-medium text-xl'}>
                    <ul className={'grid gap-5'}>
                        <NavLink iconClass={null} activeClass={styles.active} text={'Password settings'} path={'/settings/change-pass'}/>
                        <NavLink iconClass={null} activeClass={styles.active} text={'E-mail settings'} path={'/settings/activate'}/>
                        <NavLink iconClass={null} activeClass={styles.active} text={'Profile settings'} path={'/settings/profile'}/>
                    </ul>
                </nav>
                <div className={styles.content}>{children}</div>
            </div>
        </section>
    </MainLayout>
)

export const SettingsLayout = React.memo(SettingsLayoutComponent)

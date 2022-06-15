import React, {useState} from "react"
import './Login.css'
import {Field, Form, Formik} from "formik";

export function LoginPage() {
    let [action, setAction] = useState<'login' | 'register'>('login')
    const actions: any = React.createRef()

    function choseAction(e: any) {
        console.log(document.querySelector('button'))
        if (actions.current.querySelector('.active-action')) actions.current.querySelector('.active-action').classList.remove('active-action')
        e.target.classList.add('active-action')
    }

    function submit(values: any) {
        console.log(1)
    }

    return (
        <div id={'login-wrapper'}>
            <div className={'login'}>
                <div onClick={choseAction} className={'login__actions'} ref={actions}>
                    <button className={'actions__login'} onClick={() => setAction('login')}>
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    </button>
                    <button className={'actions__register'} onClick={() => setAction('register')}>
                        <i className="fa-solid fa-address-card"></i>
                    </button>
                </div>
                <div className={'login__content'}>
                    {action === 'login'
                        ? (
                            <Formik initialValues={{email: ''}} onSubmit={submit}>
                                {({ errors, touched }: any) => (
                                    <Form>
                                        <div className={'error-container'}>
                                            <Field className={'content__email'} name={'email'} type={'email'} placeholder={'Your Email'} validate={emailField} />
                                            {errors.email && touched.email ? <i className="fa-solid fa-circle-exclamation error"></i> : null}
                                        </div>
                                        <div className={'error-container'}>
                                            <Field className={'content__password'} name={'password'} type={'password'} placeholder={'Your Password'} validate={requiredField} />
                                            {errors.password && touched.password ? <i className="fa-solid fa-circle-exclamation error"></i> : null}
                                        </div>
                                        <div className={'content__remember'}>
                                            <Field className={'remember__input'} name={'remember'} type={'checkbox'} />
                                            <label>Remember Me</label>
                                        </div>
                                        <Field className={'content__submit'} name={'submit'} type={'submit'} value={'Login'} />
                                    </Form>
                                )}
                            </Formik>
                        )
                        : (
                            <div className={'login__register'}>
                                <h1 className={'register__title'}>You must register on this website because I am using a free API</h1>
                                <a href={'https://social-network.samuraijs.com'} className={'register__link'}>Register</a>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

function emailField(value: string) {
    if (!/@/g.test(value)) return true
    return undefined
}

function requiredField(value: string) {
    if (!value) return true
    return undefined
}
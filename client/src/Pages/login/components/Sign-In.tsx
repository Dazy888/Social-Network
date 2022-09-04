import {Field, Form, Formik} from "formik";
import React from "react";

type PropsType = {
    validate: (values: FormValues) => Object
    login: (email: string, password: string, rememberMe: boolean) => void
    navigate: (path: string) => void
}

type FormValues = {
    email: string
    password: string
    rememberMe: boolean
}

export function SignIn({login, navigate}: PropsType) {
    function submit(values: FormValues) {
        // login(values.email, values.password)
        navigate('/')
    }

    return(
        <Formik initialValues={{email: '', password: '', rememberMe: false}} onSubmit={submit}>
            {({ errors, touched }: any) => (
                <Form>
                    <div className={'error-container'}>
                        <Field className={`${errors.email && touched.email ? 'red-border' : ''}`} name={'email'} type={'email'} placeholder={'Your Email'}/>
                        {errors.email && touched.email ? <i className="fa-solid fa-circle-exclamation error"></i> : null}
                    </div>
                    <div className={'error-container'}>
                        <Field className={`${errors.password && touched.password ? 'red-border' : ''}`} name={'password'} type={'password'} placeholder={'Your Password'} />
                        {errors.password && touched.password ? <i className="fa-solid fa-circle-exclamation error"></i> : null}
                    </div>
                    <div className={'content__checkbox'}>
                        <Field className={'checkbox__input'} name={'rememberMe'} type={'checkbox'} />
                        <label>Remember Me</label>
                    </div>
                    <Field className={'content__submit'} name={'submit'} type={'submit'} value={'Sign in'} />
                </Form>
            )}
        </Formik>
    )
}
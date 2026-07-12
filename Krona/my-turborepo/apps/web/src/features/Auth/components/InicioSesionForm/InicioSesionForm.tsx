// features/Auth/components/LoginForm/LoginForm.tsx
"use client"

import style from '../card/AuthCard.module.css'
import { FormEvent } from 'react'
import Image from 'next/image'
import AuthCard from '../card/AuthCard'

const emisario_formulario_login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Login enviado')
}

export default function InicioSesionForm() {
    return (
        <AuthCard>
            <form className={style.formulario} onSubmit={emisario_formulario_login}>
                <Image
                    src="/KronaLogo.jpg"
                    alt="Logo Krona"
                    className={style.logo}
                    width={100}
                    height={100}
                />
                <h2 className={style.titulo}>Inicia sesión</h2>

                <div className={style.divinputs}>
                    <label htmlFor="email" className={style.label}>Correo</label>
                    <input type='email' id='email' className={style.input} required />
                </div>

                <div className={style.divinputs}>
                    <label htmlFor="contrasena" className={style.label}>Contraseña</label>
                    <input type='password' id='contrasena' className={style.input} required />
                </div>

                <button type='submit' className={style.boton_submit}>
                    Iniciar sesión
                </button>
            </form>
        </AuthCard>
    )
}
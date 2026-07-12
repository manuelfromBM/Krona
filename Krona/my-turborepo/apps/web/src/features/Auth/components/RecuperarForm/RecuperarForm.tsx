// features/Auth/components/RecoverPasswordForm/RecoverPasswordForm.tsx
"use client"

import style from '../card/AuthCard.module.css'
import { FormEvent } from 'react'
import Image from 'next/image'
import AuthCard from '../card/AuthCard'

const emisario_formulario_recuperar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Solicitud de recuperación enviada')
}

export default function RecuperarContrasenaForm() {
    return (
        <AuthCard>
            <form className={style.formulario} onSubmit={emisario_formulario_recuperar}>
                <Image
                    src="/KronaLogo.jpg"
                    alt="Logo Krona"
                    className={style.logo}
                    width={100}
                    height={100}
                />
                <h2 className={style.titulo}>Recuperar contraseña</h2>

                <p className={style.subtitulo}>
                    Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
                </p>

                <div className={style.divinputs}>
                    <label htmlFor="email" className={style.label}>Correo</label>
                    <input
                        type='email'
                        id='email'
                        className={style.input}
                        placeholder='ejemplo@correo.com'
                        required
                    />
                </div>

                <button type='submit' className={style.boton_submit}>
                    Enviar instrucciones
                </button>
            </form>
        </AuthCard>
    )
}
// features/Auth/components/LoginForm/LoginForm.tsx
"use client"

import style from '../card/AuthCard.module.css'
import { FormEvent, useState } from 'react'
import Image from 'next/image'
import AuthCard from '../card/AuthCard'
import { useAuth } from '../../hooks/useAuth'

export default function InicioSesionForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, loading, error } = useAuth()

    const emisario_formulario_login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await login({ email, password })
        if (result) {
            // TODO: redirigir o actualizar estado global
            console.log("Login exitoso:", result)
        }
    }

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

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className={style.divinputs}>
                    <label htmlFor="email" className={style.label}>Correo</label>
                    <input
                        type='email'
                        id='email'
                        className={style.input}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={style.divinputs}>
                    <label htmlFor="contrasena" className={style.label}>Contraseña</label>
                    <input
                        type='password'
                        id='contrasena'
                        className={style.input}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type='submit' className={style.boton_submit} disabled={loading}>
                    {loading ? "Iniciando..." : "Iniciar sesión"}
                </button>
            </form>
        </AuthCard>
    )
}

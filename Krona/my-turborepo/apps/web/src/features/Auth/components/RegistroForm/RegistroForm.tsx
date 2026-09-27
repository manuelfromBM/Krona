// features/Auth/components/RegisterForm/RegisterForm.tsx
"use client"

import style from '../card/AuthCard.module.css'
import { FormEvent, useState } from 'react'
import Image from 'next/image'
import AuthCard from '../card/AuthCard'
import { useAuth } from '../../hooks/useAuth'

export default function RegistroForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formError, setFormError] = useState<string | null>(null)
    const { register, loading, error } = useAuth()

    const emisario_formulario_registro = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormError(null)

        if (password !== confirmPassword) {
            setFormError("Las contraseñas no coinciden")
            return
        }

        const result = await register({ name, email, password })
        if (result) {
            // TODO: redirigir o actualizar estado global
            console.log("Registro exitoso:", result)
        }
    }

    return (
        <AuthCard>
            <form className={style.formulario} onSubmit={emisario_formulario_registro}>
                <Image
                    src="/KronaLogo.jpg"
                    alt="Logo Krona"
                    className={style.logo}
                    width={100}
                    height={100}
                />
                <h2 className={style.titulo}>Registro</h2>

                {(formError || error) && <p style={{ color: "red" }}>{formError ?? error}</p>}

                <div className={style.divinputs}>
                    <label htmlFor="nombre" className={style.label}>Nombre</label>
                    <input
                        type='text'
                        id='nombre'
                        className={style.input}
                        placeholder='Tu nombre'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={style.divinputs}>
                    <label htmlFor="email" className={style.label}>Correo</label>
                    <input
                        type='email'
                        id='email'
                        className={style.input}
                        placeholder='ejemplo@correo.com'
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

                <div className={style.divinputs}>
                    <label htmlFor="repetir_contrasena" className={style.label}>Confirmar contraseña</label>
                    <input
                        type='password'
                        id='repetir_contrasena'
                        className={style.input}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type='submit' className={style.boton_submit} disabled={loading}>
                    {loading ? "Registrando..." : "Registrar"}
                </button>
            </form>
        </AuthCard>
    )
}
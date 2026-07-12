// features/Auth/components/card/AuthCard.tsx
"use client"

import style from './AuthCard.module.css'
import Image from 'next/image'
import { ReactNode } from 'react'

interface AuthCardProps {
    children: ReactNode
}

export default function AuthCard({ children }: AuthCardProps) {
    return (
        <div className={style.divpadre}>
            <div className={style.card_login}>

                {/* Panel lateral informativo */}
                <div className={style.panel_lateral}>

                    {/* Logo pequeño */}
                    <div className={style.panel_logo_wrapper}>
                        <Image
                            src="/KronaLogo.jpg"
                            alt="Krona"
                            className={style.panel_logo}
                            width={52}
                            height={52}
                        />
                    </div>

                    <h2 className={style.panel_headline}>
                        Conecta con servicios<br />
                        <span>locales, sin complicaciones.</span>
                    </h2>

                    <p className={style.panel_subtexto}>
                        Krona es la plataforma donde encuentras, agendas y pagas
                        servicios profesionales cerca de ti — o haces crecer tu
                        negocio si eres prestador.
                    </p>

                    <div className={style.panel_bullets}>
                        <div className={style.bullet}>
                            <div className={style.bullet_icono}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div className={style.bullet_texto}>
                                <strong>Agenda en tiempo real</strong>
                                Reserva con disponibilidad actualizada al instante
                            </div>
                        </div>

                        <div className={style.bullet}>
                            <div className={style.bullet_icono}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                            </div>
                            <div className={style.bullet_texto}>
                                <strong>Pagos integrados</strong>
                                Cobra o paga directamente desde la plataforma
                            </div>
                        </div>

                        <div className={style.bullet}>
                            <div className={style.bullet_icono}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className={style.bullet_texto}>
                                <strong>Servicios cerca de ti</strong>
                                Encuentra profesionales y pymes en tu zona
                            </div>
                        </div>
                    </div>

                    <div className={style.panel_divider}>
                        Más detalles en <strong>bmcodelab.cl</strong>
                    </div>
                </div>

                {/* Contenido variable: registro / login / recuperar contraseña */}
                {children}

            </div>
        </div>
    )
}
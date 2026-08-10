"use client"
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import SidebarButton from "../../ui/SidebarButton/SidebarButton";
import KronaLogo from "../../ui/KronaLogo/KronaLogo";
import Link from "next/link";
import { Home, Compass, Calendar, Store, MessageCircle, Bell, BarChart2, Megaphone, Settings, Rocket } from "lucide-react";

export default function Sidebar () {
    return (
        <aside className={styles.sidebar}>

            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <KronaLogo/>
                </div>    
            </div>
            

            {/*NAV PRINCIPAL*/}
            <nav className={styles.menu}>
                <SidebarButton icon={<Home />}          label="inicio"          href="/Inicio"></SidebarButton>
                <SidebarButton icon={<Compass />}       label="Descubrir"       href="/buscar"></SidebarButton>
                <SidebarButton icon={<Calendar />}      label="Agenda"          href="/agenda"></SidebarButton>
                <SidebarButton icon={<Store />}         label="Mis Negocios"    href="/negocios"></SidebarButton>

                <div className={styles.divider}></div>


                <SidebarButton icon={<MessageCircle />} label="Mensajes"        href="/mensajes" />
                <SidebarButton icon={<Bell />}          label="Notificaciones"  href="/notificaciones" />

                <div className={styles.divider}></div>
        
                <SidebarButton icon={<BarChart2/>}    label="Estadisticas"      href="/estadisticas"/>
                <SidebarButton icon={<Megaphone />}   label="Promociones"       href="/promociones"/>
                <SidebarButton icon={<Settings />}  label="Configuración" href="/configuracion" />
            </nav>

            {/* Banner */}
            <div className={styles.banner}>
                <h4><Rocket size={13} /> Haz crecer tu negocio</h4>
                <p>Publica tu servicio, recibe más clientes y lleva tu negocio al siguiente nivel.</p>
                <Link href="/planes" className={styles.bannerBtn}>Ver planes</Link>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                KRONA © 2024 · Hecho en Chile 🇨🇱
            </div>

        </aside>
    );
}
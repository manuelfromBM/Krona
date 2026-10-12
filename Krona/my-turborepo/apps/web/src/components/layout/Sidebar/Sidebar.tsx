import styles from "./Sidebar.module.css";
import SidebarButton from "../../ui/SidebarButton/SidebarButton";
import { House, Search,  MessageCircle, Heart, PlusSquare, User,} from "lucide-react";
import KronaLogo from "../../ui/KronaLogo/KronaLogo";

export default function Sidebar () {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <KronaLogo/>
                </div>    
            </div>
            

            <nav className={styles.menu}>
                <SidebarButton icon={<House />} label="inicio" href="/free"></SidebarButton>
                <SidebarButton icon={<Search />} label="Buscar" href="/buscar"></SidebarButton>

                <SidebarButton
                    icon={<MessageCircle />}
                    label="Mensajes"
                    href="/mensajes"
                />
        
                <SidebarButton
                    icon={<Heart />}
                    label="Favoritos"
                    href="/favoritos"
                />
        
                <SidebarButton
                    icon={<PlusSquare />}
                    label="Crear"
                    href="/crear"
                />
        
                <SidebarButton
                    icon={<User />}
                    label="Perfil"
                    href="/perfil"
                />
        
            </nav>

        </aside>
    )
}
import Image from "next/image";
import styles from "./UserProfile.module.css";

// MAS ADELNATE ESTO VENDRA DEL CONTECTO DE AUTH
const mockUser = {
    username: "ealloporto",
    name: "Cristian San Martin",
    avatar: undefined as string | undefined,
    initials: "EA",
};

export const UserProfile = () => {
    return (
        <div className={styles.row}>
            <div className={styles.avatar}>
                {mockUser.avatar
                    ? <Image src={mockUser.avatar} alt={mockUser.username} fill style={{ objectFit:"cover"}}></Image>
                    : <span>{mockUser.initials}</span>
                }
            </div>

            <div className={styles.info}>
                <p className={styles.username}>{mockUser.username}</p>
                <p className={styles.name}>{mockUser.name}</p>
            </div>
            <button className={styles.switchBtn}>Cambiar</button>

        </div>
    );
};
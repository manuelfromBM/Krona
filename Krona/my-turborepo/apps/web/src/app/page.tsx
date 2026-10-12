import Sidebar from "../components/layout/Sidebar/Sidebar";
import FeedPage from "../features/Feed/FeedPage";

export default function pagePrincipal() {
    return (
        <main style={{display: "flex"}}>
            <Sidebar></Sidebar>

            <section style={{flex: 1, padding: "2rem"}}>
                
                <FeedPage></FeedPage>
            </section>
        </main>
    );
}
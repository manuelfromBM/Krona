import Sidebar from "../components/layout/Sidebar/Sidebar";

export default function pagePrincipal() {
    return (
        <main style={{display: "flex"}}>
            <Sidebar></Sidebar>

            <section style={{flex: 1, padding: "2rem"}}>
                <h1>Feed de Krona</h1>
            </section>
        </main>
    );
}
import { useRouter } from 'next/router';

interface User {
    id: number;
    name: string;
    email: string;
    job: string;
}

const Home = () => {
    const router = useRouter();
    const { id } = router.query;
    const { backendName } = router.query;

    // Esegui le operazioni necessarie con l'id, ad esempio, recupera i dati associati all'utente con quell'id.

    return (
        <div>
            {/* Contenuto della tua pagina home */}
            <p>ID dell'utente: {id}</p>
            <p>backendName: {backendName}</p>
        </div>
    );
};

export default Home;
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();
    const { id } = router.query;

    // Esegui le operazioni necessarie con l'id, ad esempio, recupera i dati associati all'utente con quell'id.

    return (
        <div>
            {/* Contenuto della tua pagina home */}
            <p>ID dell'utente: {id}</p>
        </div>
    );
};

export default Home;
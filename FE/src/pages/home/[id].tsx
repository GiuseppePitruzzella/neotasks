import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';

interface Card {
    id: number;
    name: string;
    email: string;
    job: string;
}

const Home: React.FC<{ card: Card }> = ({ card }) => {
    const router = useRouter();
    const { id, backendName, apiUrl, userData } = router.query;
    const user = JSON.parse(userData as string);

    const backgroundColors: { [key: string]: string } = {
        flask: 'bg-[#E0EAF5]',
    };

    const buttonColors: { [key: string]: string } = {
        flask: 'bg-[#E0EAF5] hover:bg-[#DEE6F0]',
    };

    // const [user, setUser] = useState<User | null>(null);

    // // Fetch Users
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/api/${backendName}/users/${id}`);
    //             console.log("OK: ", response.data)
    //             if (response.data) {
    //                 setUser({ 
    //                     id: response.data.id, 
    //                     name: response.data.name, 
    //                     email: response.data.email, 
    //                     job: response.data.job 
    //                 });
    //             }
    //         } catch (error) {
    //             console.error('Error Fetching Data: ', error);
    //         }
    //     };

    //     fetchData();
    // }, [id, backendName, apiUrl]);

    return (
        <div>
            {/* Contenuto della tua pagina home */}
            <p>ID: {user.id}</p>

            {/* Display Users */}
            
            {/* <div key={user.id} className={`flex items-center justify-between ${buttonColors} shadow-neo w-64 rounded-2xl hover:shadow-inner-neo`}>
                {user.id}
            </div> */}
            <div className="p-2">
                <h1 className="text-base font-sm leading-7 tracking-tight text-gray-800">{user.name}</h1>
                <p className="text-sm font-sm leading-6 text-gray-500">{user.job}</p>
            </div>
        </div>
    );
};

export default Home;
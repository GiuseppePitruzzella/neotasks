import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';
import UserCard from '../components/UserCard';

interface User {
    id: number;
    name: string;
    email: string;
    job: string;
}

interface Project {
    id: number;
    id_user: number;
    name: string;
    description: string;
}

const Home = () => {
    const router = useRouter();
    const { userData, backendName, apiUrl } = router.query;
    const user = JSON.parse(userData as string);

    const backgroundColors: { [key: string]: string } = {
        flask: 'bg-[#E0EAF5]',
    };

    const buttonColors: { [key: string]: string } = {
        flask: 'bg-[#E0EAF5] hover:bg-[#DEE6F0]',
    };

    const [projects, setProjects] = useState<Project[]>([]);
    // const [newUser, setNewUser] = useState({ name: '', email: '', job: '' });
    // const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '', job: '' });
    
    // Fetch Projects
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/${backendName}/projects`);
                console.log(response);
                setProjects(response.data.reverse());
            } catch (error) {
                console.error('Error Fetching Data: ', error);
            }
        };

        fetchData();
    }, [backendName, apiUrl]);
    

    return (
        <div className='p-12'>
            <UserCard card={user} />
            <div className='py-12'>
                {projects.map((project) => (
                    <div key={project.id} className={`flex items-center justify-between ${buttonColors} shadow-neo w-64 rounded-2xl hover:shadow-inner-neo`}>
                        <h1 className="text-base font-sm leading-7 tracking-tight text-gray-800">{project.name}</h1>
                        <p className="text-sm font-sm leading-6 text-gray-500">{project.description}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;
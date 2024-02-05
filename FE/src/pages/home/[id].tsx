import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';
import UserCard from '../components/UserCard';
import Pie from '../components/Pie';

import { User } from '../interfaces/UserInterface';
import { Project } from '../interfaces/ProjectInterface';

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
        <div className='px-12 py-12'>
            <UserCard card={user} />
            <Pie />
            <div className='flex'>
                {projects.map((project) => (
                    <div key={project.id} className={`flex ${buttonColors} shadow-neo w-64 h-64 mb-4 mx-4 rounded-2xl text-[#585E71] hover:shadow-inner-neo`}>
                        <div className='p-4'>
                            <div className="text-4xl font-semibold leading-12">{project.name}</div>
                            <div className="py-2 w-42 text-sm font-sm leading-6 text-gray-500">{project.description}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;
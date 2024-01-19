import React, { useState, useEffect } from "react";
import axios from 'axios';
import CardComponent from "./CardComponent";
import Caption from "./Caption";

import Link from 'next/link'
import { useRouter } from "next/router";

interface User {
    id: number;
    name: string;
    email: string;
    job: string;
}

interface UserInterfaceProps {
    backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
    const router = useRouter();
    // API Url
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    // Handle states of Users
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', job: '' });
    const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '', job: '' });

    const backgroundColors: { [key: string]: string } = {
        flask: 'bg-[#E0EAF5]',
    };

    const buttonColors: { [key: string]: string } = {
        flask: 'bg-[#E0EAF5] hover:bg-[#DEE6F0]',
    };

    const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
    const btnColor = buttonColors[backendName as keyof typeof backgroundColors] || 'bg-gray-500 hover:bg-gray-600'


    
    // Fetch Users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
                setUsers(response.data.reverse());
            } catch (error) {
                console.error('Error Fetching Data: ', error);
            }
        };

        fetchData();
    }, [backendName, apiUrl]);

    // Create User
    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/${backendName}/users`, newUser);
            setUsers([response.data, ...users]);
            setNewUser({ name: '', email: '', job: '' });
        } catch (error) {
            console.error("Error Creating User: ", error);
        }
    }

    // Update User
    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, { name: updateUser.name, email: updateUser.email });
            setUpdateUser({ id: '', name: '', email: '', job: '' });
            setUsers(
                users.map((user) => {
                    if (user.id === parseInt(updateUser.id))
                        return { ...user, name: updateUser.name, email: updateUser.email };
                    return user;
                })
            );
        } catch (error) {
            console.error("Error Updating User: ", error);
        }
    }

    // Delete User
    const deleteUser = async (userId: number) => {
        try {
            await axios.delete(`${apiUrl}/api/${backendName}/users/${userId}`);
            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Error Deleting User: ", error);
        }
    }

    return (
        <div className={`user-interface ${bgColor} ${backendName} w-full h-full p-4 my-4 rounded-2xl`}>
            <img src={`/logo.png`} alt={`${backendName} Logo`} className="w-80 h-80 mb-6 mx-auto" />
            {/* Create User */}
            <div>
                <form onSubmit={createUser} className="flex flex-col justify-center items-center space-y-4">
                    <input 
                        placeholder="Insert your name..." 
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className={`${bgColor} p-4 rounded-2xl shadow-neo`}
                    />
                    <input 
                        placeholder="Insert your email..." 
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className={`${bgColor} p-4 rounded-2xl shadow-neo`}
                    />
                    <input 
                        placeholder="Insert your job..." 
                        value={newUser.job}
                        onChange={(e) => setNewUser({ ...newUser, job: e.target.value })}
                        className={`${bgColor} p-4 rounded-2xl shadow-neo`}
                    />
                    <button type="submit" className={`${bgColor} p-2 w-52 rounded-2xl shadow-neo text-gray-400 hover:shadow-inner-neo`}>Add</button>
                </form>
            </div>

            {/* Display Users */}
            <div className="space-y-2">
                {users.map((user) => (
                    <div key={user.id} className={`flex items-center justify-between ${buttonColors} shadow-neo w-64 rounded-2xl hover:shadow-inner-neo`}>
                        <CardComponent card={user} />
                        <Link href={`/home/${user.id}`} passHref>
                            <div 
                                onClick={() => router.push({pathname: '/home/[id]', query: {id: user.id, backendName: backendName}}, `/home/${user.id}`)}
                                className={`${bgColor} p-2 mx-4 w-12 rounded-2xl shadow-neo text-gray-400 hover:shadow-inner-neo`}
                            >
                                Get
                            </div>
                        </Link>
                        
                        {/* <button onClick={() => deleteUser(user.id)} className={`w-24 h-16 mr-2 shadow-md bg-[#E5E5E3] rounded-2xl text-white hover:text-gray-300`}>Delete</button> */}
                    </div>
                ))}
            </div>

            {/* Caption */}
            <Caption />

        </div>
    );
};

export default UserInterface;
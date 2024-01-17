// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// import Link from 'next/link'
// import { useRouter } from "next/router";


// interface User {
//     id: number;
//     name: string;
//     email: string;
//     job: string;
// }

// interface UserInterfaceProps {
//     backendName: string;
// }

// const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
//     const { id } = useRouter().query;
    
//     const [users, setUsers] = useState<User[]>([]);
//     const [newUser, setNewUser] = useState({ name: '', email: '', job: '' });
//     const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '', job: '' });

//     const backgroundColors: { [key: string]: string } = {
//         flask: 'bg-[#E0EAF5]',
//     };

//     const buttonColors: { [key: string]: string } = {
//         flask: 'bg-[#E0EAF5] hover:bg-[#DEE6F0]',
//     };

//     const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
//     const btnColor = buttonColors[backendName as keyof typeof backgroundColors] || 'bg-gray-500 hover:bg-gray-600'

// ------------------------------------------------------------------------------------------
    
//     // Get User !!!
//     const getUser = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             const response = await axios.get(`${apiUrl}/api/${backendName}/users/${id}`);
//             setUpdateUser({ id: '', name: '', email: '', job: '' });
//             setUsers(
//                 users.map((user) => {
//                     if (user.id === parseInt(updateUser.id))
//                         return { ...user, name: updateUser.name, email: updateUser.email };
//                     return user;
//                 })
//             );
//         } catch (error) {
//             console.error("Error Updating User: ", error);
//         }
//     }

// ------------------------------------------------------------------------------------------

//     // // Create User
//     // const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     //     e.preventDefault();
//     //     try {
//     //         const response = await axios.post(`${apiUrl}/api/${backendName}/users`, newUser);
//     //         setUsers([response.data, ...users]);
//     //         setNewUser({ name: '', email: '', job: '' });
//     //     } catch (error) {
//     //         console.error("Error Creating User: ", error);
//     //     }
//     // }

//     // // Update User
//     // const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     //     e.preventDefault();
//     //     try {
//     //         const response = await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, { name: updateUser.name, email: updateUser.email });
//     //         setUpdateUser({ id: '', name: '', email: '', job: '' });
//     //         setUsers(
//     //             users.map((user) => {
//     //                 if (user.id === parseInt(updateUser.id))
//     //                     return { ...user, name: updateUser.name, email: updateUser.email };
//     //                 return user;
//     //             })
//     //         );
//     //     } catch (error) {
//     //         console.error("Error Updating User: ", error);
//     //     }
//     // }

//     // // Delete User
//     // const deleteUser = async (userId: number) => {
//     //     try {
//     //         await axios.delete(`${apiUrl}/api/${backendName}/users/${userId}`);
//     //         setUsers(users.filter((user) => user.id !== userId));
//     //     } catch (error) {
//     //         console.error("Error Deleting User: ", error);
//     //     }
//     // }

//     return (
//         <div className={`user-interface ${bgColor} ${backendName} w-full h-full p-4 my-4 rounded-2xl`}>
//             <img src={`/logo.png`} alt={`${backendName} Logo`} className="w-80 h-80 mb-6 mx-auto" />
//             <div className="p-2">
//                 <h1 className="text-base font-sm leading-7 tracking-tight text-gray-800">${user.id}</h1>
//                 <p className="text-sm font-sm leading-6 text-gray-500">${user.id}</p>
//             </div>

//         </div>
//     );
// };

// export default UserInterface;
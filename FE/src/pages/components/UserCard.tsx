import React from "react";

interface Card {
    id: number;
    name: string;
    email: string;
    job: string;
}

const UserCard: React.FC<{ card: Card }> = ({ card }) => {
    return (
        // <div>
        //     <h1 className="text-[#585e71]  text-gray-800">Hi 
        //     
        // </div>
        <div className="text-[#585E71]">
            <div className="text-4xl font-normal leading-12"> Hi
                <span className="font-bold"> {card.name}</span>
                <p className="py-2 text-xl font-sm leading-6 text-gray-500">{card.job}</p>
            </div>
        </div>

    );
};

export default UserCard;
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface UserCardProps {
    id: string;
    username: string;
    name: string;
    resume: string;
    phone: string;
    bio: string;
    currentUser: any;
}

const UserCard: React.FC<UserCardProps> = ({ id, username, name, resume, phone, bio, currentUser }) => {
    const isCurrentUser = currentUser?.id === id; 
    const formatPhoneNumber = (phone: string) => {
        if (!phone) return "";
        const cleaned = ("" + phone).replace(/\D/g, ""); 
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); 
        if (match) {
          return `(${match[1]})-${match[2]}-${match[3]}`;
        }
        return phone; 
      };

    if (!resume) return null;

    return (
        <div className="relative">
            <Link href={`/profile/${id}`}>
                <div className="group relative cursor-pointer mb-2 block h-68 overflow-hidden rounded-lg bg-gray-100 lg:mb-3 transition-opacity duration-300 hover:opacity-80">
                    <div className="absolute bottom-2 left-4">
                        <Link href={`/account/${id}`} className="flex bg-white w-fit items-center p-1 rounded-full">
                            <span className="hover:underline font-medium text-black mx-1.5"></span>
                        </Link>
                    </div>
                </div>
            </Link>

            <div className="rounded-lg border border-black p-4">
                <Link href={`/profile/${id}`}>
                    <h3 className="text-xl line-clamp-2 font-medium text-black-100">{name}</h3>
                </Link>
                <Link href={`/profile/${id}`}>
                    <span className="hover:underline font-medium text-black mx-1.5">{username}</span>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-black-200">Phone: {formatPhoneNumber(phone)}</p>
                
                {resume && (
                    <Link href={resume} target="_blank" className="text-blue-600 hover:underline">
                        View Resume
                    </Link>
                )}

                {isCurrentUser && (
                    <div className="absolute top-14 right-2 space-y-2">
                        <Link href={`/profile/edit`}>
                            <Image src="/assets/edit.svg" alt="Edit" width={20} height={20} className="cursor-pointer" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCard;

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Author {
    id: string;
    image: string;
    username: string;
    phone: string;
}

interface PostCardProps {
    id: string;
    author: Author;
    title: string;
    tags: string[];
    slug: string;
    description: string;
    text: string;
    createdAt: string;
    location: string;
    currentUser: any;  
    available: boolean; 
}

const PostCard: React.FC<PostCardProps> = ({ id, author, title, tags, text, location, description, currentUser, available }) => {
    const isCurrentUserAuthor = currentUser?.id === author?.id; 

    return (
        <div className="relative">
            <Link href={`/posts/${id}`}>
                <div className="group relative cursor-pointer mb-2 block h-68 overflow-hidden rounded-lg bg-gray-100 lg:mb-3 transition-opacity duration-300 hover:opacity-80">
                    <div className="absolute bottom-2 left-4">
                        <Link href={`/account/${author?.id}`} className="flex bg-white w-fit items-center p-1 rounded-full">
                            <span className="hover:underline font-medium text-black mx-1.5"></span>
                        </Link>
                    </div>
                </div>
            </Link>

            <div className='rounded-lg border border-black p-4'>
                <div className="mt-2 flex flex-wrap justify-center gap-2 md:gap-4" aria-label="Tags">
                    {tags?.map((tag: string) => (
                        <div
                            key={tag}
                            className="bg-primary-foreground py-1 px-2.5 md:py-2.5 md:px-4 text-black border border-black text-sm md:text-base font-medium md:font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer"
                        >
                            <span> {tag} </span>
                        </div>
                    ))}
                </div>
                <Link href={`/posts/${id}`}>
                    <h3 className="text-xl line-clamp-2 font-medium text-black-100">{title}</h3>
                </Link>
                <Link href={`/profile/${author?.id}`}>
                    <span className="hover:underline font-medium text-black mx-1.5">{author?.username}</span>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-black-200">{description}</p>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-black-200">{location}</p>

                <p className={`mt-2 text-sm ${available ? 'text-green-500' : 'text-red-500'}`}>
                    {available ? 'Available' : 'Unavailable'}
                </p>

                {isCurrentUserAuthor && (
                    <div className="absolute top-20 right-2 space-y-2">
                        <Link href={`/edit-post/${id}`}>
                            <Image src="/assets/edit.svg" alt="Edit" width={20} height={20} className="cursor-pointer" />
                        </Link>
                        <Link href={`/delete/${id}`}>
                            <Image src="/assets/delete.svg" alt="Delete" width={20} height={20} className="cursor-pointer" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;

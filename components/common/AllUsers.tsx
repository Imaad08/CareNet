import React from 'react';
import UserCard from '../cards/UserCard';
import { fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';  
import { Button } from "@/components/ui/button"; 

interface User {
    id: string;
    username: string;
    name: string;
    bio: string;
    resume: string;
    phone: string;
}

interface FetchUsersResult {
    users: User[];
}

const AllUsers: React.FC = async () => {
    const loadMore = false;

    const result: FetchUsersResult = await fetchUsers({ userId: "", pageSize: 9 });

    const userInfo = await currentUser();

    return (
        <div className='bg-white'>
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="flex items-center py-6 md:py-16 space-y-4 md:space-y-1 space-x-3 md:space-x-4 flex-wrap">
                </div>

                {result.users.length === 0 ? (
                    <p className="text-center md:text-lg text-base text-gray-300">No Users Available ...</p>
                ) : (       
                    <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 xl:gap-12">
                        {result.users.map((user) => (
                            <UserCard
                                key={user.id}
                                id={user.id}
                                username={user.username}
                                name={user.name}
                                bio={user.bio}
                                resume={user.resume}
                                phone={user.phone}
                                currentUser={userInfo}  
                            />
                        ))}
                    </div>
                )}

                <center>
                    <Button size="lg" disabled={loadMore} className="my-8">
                        {loadMore ? (
                            <>
                                Loading More ...
                            </>
                        ) : (
                            <>Fetch More</>
                        )}
                    </Button>
                </center>
            </div>
        </div>
    );
}

export default AllUsers;

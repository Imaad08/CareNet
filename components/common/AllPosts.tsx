import React from 'react';
import PostCard from '../cards/PostCard';
import { fetchPosts } from '@/lib/actions/post.actions';
import { currentUser } from '@clerk/nextjs/server';  
import { Button } from "@/components/ui/button"; 

interface Author {
    id: string;
    image: string;
    username: string;
    phone: string;
}

const slugify = (str: string) =>
    (str || "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

interface Post {
    _id: string;
    title: string;
    author: Author;
    tags: string[];
    description: string;
    location: string;
    text: string;
    slug: string;
    createdAt: string;
    available: boolean;
}

interface FetchPostsResult {
    posts: Post[];
}

const AllPosts: React.FC = async () => {
    const loadMore = false;

    const result: FetchPostsResult = await fetchPosts(1, 9);

    const user = await currentUser();

    return (
        <div className='bg-white'>
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="flex items-center py-6 md:py-16 space-y-4 md:space-y-1 space-x-3 md:space-x-4 flex-wrap">
                </div>

                {result.posts.length === 0 ? (
                    <p className="text-center md:text-lg text-base text-gray-300">No Post Available ...</p>
                ) : (       
                    <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 xl:gap-12">
                        {result.posts.map((post) => (
                            <PostCard
                                key={post._id}
                                id={post._id}
                                title={post.title} 
                                author={post.author} 
                                tags={post.tags} 
                                text={post.text}
                                description={post.description} 
                                location={post.location}
                                available={post.available}
                                slug={slugify(post.title)} 
                                createdAt={post.createdAt} 
                                currentUser={user}  
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

export default AllPosts;

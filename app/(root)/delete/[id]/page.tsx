import DeletePost from '@/components/Forms/DeletePost';
import { deletePost, fetchPostById } from '@/lib/actions/post.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect, usePathname, useRouter } from "next/navigation";
import React from 'react';

interface PageProps {
    params: {
        id: string;
    };
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const user = await currentUser();

    if (!user) return null;

    const post = await fetchPostById(params?.id);

    return (
        <div>
            Delete blogs page
            <DeletePost 
                postId={post?.id}
                title={post?.title} 
            />
        </div>
    );
};

export default Page;
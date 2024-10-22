import CreatePost from '@/components/Forms/CreatePost';
import UpdatePost from '@/components/Forms/edit';
import { fetchPostById } from '@/lib/actions/post.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import React from 'react'

async function page({ params }: { params: { id: string } }) {


    const user = await currentUser();

    if(!user) return null;

    const post = await fetchPostById(params?.id)
    const userInfo = await fetchUser(user.id) ;

    const simpleData = {
        _id: userInfo._id.toString(), 
      };

    if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <div>
        <UpdatePost 
          userId={simpleData._id} 
          newTitle={post?.title} 
          newLocation={post?.location}
          newText={post?.text}
          newDescription={post?.description} 
          newAvailable={post?.available}
          newTags={post?.tags} 
          postId={post?.id} 
        />
    </div>
  )
}

export default page
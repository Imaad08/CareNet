import { fetchPostById, fetchPosts } from '@/lib/actions/post.actions';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import { fetchUser, fetchUserPosts } from '@/lib/actions/user.actions';
import Image from 'next/image';
import PostCard from '@/components/cards/PostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

interface Author {
    id: string;
    image: string;
    username: string;
    resume: string;
    phone: string;
}
const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    const cleaned = ("" + phone).replace(/\D/g, ""); 
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); 
    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`;
    }
    return phone;
  };
const slugify = (str: string) =>
    (str || "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
const Page: React.FC<PageProps> = async ({ params }) => {
  const user = await currentUser();

  if (!params?.id) return null;

  const userInfo = await fetchUser(params.id);
  const userPost = await fetchUserPosts(params.id);

  return (
    <div className='bg-primary-foreground'>
    <div className="mx-auto max-w-screen-lg md:px-4 px-2">
      <section className="py-4 sm:py-10 lg:pt-14">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src={'/assets/person.png'}
              alt="profile"
              width={112}
              height={112}
              className="w-32 mx-auto group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
            />
            <p className="mt-6 text-lg font-semibold text-black">
  {userInfo?.resume ? <strong>Caregiver</strong> : <strong>Normal User</strong>}
</p>
<p className="mt-2 text-lg font-semibold text-black flex items-center justify-center">
  {userInfo?.name}, <span className="font-normal text-black-600">{userInfo?.username}</span>
  
  {user?.id === userInfo?.id && (
    <Link href="/profile/edit" passHref>
      <Image
        src="/assets/edit.svg"
        alt="Edit profile"
        width={20}
        height={20}
        className="ml-2 cursor-pointer"
      />
    </Link>
  )}
</p>

            
            {userInfo?.resume && (
              <Link href={userInfo.resume} passHref>
                <span className="font-normal text-blue-600 underline">
                  Resume
                </span>
              </Link>
            )}
            <p className="mt-6 text-lg font-semibold text-black">
              Phone Number: <span className="font-normal text-black-600">{formatPhoneNumber(userInfo?.phone)}</span>
            </p>
            <p className="mt-12 text-lg font-semibold text-black">
            Bio
            </p>
          <p className="mt-2 text-black-200">{userInfo?.bio}</p>
          <div className="mb-2 mt-20 md:mb-10">
        <h2 className="mb-8 text-xl font-semibold text-black-200 md:mb-6 lg:text-2xl">Users Posts</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 xl:gap-12 mb-16">
        {userPost.posts.map((post: { _id: string; title: string; author: Author; tags: string[]; text: string; description: string; location: string; available: boolean; createdAt: string }) => (
          <PostCard
          key={post._id}
          id={post._id}
          title={post.title} 
          author={post.author} 
          tags={post.tags} 
          text={post.text}
          description={post.description} 
          location={post.location}
          slug={slugify(post.title)} 
          createdAt={post.createdAt} 
          available={post.available}
          currentUser={user}
      />
        ))}
      </div>
          </div>
          
        </div>
      </section>


    </div>
    </div>
  );
};

export default Page;

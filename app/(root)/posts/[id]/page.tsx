import PostCard from '@/components/cards/PostCard';
import { fetchPostById, fetchPosts } from '@/lib/actions/post.actions';
import { currentUser } from "@clerk/nextjs/server";
import React from 'react';
import moment from 'moment';
import { fetchUser } from "@/lib/actions/user.actions";
import Link from 'next/link';
import Display from '@/components/cards/display';
import NotifyButton from '@/components/common/NotifyButton';

interface Params {
    id: string;
}

async function page({ params }: { params: Params }) {
    const result = await fetchPosts(1, 3);
    const post = await fetchPostById(params?.id);
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(user.id);
    const info = await fetchUser(post?.author.id);

    return (
        <main>
            <div className='bg-primary-foreground'>
                <article>
                    <section className="mx-auto max-w-5xl px-1 pt-24 pb-16 bg-primary-foreground text-center">
                        <p className="text-black-200 pt-1">
                            Published {moment(post?.createdAt).format('LL')}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-black sm:text-5xl pb-2">
                            {post?.title}
                        </h1>
                        <Display 
                        author={post.author}
                        />
                        <Link href={`/profile/${post?.author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                View Author
              </h4>
            </Link>

                        <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-4" aria-label="Tags">
                            {post?.tags.map((tag: string) => (
                                <div
                                    key={tag}
                                    className="bg-primary-foreground py-1 px-2.5 md:py-2.5 md:px-4 text-black border border-black text-sm md:text-base font-medium md:font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer"
                                >
                                    <span> {tag} </span>
                                </div>
                            ))}
                        </div>
                    </section>


                    <div className="mx-auto mt-10 px-2 md:px-4 max-w-screen-lg space-y-12 py-10 font-serif text-lg tracking-wide text-black-100">
                        <p className='leading-8 tracking-wider'>
                            {post?.description}
                        </p>
                        <p className='leading-8 tracking-wider'>
                            {post?.text}
                        </p>
                        <p className='leading-8 tracking-wider'>
                            Location: {post?.location}
                        </p>
                    </div>
                    <div className="flex justify-center mb-6">
                        <NotifyButton
                            authorPhone={info?.phone}
                            personname={userInfo?.name}
                            postTitle={post?.title} 
                            resume={userInfo?.resume}
                            username={userInfo?.username}
                            userPhone={userInfo?.phone}
                            userId={userInfo?.id}
                            available={post?.available}
                        />
                    </div>
                    <br></br>
                </article>
            </div>

            <div className="w-fit mx-auto my-10 flex space-x-2">
                <div className="h-0.5 w-32 bg-black"></div>
                <div className="h-0.5 w-2 bgblack"></div>
            </div>

            {result.posts.length === 0 ? (
                <p className="text-center md:text-lg text-base text-black-300">
                    No Related Posts Found
                </p>
            ) : (
                <section className="mx-auto max-w-screen-lg px-3 pt-14 pb-16">
                    <div className="mb-2 md:mb-4">
                        <h2 className="mb-8 text-xl font-semibold text-black-200 md:mb-6 lg:text-2xl">
                            Related Listings
                        </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 xl:gap-12">
                        {result?.posts?.map((post) => (
                            <PostCard
                                key={post?._id}
                                id={post._id}
                                title={post.title}
                                author={post.author}
                                description={post.description}
                                location={post.location}
                                text={post.text}
                                tags={post.tags}
                                slug={post.slug}
                                createdAt={post.createdAt}
                                currentUser={user}
                                available={post.available}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default page;

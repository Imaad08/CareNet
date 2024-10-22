"use server";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

interface CreatePostParams {
  author: string;
  title: string;
  tags: string[];
  description: string;
  available: boolean;
  location: string;
  text: string;
  slug: string;
  path?: string;
}

interface UpdatePostParams extends CreatePostParams {
  postId: string;
}

interface DeletePostParams {
  postId: string;
}

export async function createPost({ author, title, tags, available, description, location, text, slug, path }: CreatePostParams) {
  try {
    await connectToDB();
    const createdPost = await Post.create({
      title,
      author,
      tags,
      description,
      available,
      location,
      text,
      slug,
    });

    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    throw new Error(`Failed to create post: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function fetchPosts(pageNumber: number = 1, pageSize: number = 20) {
  await connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = Post.find()
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    });

  const totalPostsCount = await Post.countDocuments();

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

export async function fetchPostById(postId: string) {
  await connectToDB();

  try {
    const post = await Post.findById(postId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name ",
      })
      .exec();

    return post;
  } catch (err) {
    console.error("Error while fetching post:", err);
    throw new Error("Unable to fetch post");
  }
}

export async function updatePost({ author, title, available, tags, description, location, text, postId, slug, path }: UpdatePostParams) {
  try {
    await connectToDB();

    await Post.findOneAndUpdate(
      { _id: postId },
      {
        title,
        author,
        tags,
        available,
        description,
        location,
        text,
        slug,
      },
      { upsert: true }
    );

    if (path === "/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    throw new Error(`Failed to update post: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function deletePost({ postId }: DeletePostParams) {
  try {
    await connectToDB();

    await Post.deleteOne({ _id: postId });
  } catch (error) {
    throw new Error(`Failed to delete post: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

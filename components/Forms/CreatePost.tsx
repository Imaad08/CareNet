"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createPost } from "@/lib/actions/post.actions";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import 'react-toastify/dist/ReactToastify.css';

interface UploadPostProps {
  userId: string; 
}

const CreatePost: React.FC<UploadPostProps> = ({ userId }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>(""); 
  const [text, setText] = useState<string>(""); 
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>(""); 
  const [location, setLocation] = useState<string>(""); 
  const [available, setAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const addTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag(""); 
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createPost({
        title: title,
        path: pathname,
        author: userId,
        description: description, 
        location: location, 
        tags: tags,
        slug: slugify(title),
        text: text, 
        available: available, 
      });

      toast.success("Post created successfully");

      setTimeout(() => {
        setLoading(false);
        if (pathname === "/post/edit") {
          router.back();
        } else {
          router.push("/posts");
        }
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto grid px-4 max-w-screen-md gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 pb-4">
          <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Post Title*</label>
          <input
            required
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-gray-600 transition duration-100 focus:ring"
          />
        </div>

        <div className="sm:col-span-2 pb-4">
          <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Post Tags*</label>
          <div className="flex items-center">
            <select
              name="tags"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-2/3 rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-black-600 transition duration-100 focus:ring"
            >
              <option value="">Select a tag...</option>
              <option value="babysitting">Babysitting</option>
              <option value="alzheimers">Alzheimer's</option>
              <option value="dementia">Dementia</option>
              <option value="other">Other</option>
            </select>
            <Button type='button' onClick={addTag} size='lg'>
              Add Tag
            </Button>
          </div>
          <ul className="mt-3">
            {tags.map((tag, index) => (
              <li key={index} className="flex mb-2 items-center text-black">
                <div className="bg-primary-foreground w-fit py-1 px-2.5 border border-black-100 md:py-2.5 md:px-4 text-black text-sm md:text-base font-medium md:font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer">
                  <span>{tag} </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-red-600 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 pb-4">
          <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Location*</label>
          <input
            name="location"
            onChange={(e) => setLocation(e.target.value)} 
            className="w-full rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-gray-600 transition duration-100 focus:ring"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Description*</label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)} 
            className="h-24 w-full rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-gray-600 transition duration-100 focus:ring"
          ></textarea>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Message*</label>
          <textarea
            name="message"
            onChange={(e) => setText(e.target.value)} 
            className="h-64 w-full rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-gray-600 transition duration-100 focus:ring"
          ></textarea>
        </div>

        <div className="sm:col-span-2 pb-4">
          <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Available</label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="rounded border border-[#121212] transition duration-100 focus:ring"
          />
        </div>

        <div className="flex items-center justify-between sm:col-span-2">
          <Button type="submit" size='lg'>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </>
  );
}

export default CreatePost;

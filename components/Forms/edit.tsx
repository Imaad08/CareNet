"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createPost, updatePost } from "@/lib/actions/post.actions";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";

interface UpdatePostProps {
    userId: string;
    postId: string;
    newTitle: string;
    newTags: string[];
    newDescription: string;
    newLocation: string;
    newText: string;
    newAvailable: boolean; 
}

const UpdatePost: React.FC<UpdatePostProps> = ({ userId, postId, newTitle, newTags, newDescription, newLocation, newText, newAvailable }) => {
    const [title, setTitle] = useState(newTitle);
    const [description, setDescription] = useState(newDescription);
    const [tags, setTags] = useState(newTags);
    const [tag, setTag] = useState('');
    const [location, setLocation] = useState(newLocation);
    const [text, setText] = useState(newText);
    const [available, setAvailable] = useState(newAvailable); 
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const addTag = () => {
        if (tag) {
            setTags([...tags, tag]);
            setTag(''); 
        }
    };

    const removeTag = (index: number) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updatePost({
                title: title,
                path: pathname,
                author: userId,
                description: description,
                location: location,
                text: text,
                tags: tags,
                postId: postId,
                slug: title.toLowerCase().replace(/ /g, '-'),
                available: available, 
            });

            toast.success('Post edited successfully');

            setTimeout(() => {
                setLoading(false);
                router.back();
            }, 2000);
        } catch (error) {
            toast.error(`Failed to edit post: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto grid px-4 max-w-screen-md gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 pb-4">
                    <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Edit Title*</label>
                    <input
                        required
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-gray-600 transition duration-100 focus:ring"
                    />
                </div>

                <div className="sm:col-span-2 pb-4">
                    <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Edit Tags*</label>
                    <div className="flex items-center">
                        <select
                            name="tags"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="w-2/3 rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-black-600 transition duration-100 focus:ring"
                        >
                            <option value="">Select a tag...</option>
                            <option value="babysitting">Babysitting</option>
                            <option value="alzheimers">Alzheimer's</option>
                            <option value="dementia">Dementia</option>
                            <option value="other">Other</option>
                        </select>
                        <Button onClick={addTag} size='lg'>
                            Add Tag
                        </Button>
                    </div>
                    <ul className="mt-3">
                        {tags.map((tag, index) => (
                            <li key={index} className="flex mb-2 items-center text-black">
                                <div className="bg-primary-foreground w-fit py-1 px-2.5 border border-black-100 md:py-2.5 md:px-4 text-black text-sm md:text-base font-medium md:font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer">
                                    <span>{tag}</span>
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
                    <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Edit Location*</label>
                    <input
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} 
                        className="w-full rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-gray-600 transition duration-100 focus:ring"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Edit Description*</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                        className="h-24 w-full rounded border bg-primary-foreground px-3 py-2 text-black-100 outline-none border-[#121212] ring-gray-600 transition duration-100 focus:ring"
                    ></textarea>
                </div>

                <div className="sm:col-span-2">
                    <label className="mb-2 inline-block text-sm text-black-300 sm:text-base">Edit Message*</label>
                    <textarea
                        name="message"
                        value={text}
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
                        {loading ? (
                            <>
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </form>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
        </>
    );
};

export default UpdatePost;

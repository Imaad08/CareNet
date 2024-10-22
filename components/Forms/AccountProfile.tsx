"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { UserValidation } from "@/lib/validation/user";
import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    resume: string;
    phone: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
      resume: user?.resume ? user.resume : "",
      phone: user?.phone ? user.phone : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {

    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      resume: values.resume,
      userId: user.id,
      bio: values.bio,
      phone: values.phone,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
    <form
      className='flex flex-col justify-start gap-10'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
        <FormItem className='flex w-full flex-col gap-3'>
          <FormLabel className='text-base-semibold text-light-2'>
            Name
          </FormLabel>
          <FormControl>
            <Input
            type='text'
            className='account-form_input no-focus'
            {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='username'
        render={({ field }) => (
        <FormItem className='flex w-full flex-col gap-3'>
          <FormLabel className='text-base-semibold text-light-2'>
            Username
          </FormLabel>
          <FormControl>
            <Input
            type='text'
            className='account-form_input no-focus'
            {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        )}
      />

<FormField
        control={form.control}
        name='phone'
        render={({ field }) => (
        <FormItem className='flex w-full flex-col gap-3'>
          <FormLabel className='text-base-semibold text-light-2'>
            Phone Number
          </FormLabel>
          <FormControl>
            <Input
            type='text'
            className='account-form_input no-focus'
            {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='bio'
        render={({ field }) => (
        <FormItem className='flex w-full flex-col gap-3'>
          <FormLabel className='text-base-semibold text-light-2'>
            Bio
          </FormLabel>
          <FormControl>
            <Textarea
            rows={10}
            className='account-form_input no-focus'
            {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='resume'
        render={({ field }) => (
        <FormItem className='flex w-full flex-col gap-3'>
          <FormLabel className='text-base-semibold text-light-2'>
            Caregiver Resume Link(For Caregivers ONLY)
          </FormLabel>
          <FormControl>
            <Input
            type='text'
            className='account-form_input no-focus'
            {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        )}
      />
      <Button type='submit' size='lg'>
        {btnTitle}
      </Button>
    </form>
    </Form>
  );
};

export default AccountProfile;
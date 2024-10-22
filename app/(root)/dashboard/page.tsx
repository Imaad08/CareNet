import React from 'react'
import { Button } from "@/components/ui/button"
import { Heart, User, FileText, LogOut } from "lucide-react"
import Link from "next/link"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
import { fetchUser } from '@/lib/actions/user.actions';

interface Params {
  id: string;
}

async function page({ params }: { params: Params }) {
  const userInfo = await currentUser();
  if (!userInfo) return null;

  const usersInfo = await fetchUser(userInfo.id) ;


    if (!usersInfo?.onboarded) redirect('/onboarding')

  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-primary-foreground">
    <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-8 text-center">
        Welcome to Your CareNet Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
        <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-md">
          <FileText className="h-12 w-12 text-primary" />
          <h2 className="text-2xl font-bold">Posts</h2>
          <p className="text-center text-muted-foreground">
            View and and create caregiver listings
          </p>
          <Button size="lg" asChild>
            <Link href="/posts">Go to Posts</Link>
          </Button>
        </div>
        <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-md">
          <User className="h-12 w-12 text-primary" />
          <h2 className="text-2xl font-bold">Profile</h2>
          <p className="text-center text-muted-foreground">
            View and Update your personal information
          </p>
          <Button size="lg" asChild>
            <Link href={`/profile/${userInfo?.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  </main>
  );
}

export default page;

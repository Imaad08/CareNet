import React from 'react'
import { Button } from "@/components/ui/button"
import { Heart, User, Search, Calendar, MessageSquare, Shield } from "lucide-react"
import Link from "next/link"

const page = () => {
    return (
        <main className="flex items-center justify-center min-h-screen py-12 md:py-24 lg:py-32 bg-primary-foreground">
            <div className="container px-4 md:px-6 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">
                    How to Use CareNet
                </h1>
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="bg-background p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">For Care Seekers</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-2">
                                <Search className="h-5 w-5 text-primary flex-shrink-0" />
                                <p>1. Create a listing for yourself or someone you know with relevent information</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-primary flex-shrink-0" />
                                <p>2. Review caregiver profiles, qualifications, and information.</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                                <p>3. Contact potential caregivers after recieving their info via the SMS system.</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                                <p>4. Coordinate with multiple caregivers if needed</p>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">For Caregivers</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-primary flex-shrink-0" />
                                <p>1. Create a detailed profile highlighting your skills and experience.</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Search className="h-5 w-5 text-primary flex-shrink-0" />
                                <p>2. Browse care requests that match your expertise and availability.</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                                <p>3. Communicate with potential clients as they message you after applying.</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                                <p>4. Manage your schedule and appointments efficiently.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 space-y-8">
                    <h2 className="text-2xl font-bold tracking-tighter">Key Features</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-background p-6 rounded-lg shadow-md">
                            <Shield className="h-8 w-8 text-primary mb-2 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
                            <p>Our platform ensures the safety and privacy of all users with verified profiles and secure messaging.</p>
                        </div>
                        <div className="bg-background p-6 rounded-lg shadow-md">
                            <MessageSquare className="h-8 w-8 text-primary mb-2 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Easy Communication</h3>
                            <p>Connect with caregivers or care seekers through our apply system that uses SMS.</p>
                        </div>
                        <div className="bg-background p-6 rounded-lg shadow-md">
                            <Calendar className="h-8 w-8 text-primary mb-2 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Scheduling</h3>
                            <p>List out your schedules so caregivers know what to expect.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold tracking-tighter mb-4">Ready to Get Started?</h2>
                    <Button size="lg" asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default page
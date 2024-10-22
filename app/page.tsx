import { Button } from "@/components/ui/button";
import { Heart, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary-foreground flex justify-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Connecting Hearts, Delivering Care
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CareNet brings together compassionate caregivers and those in need. From Alzheimer's and dementia care to infant care, we're here to help.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/guide">
                    <Button size="lg">
                      Get Started
                    </Button>
                    </Link>
                </div>
              </div>
              <img
                alt="Caregiver helping an elderly person"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="https://i.postimg.cc/50QCPf0g/carenethomeimg.webp"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How CareNet Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to find the right care or offer your caregiving services.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <Heart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Find Care</h3>
                <p className="text-muted-foreground">
                  Search for qualified caregivers in your area who specialize in the type of care you need.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <LogIn className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Offer Care</h3>
                <p className="text-muted-foreground">
                  Create a profile, showcase your skills, and connect with families who need your expertise.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <Info className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Stay Informed</h3>
                <p className="text-muted-foreground">
                  Access resources, tips, and support to ensure the best care for your loved ones or clients.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

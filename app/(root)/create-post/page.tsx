import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/Forms/CreatePost";
import { fetchUser } from "@/lib/actions/user.actions";
import Navbar from "@/components/common/navbar";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Create Post
              </h1>
            </div>

            <section className="mt-12 flex justify-center">
              <CreatePost userId={userInfo._id} />
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;

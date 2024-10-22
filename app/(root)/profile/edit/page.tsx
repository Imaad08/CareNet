import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/Forms/AccountProfile";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    resume: userInfo ? userInfo?.resume : "",
    phone: userInfo ? userInfo?.phone : "",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Edit Profile
              </h1>
              <p className="mt-3 text-base-regular text-light-2">
                Make any changes to your profile below.
              </p>
            </div>

            <section className="mt-12 flex justify-center">
              <AccountProfile user={userData} btnTitle="Continue" />
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;

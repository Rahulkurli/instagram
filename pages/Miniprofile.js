import { signOut, useSession } from "next-auth/react";

const Miniprofile = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex justify-between items-center mt-14 ml-10 ">
      <img
        src={session?.user?.image}
        className=" w-16 h-16 rounded-full border p-[2px] "
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-gray-400">Welcome to instagram</h3>
      </div>
      <button onClick={signOut} className="text-blue-400 font-semibold text-sm">
        Sign out
      </button>
    </div>
  );
};

export default Miniprofile;

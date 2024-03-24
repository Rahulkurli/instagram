import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Header from "../Header";
import Head from "next/head";

function signIn({ providers }) {
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-40 px-14 text-center">
        <img
          src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202301/instagram-sixteen_nine.jpg?size=948:533"
          className="w-80"
        />
        <p className="font-xs italic">
          This is not a real instagram, this app is build for educational
          purpose only
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  signIntoProvider(provider.id, {
                    callbackUrl: "http://localhost:3000/",
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
export default signIn;

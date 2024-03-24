import Head from "next/head";
import Header from "./Header";
import Feed from "./Feed";
import Modal from "./Modal";

const index = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram 2.0</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      {/* header  */}
      <Header />

      {/* feed  */}
      <Feed />

      {/* Modal  */}
      <Modal />
    </div>
  );
};

export default index;

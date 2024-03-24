import Image from "next/image";
import textinsta from "./images/insta-text.png";
import { BiSearch } from "react-icons/bi";
import { HiHome, HiOutlinePaperAirplane } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50 ">
      <div className="flex justify-between  max-w-6xl mx-5 lg:mx-auto ">
        {/* left  */}
        <div onClick={() => router.push("/")}>
          <div className=" relative hidden lg:inline-grid w-24 cursor-pointer">
            <Image src={textinsta} className="mt-1" />
          </div>
          <div className=" relative lg:hidden flex-shrink-0 w-10 mt-1 h-10 cursor-pointer">
            <BsInstagram className="h-8 w-8 mt-2" />
          </div>
        </div>

        {/* Middle - search input field */}
        <div className="max-w-xs">
          <div className="relative  p-2 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <BiSearch className="h-5 w-5 text-grey-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 h-8 sm:text-sm rounded-md "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Right  */}
        <div className="flex items-center justify-end space-x-4">
          <HiHome onClick={() => router.push("/")} className="navbtn" />

          <Menu
            as="div"
            className="relative md:hidden hover:scale-125 cursor-pointer transition-all duration-150 ease-out inline-block text-left"
          >
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900">
                Menu
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => router.push("/")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Home
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => setOpen(true)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Post
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Chat
                      </a>
                    )}
                  </Menu.Item>
                  <form method="POST" action="#">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          Notification
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* session start */}
          {session ? (
            <>
              <div className="navbtn relative ">
                <HiOutlinePaperAirplane className="navbtn rotate-45 " />
                <div className="absolute w-5 h-5 -top-2 -right-0.5 rounded-full bg-red-500 flex items-center justify-center animate-pulse text-white">
                  9
                </div>
              </div>
              <AiOutlinePlusCircle
                onClick={() => setOpen(true)}
                className="navbtn"
              />
              <MdOutlinePeopleOutline className="navbtn" />
              <AiOutlineHeart className="navbtn" />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="profile picture"
                className="rounded-full h-10 w-10 cursor-pointer"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
          {/* session end  */}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Header;

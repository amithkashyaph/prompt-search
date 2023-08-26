"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect  } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
    let isUserLoggedIn = true;

    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setProvidersFunc = async () => {
            const resposne = await getProviders();
            setProviders(resposne);
        }

        setProvidersFunc();
    }, []);
    console.log(toggleDropDown);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/images/logo.svg"
                alt="Promptopia Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">Promptopia</p>
        </Link>
        <div className="sm:flex hidden">
            {
                isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create_prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button className="outline_btn" type="button" onClick={signOut}>
                            Signout
                        </button>
                        <Link href="/profile">
                            <Image 
                                src="/assets/images/logo.svg"
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ): (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                SignIn
                            </button>
                        ))}
                    </>
                )
            }
        </div>
        {/* For mobile navigation */}
        <div className="sm:hidden flex relative">
            {
                isUserLoggedIn ? (
                    <div className="flex">
                        <Image 
                                src="/assets/images/logo.svg"
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                                onClick={() => 
                                    setToggleDropDown((prev) => !prev)
                                }
                        />
                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropDown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Signout
                                </button>

                            </div>
                        )}
                    </div>

                ) :
                <>
                    {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                SignIn
                            </button>
                        ))}
                </>
            }
        </div>

    </nav>
  )
}

export default Nav
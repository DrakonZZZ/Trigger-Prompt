'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { GiPlagueDoctorProfile } from 'react-icons/gi';

const Nav = () => {
  const { data } = useSession();
  const [provider, setProvider] = useState(null);
  const [tglMenu, setTglMenu] = useState(false);

  useEffect(() => {
    const setupProvider = async () => {
      const res = await getProviders();
      setProvider(res);
    };

    setupProvider();
  }, []);

  const underline = `py-0.5 relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
  before:bottom-0 before:left-0 before:bg-gradient-to-tr from-yellow-500 via-pink-500 to-red-500
  before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
  before:transition before:ease-in-out before:duration-200`;
  return (
    <nav className="w-full mb-14 pt-3 flex-between">
      <Link href="/" className="flex gap-2 float-left">
        <p className="logo_text">
          <span className="gradient_text">Trigger</span>.
        </p>
      </Link>
      <div className="sm:flex hidden">
        {data?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-triggers"
              className={`font-medium ${underline}`}
            >
              Create a prompt
            </Link>
            <button
              type="button"
              onClick={signOut}
              className={`font-medium ${underline}`}
            >
              Sign-Out
            </button>
            <Link href="profile">
              <Image
                src={data?.user.image}
                className="rounded-full"
                width={28}
                height={28}
                alt="profile"
                onClick={() => setTglMenu((prev) => !prev)}
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((site) => (
                <button
                  type="button"
                  key={site.name}
                  onClick={() => signIn(site.id)}
                  className="primary_btn"
                >
                  Sign-In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {data?.user ? (
          <div className="flex">
            <Image
              src={data?.user.image}
              className="rounded-full"
              width={28}
              height={28}
              alt="profile"
              onClick={() => setTglMenu((prev) => !prev)}
            />
            {tglMenu && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setTglMenu(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-triggers"
                  className="dropdown_link"
                  onClick={() => setTglMenu(false)}
                >
                  Create a Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setTglMenu(false);
                    signOut();
                  }}
                  className="mt-5 w-full primary_btn"
                >
                  Sign-Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((site) => (
                <button
                  type="button"
                  key={site.name}
                  onClick={() => signIn(site.id)}
                  className="primary_btn"
                >
                  Sign-In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const { data } = useSession();
  const [provider, setProvider] = useState(null);
  const [tglMenu, setTglMenu] = useState(false);

  const setupProvider = async () => {
    const res = await getProviders();
    setProvider(res);
  };

  useEffect(() => {
    setupProvider();
  }, []);

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
              prefetch={false}
              className="font-medium text_underline"
            >
              Create a prompt
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="font-medium text_underline"
            >
              Sign-Out
            </button>
            <Link href="profile" prefetch={false}>
              <Image
                src={data?.user.image}
                className="rounded-full hover:border-2 hover:border-red-500 transition"
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

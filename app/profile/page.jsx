'use client';

import { Avatar } from '@/components';
import { useUserContext } from '@/utils/context';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ErrorPage from '../error/page';

const page = () => {
  const { data } = useSession();
  const { setTriggers } = useUserContext();
  useEffect(() => {
    const fetchTriggers = async () => {
      const res = await fetch(`/api/guests/${data?.user.id}/triggers`);
      const parsedData = await res.json();

      setTriggers(parsedData);
    };
    if (data?.user.id) {
      fetchTriggers();
    }
  }, []);

  return (
    <>
      {data?.user.id ? (
        <Avatar
          name="Your"
          desc="Manage all of your personal data and prompts/triggers in one location."
        />
      ) : (
        <ErrorPage code="403" message="access denied!" />
      )}
    </>
  );
};

export default page;

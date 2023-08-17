'use client';

import { Avatar } from '@/components';
import { useUserContext } from '@/utils/context';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ErrorPage from '../error/page';

const page = () => {
  const { data } = useSession();
  const { setTriggers } = useUserContext();
  const [loading, setLoading] = useState(false);

  const fetchTriggers = async () => {
    setLoading(true);
    const res = await fetch(`/api/guests/${data?.user.id}/triggers`);
    const parsedData = await res.json();

    setTriggers(parsedData);
    setLoading(false);
  };

  useEffect(() => {
    if (data?.user.id) {
      fetchTriggers();
    }
  }, [data]);

  if (!data?.user.id) {
    return <ErrorPage code="403" message="access denied!" />;
  }

  return (
    <Avatar
      name="Your"
      desc="Manage all of your personal data and prompts/triggers in one location."
      loading={loading}
    />
  );
};

export default page;

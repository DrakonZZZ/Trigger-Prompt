'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form } from '@/components';
import ErrorPage from '../error/page';

const page = () => {
  const route = useRouter();
  const { data } = useSession();
  const [stage, setStage] = useState(false);
  const [triggerData, setTriggerData] = useState({
    input: '',
    category: '',
  });

  const createTrigger = async (e) => {
    e.preventDefault();
    setStage(true);
    try {
      const res = await fetch('/api/trigger/new', {
        method: 'POST',
        body: JSON.stringify({
          trigger: triggerData.input,
          userID: data?.user.id,
          category: triggerData.category,
        }),
      });

      if (res.ok) {
        route.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStage(false);
    }
  };

  return (
    <>
      {data?.user.id ? (
        <Form
          type="Create"
          triggerData={triggerData}
          setTriggerData={setTriggerData}
          submitStage={stage}
          handleSubmit={createTrigger}
        />
      ) : (
        <ErrorPage code="403" message="access denied!" />
      )}
    </>
  );
};

export default page;

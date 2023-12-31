'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form } from '@/components';

const Create = () => {
  const route = useRouter();
  const { data, status } = useSession({ required: true });
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
      {status === 'authenticated' && (
        <Form
          type="Create"
          triggerData={triggerData}
          setTriggerData={setTriggerData}
          submitStage={stage}
          handleSubmit={createTrigger}
        />
      )}
    </>
  );
};

export default Create;

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Form } from '@/components';
import { useUserContext } from '@/utils/context';
import { useSession } from 'next-auth/react';

const Update = () => {
  const { data, status } = useSession({
    required: true,
  });
  const searchParams = useSearchParams();
  const triggerId = searchParams.get('id');

  const { triggerData, setTriggerData, stage, updateTrigger } =
    useUserContext();

  useEffect(() => {
    const getTriggerData = async () => {
      const res = await fetch(`/api/trigger/${triggerId}`);
      const parsedData = await res.json();

      setTriggerData({
        input: parsedData.trigger,
        category: parsedData.category,
      });
    };

    if (triggerId) getTriggerData();
  }, [triggerId]);
  return (
    <>
      {status === 'authenticated' && (
        <Form
          type="Edit"
          desc="Edit your Prompt/Trigger"
          triggerData={triggerData}
          setTriggerData={setTriggerData}
          submitStage={stage}
          handleSubmit={(e) => updateTrigger(e, triggerId)}
        />
      )}
    </>
  );
};

export default Update;

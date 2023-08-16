'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Form } from '@/components';
import { useUserContext } from '@/utils/context';

const page = () => {
  const searchParams = useSearchParams();
  const triggerId = searchParams.get('id');

  const { setTriggerData, stage, updateTrigger } = useUserContext();

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
    <Form
      type="Edit"
      desc="Edit your Prompt/Trigger"
      submitStage={stage}
      handleSubmit={(e) => updateTrigger(e, triggerId)}
    />
  );
};
export default page;

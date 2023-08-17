'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Form } from '@/components';
import { useUserContext } from '@/utils/context';
import { useSession } from 'next-auth/react';
import ErrorPage from '../error/page';

const page = () => {
  const { data } = useSession();
  const searchParams = useSearchParams();
  const triggerId = searchParams.get('id');

  const { triggerData, setTriggerData, stage, updateTrigger } =
    useUserContext();

  useEffect(() => {
    const getTriggerData = async () => {
      console.log(triggerId);
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
      {data?.user.id ? (
        <Form
          type="Edit"
          desc="Edit your Prompt/Trigger"
          triggerData={triggerData}
          setTriggerData={setTriggerData}
          submitStage={stage}
          handleSubmit={(e) => updateTrigger(e, triggerId)}
        />
      ) : (
        <ErrorPage code="403" message="access denied!" />
      )}
    </>
  );
};
export default page;

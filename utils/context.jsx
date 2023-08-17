'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const AppContext = ({ children }) => {
  const [tglMenu, setTglMenu] = useState(false);
  const [stage, setStage] = useState(false);
  const [triggerData, setTriggerData] = useState({
    input: '',
    category: '',
  });
  const [triggers, setTriggers] = useState([]);
  const Router = useRouter();

  //create trigger
  const createTrigger = async (e, data) => {
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
        Router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStage(false);
    }
  };

  const handleEdit = (id) => {
    Router.push(`/update?id=${id}`);
  };

  //updating existing prompt
  const updateTrigger = async (e, triggerId) => {
    e.preventDefault();
    setStage(true);

    if (!triggerId) {
      return alert('Trigger ID not found');
    }

    try {
      const res = await fetch(`/api/trigger/${triggerId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          trigger: triggerData.input,
          category: triggerData.category,
        }),
      });

      if (res.ok) {
        Router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStage(false);
    }
  };

  const handleDelete = async () => {};

  return (
    <UserContext.Provider
      value={{
        tglMenu,
        setTglMenu,
        stage,
        setStage,
        triggerData,
        setTriggerData,
        triggers,
        setTriggers,
        createTrigger,
        updateTrigger,
        handleDelete,
        handleEdit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AppContext;

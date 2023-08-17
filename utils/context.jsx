'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const AppContext = ({ children }) => {
  //small screen toggle menu
  const [tglMenu, setTglMenu] = useState(false);
  //Loading state
  const [stage, setStage] = useState(false);
  //Trigger Profile data
  const [triggerData, setTriggerData] = useState({
    input: '',
    category: '',
  });
  //Used for filtering data
  const [triggerList, setTriggerList] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [copy, setCopy] = useState('');

  const Router = useRouter();

  //create prompt function
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

  //edit function
  const handleEdit = (id) => {
    Router.push(`/update?id=${id}`);
  };

  //Copy function
  const handleCopy = (text) => {
    setCopy(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopy(''), 2000);
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

  //Profile prompt delete function
  const handleDelete = async (id) => {
    const deleteConfirmation = confirm('You want to delete this?');

    if (deleteConfirmation) {
      try {
        await fetch(`/api/trigger/${id.toString()}`, {
          method: 'DELETE',
        });
        0;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        tglMenu,
        setTglMenu,
        stage,
        setStage,
        copy,
        setCopy,
        triggerData,
        setTriggerData,
        triggerList,
        setTriggerList,
        triggers,
        setTriggers,
        createTrigger,
        updateTrigger,
        handleCopy,
        handleDelete,
        handleEdit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AppContext;

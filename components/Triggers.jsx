'use client';

import { useState, useEffect } from 'react';
import { Prompter } from '.';
import { useUserContext } from '@/utils/context';

const Triggers = () => {
  const { triggerList, setTriggerList } = useUserContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchTerm(e.target.value);

    setSearchTimeout(() => {
      const results = searchThroughTrigger(e.target.value);
      setSearchList(results);
    }, 500);
  };

  const handleCategory = (cate) => {
    setSearchTerm(cate);
    const results = searchThroughTrigger(cate);
    setSearchList(results);
  };

  const searchThroughTrigger = (text) => {
    const regex = new RegExp(text, 'i');

    return triggerList.filter(
      (t) =>
        regex.test(t.userID.username) ||
        regex.test(t.trigger) ||
        regex.test(t.category)
    );
  };

  const fetchData = async () => {
    const res = await fetch('/api/trigger');
    const parsedData = await res.json();
    setTriggerList(parsedData);
    setSearchList(parsedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="prompter">
        <form action="w-full flex-center relative">
          <input
            type="text"
            className="search_input peer"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Lookup a tag or a username"
            onKeyDown={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
            required
          />
        </form>
      </div>
      <Prompter data={searchList} handleCategory={handleCategory} />
    </>
  );
};

export default Triggers;

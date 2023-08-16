'use client';

import { useState, useEffect } from 'react';
import { Prompter } from '.';

const Triggers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerList, setTriggerList] = useState([]);

  const handleSearch = (e) => {};

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/trigger');
      const parsedData = await res.json();
      setTriggerList(parsedData);
    };

    fetchData();
  }, []);
  return (
    <div className="prompter">
      <form action="w-full flex-center relative">
        <input
          type="text"
          className="search_input peer"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Lookup a tag or a username"
          required
        />
      </form>
      <Prompter data={triggerList} handleCategory={() => {}} />
    </div>
  );
};

export default Triggers;

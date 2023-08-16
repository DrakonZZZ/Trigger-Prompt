'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PiCopyThin, PiCopyLight } from 'react-icons/pi';
import { useState } from 'react';

const Prompter = ({ data, handleCategory, handleEdit, handleDelete }) => {
  const [copy, setCopy] = useState('');
  return (
    <div className="mt-16 prompt-layout">
      {data.map((item) => {
        const { _id, trigger, userID, category } = item;
        return (
          <div className="trigger_card" key={_id}>
            <div className="flex justify-between items-start gap-5">
              <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                <Image
                  src={userID.image}
                  alt="UserImage"
                  width={30}
                  height={30}
                  className="rounded-full object-contain border-2 border-gray-500 shadow-md"
                />
                <div className="flex flex-col">
                  <h3 className="font-bold text-pink-700">{userID.username}</h3>
                </div>
              </div>
              <div className="copy_btn" onClick={() => {}}>
                {copy === trigger ? <PiCopyLight /> : <PiCopyThin />}
              </div>
            </div>
            <p className="my-4 text-gray-300 border-t-2 border-zinc-800 font-semibold pt-4">
              {trigger}
            </p>
            <span className="font-inter text-sm border- text-gray-500 flex flex-end">
              {category}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Prompter;

'use client';

import Image from 'next/image';
import { PiCopyThin, PiCheckThin } from 'react-icons/pi';
import { useState } from 'react';
import { useUserContext } from '@/utils/context';

const Prompter = ({ data, handleCategory }) => {
  const { copy, handleCopy } = useUserContext();

  return (
    <div className="w-full mt-16 prompt-layout grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
      {data.map((item) => {
        const { _id, trigger, userID, category } = item;

        console.log(copy, trigger);
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
              <div
                className="copy_btn profile-btns"
                onClick={() => handleCopy(trigger)}
              >
                {copy === trigger ? <PiCheckThin /> : <PiCopyThin />}
              </div>
            </div>
            <p className="flex-1 my-4 text-gray-300 border-t-2 border-zinc-800 font-semibold pt-4">
              {trigger}
            </p>
            <span
              className="font-inter text-sm border- text-gray-500 flex-end cursor-pointer"
              onClick={() => handleCategory(category)}
            >
              {category}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Prompter;

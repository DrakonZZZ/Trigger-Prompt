import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useUserContext } from '@/utils/context';
import { PiCopyThin, PiCheckThin } from 'react-icons/pi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import Loader from './Loader';

const PrompterCard = ({ loading }) => {
  const { data: userData } = useSession();
  const pathname = usePathname();
  const {
    triggers,
    copy,
    handleCopy,
    handleEdit,
    handleDelete,
    handleCategory,
  } = useUserContext();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {triggers.map((item) => {
        const { _id, trigger, userID, category } = item;

        return (
          <div className="trigger_card w-9/12 my-4" key={_id}>
            <div className="flex justify-between items-start gap-2">
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
              {userData?.user.id === userID._id && pathname === '/profile' && (
                <>
                  <div className="card_btn profile-btns">
                    <AiOutlineEdit onClick={() => handleEdit(_id)} />
                  </div>
                  <div className="card_btn profile-btns">
                    <AiOutlineDelete onClick={() => handleDelete(_id)} />
                  </div>
                </>
              )}

              <div
                className="card_btn profile-btns"
                onClick={() => handleCopy(trigger)}
              >
                {copy === trigger ? <PiCheckThin /> : <PiCopyThin />}
              </div>
            </div>
            <p className="my-4 text-gray-300 border-t-2 border-zinc-800 font-semibold py-4">
              {trigger}
            </p>
            <span
              className="font-inter flex justify-end cursor-pointer "
              onClick={() => handleCategory && handleCategory(trigger.category)}
            >
              <span className=" text-xs font-bold text-gray-500 bg-zinc-800 px-2 py-1 shadow-lg rounded-xl">
                {category}
              </span>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default PrompterCard;

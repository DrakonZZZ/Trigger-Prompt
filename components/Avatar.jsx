'use client';

import { useUserContext } from '@/utils/context';
import PrompterCard from './PrompterCard';

const Avatar = ({ name, data, desc }) => {
  const { handleEdit, handleDelete } = useUserContext();
  return (
    <div className="w-full">
      <h1 className="header_text_2">{name} Profile</h1>
      <p className="desc max-w-full text-left mb-16">{desc}</p>
      <PrompterCard data={data} />
    </div>
  );
};

export default Avatar;

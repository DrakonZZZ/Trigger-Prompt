'use client';

import PrompterCard from './PrompterCard';

const Avatar = ({ name, desc, loading }) => {
  return (
    <div className="w-full">
      <h1 className="header_text_2">{name} Profile</h1>
      <p className="desc max-w-full text-left mb-16">{desc}</p>
      <PrompterCard loading={loading} />
    </div>
  );
};

export default Avatar;

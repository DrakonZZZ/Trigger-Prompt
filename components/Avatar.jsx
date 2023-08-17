'use client';

import PrompterCard from './PrompterCard';

const Avatar = ({ name, desc }) => {
  return (
    <div className="w-full prompt-layout">
      <h1 className="header_text_2">{name} Profile</h1>
      <p className="desc max-w-full text-left mb-16">{desc}</p>
      <PrompterCard />
    </div>
  );
};

export default Avatar;

import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div tw="font-mono text-3xl font-extrabold bg-zinc-900 w-full h-full text-pink-700 flex justify-center items-center">
        T
      </div>
    ),
    {
      ...size,
    }
  );
}

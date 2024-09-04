import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div tw="text-[70px] text-black bg-white w-full h-full px-[200px] py-[50px] text-center flex justify-center items-center">
        Examotron
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

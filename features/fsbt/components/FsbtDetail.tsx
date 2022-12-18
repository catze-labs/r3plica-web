/* eslint-disable @next/next/no-img-element */
import AssetBox from "@/components/AssetBox";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const FsbtDetail = () => {
  const router = useRouter();

  return (
    <AssetBox className="w-[450px]">
      <h1 className="text-3xl font-bold">
        My <span className="tracking-wider">fSBT</span>
      </h1>
      <div className="p-8 flex flex-col justify-center gap-4">
        <img
          src="/fsbt.png"
          width={200}
          height={300}
          alt="my fsbt"
          className="pointer-events-none mx-auto"
        />
        <p className="text-center">Last updated: 2022-12-19</p>
      </div>
      <div className="flex gap-2.5">
        <Button onClick={() => router.push("/assets")}>Go to My Assets</Button>
        <Button className="bg-brown">
          Show <span className="tracking-wider">fSBT</span> Information
        </Button>
      </div>
    </AssetBox>
  );
};

export default FsbtDetail;

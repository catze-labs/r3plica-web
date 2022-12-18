/* eslint-disable @next/next/no-img-element */
import AssetBox from "@/components/AssetBox";
import Button from "@/components/Button";
import { useTransferHistory } from "@/requests/transfer";
import { useRouter } from "next/router";
import ItemFsbtItem from "./ItemFsbtItem";
import AchievementFsbtItem from "./AchievementFsbtItem";

const FsbtList = () => {
  const router = useRouter();

  const { data, isLoading } = useTransferHistory();

  return (
    <AssetBox className="sm:w-[800px]">
      <h1 className="text-2xl sm:text-3xl font-bold">
        My <span className="tracking-widest">fSBT</span>
      </h1>
      <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-4 py-4">
        <ul className="relative w-full sm:w-1/2 p-4 sm:p-8 grow flex flex-col gap-4 h-[350px] overflow-y-auto bg-[rgba(255,255,255,0.05)] rounded-lg scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-400">
          {isLoading && (
            <li className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Loading...
            </li>
          )}
          {!isLoading &&
            data?.itemTransfers?.map((item, idx) => (
              <ItemFsbtItem key={idx} itemTransfer={item} />
            ))}
          {!isLoading && data?.itemTransfers?.length === 0 && (
            <li className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              No Items.
            </li>
          )}
        </ul>
        <ul className="relative w-full sm:w-1/2 p-8 grow flex flex-col gap-4 h-[350px] overflow-y-auto bg-[rgba(255,255,255,0.05)] rounded-lg scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-400">
          {isLoading && (
            <li className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Loading...
            </li>
          )}
          {!isLoading &&
            data?.itemTransfers?.map((item, idx) => (
              <AchievementFsbtItem key={idx} itemTransfer={item} />
            ))}
          {!isLoading && data?.itemTransfers?.length === 0 && (
            <li className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              No Achievements.
            </li>
          )}
        </ul>
      </div>

      <div className="flex gap-2.5 justify-end">
        <div>
          <Button onClick={() => router.push("/assets")} className="px-4">
            Go to My Assets
          </Button>
        </div>
      </div>
    </AssetBox>
  );
};

export default FsbtList;

import Image from "next/image";

const AchievementFsbtItem: React.FC<{
  achievementTransfers: Transfer.HistoryList["achievementTransfers"][0];
}> = ({ achievementTransfers }) => {
  return (
    <li className="bg-gray-dark px-4 py-2 rounded flex gap-4 items-center">
      <div className="w-[30px]">
        <Image src="/fsbt.png" width={30} height={45} alt="sbt" />
      </div>
      <div className="flex flex-col gap-1 grow items-start ">
        <a
          rel="noreferrer"
          className="font-mono truncate w-[130px] hover:underline"
          href={`https://apothem.blocksscan.io/txs/${achievementTransfers?.txHash}`}
          target="_blank"
        >
          {achievementTransfers?.txHash || ""}
        </a>
        <span className="text-sm">
          {achievementTransfers?.updated.slice(0, 10)}
        </span>
      </div>
      <div>
        {achievementTransfers?.txStatus === null && (
          <span className="block animate-pulse text-xs bg-gray-400 text-black px-2 py-1 text-center rounded-md">
            Pending
          </span>
        )}
      </div>
    </li>
  );
};

export default AchievementFsbtItem;

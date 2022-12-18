import Image from "next/image";

const FsbtItem = () => {
  return (
    <li className="bg-gray-dark px-4 py-2 rounded flex gap-4 items-center">
      <div className="w-[30px]">
        <Image src="/fsbt.png" width={30} height={45} alt="sbt" />
      </div>
      <div className="flex flex-col gap-2 grow items-start ">
        <a className="font-mono truncate w-[130px]" href="#">
          0x27732474905hr4jb134541354315v4k1ji35b345h2j1hil56o135k3il5h431
        </a>
        <span className="text-sm">2022.12.19 created</span>
      </div>
      <div>
        <span className="block animate-pulse text-xs bg-gray-400 text-black px-2 py-1 text-center rounded-md">
          Pending
        </span>
      </div>
    </li>
  );
};

export default FsbtItem;

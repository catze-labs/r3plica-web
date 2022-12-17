import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";

interface ItemBoxProps {
  itemID: number;
  alt?: string;
  type: "epic" | "legendary";
  isTransferred?: boolean;
  transfer?: Assets.Inventory.Item["transfer"];
  checked?: boolean;
  checkable?: boolean;
  onCheck?: (itemID: number) => void;
  className?: string;
}

const ItemBox: React.FC<ItemBoxProps> = ({
  itemID,
  alt,
  className,
  type,
  isTransferred,
  checkable,
  checked = false,
  onCheck,
}) => {
  return (
    <div
      className={clsx([
        "relative rounded-lg w-[88px] h-[88px] cursor-pointer",
        !type || isTransferred ? "bg-gray-dark" : "bg-white",
        className,
      ])}
    >
      <button
        className={clsx([
          "absolute top-0 left-0 z-20 w-full h-full bg-transparent rounded-lg flex justify-center items-center",
          (!type || isTransferred) && "cursor-default bg-[rgba(0,0,0,0.5)]",
          checkable && checked && "bg-[rgba(0,0,0,0.5)] border-2 border-yellow",
        ])}
        disabled={isTransferred}
        onClick={() => onCheck?.(itemID)}
      >
        {checkable && (
          <span className="text-white">
            {!type ? "You don't have it" : isTransferred ? "Transferred" : null}
          </span>
        )}
        {checkable && checked && (
          <CheckCircleIcon className="w-6 h-6 text-yellow" />
        )}
      </button>
      <Image
        src={`/assets/${itemID}.png`}
        alt={alt}
        width={88}
        height={88}
        className={clsx([
          "pointer-events-none",
          !type && `mix-blend-luminosity`,
        ])}
      />
      {type && (
        <span
          className={clsx([
            "absolute bottom-1 right-1 text-xs font-bold px-1.5 py-0.5 block rounded-xl",
          ])}
          style={{
            backgroundColor:
              type === "epic"
                ? "rgba(242, 215, 76, 0.8)"
                : "rgba(255, 121, 20, 0.8)",
          }}
        >
          {type}
        </span>
      )}
    </div>
  );
};

export default ItemBox;

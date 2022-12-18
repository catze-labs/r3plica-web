import NoSSR from "@/components/NoSSR";
import { useEntitlements } from "@/requests/assets";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { QuestState } from "../constants";

interface EntitlementListProps {
  confirmMode?: boolean;
  onSelected?: (entitles: number[]) => void;
}

const EntitlementList: React.FC<EntitlementListProps> = ({
  confirmMode = false,
  onSelected = () => {},
}) => {
  const { data, isLoading } = useEntitlements();

  const list = data?.entitlements;

  const [selectedEntitlement, setSelectedEntitlement] = useState<number[]>([]);

  useEffect(() => {
    onSelected?.(selectedEntitlement);
  }, [selectedEntitlement]);

  return (
    <NoSSR>
      <article className="bg-[#383F46] pt-5 px-7 pb-20 w-full lg:grow rounded-lg">
        <h2 className="text-brown text-2xl font-bold mb-[50px]">Entitlement</h2>
        <ul>
          {isLoading && (
            <li className="flex flex-col gap-2">
              <p className="text-lg font-bold">Loading...</p>
            </li>
          )}
          {list?.map((item, idx) => (
            <li
              key={item.questID}
              className={clsx([
                "flex items-start gap-4",
                item?.state === QuestState.OnGoing && "opacity-50",
                idx !== list.length - 1 && "pb-8 mb-8 border-b border-white",
              ])}
            >
              {confirmMode && (
                <div className="pt-3">
                  <CheckCircleIcon
                    className={clsx([
                      "w-6",
                      selectedEntitlement.includes(item.questID) &&
                        "text-yellow",
                    ])}
                  />
                </div>
              )}
              <button
                disabled={!confirmMode && item?.state !== QuestState.TurnedIn}
                className={clsx([
                  "flex flex-col gap-2 w-full p-2 rounded",
                  confirmMode
                    ? "cursor-pointer hover:bg-[rgba(255,255,255,0.1)]"
                    : "cursor-default",
                  selectedEntitlement.includes(item.questID) &&
                    "bg-[rgba(255,255,255,0.1)] text-yellow",
                ])}
                onClick={() => {
                  if (!confirmMode) return;

                  if (selectedEntitlement.includes(item.questID)) {
                    setSelectedEntitlement(
                      selectedEntitlement.filter((id) => id !== item.questID)
                    );
                  } else {
                    setSelectedEntitlement([
                      ...selectedEntitlement,
                      item.questID,
                    ]);
                  }
                }}
              >
                <p className="text-lg font-bold">{item?.questName}</p>
                <p className="text-sm font-normal">{item?.description}</p>
              </button>
            </li>
          ))}
          {!isLoading && !list?.length && (
            <li className="flex flex-col gap-2">
              <p className="text-lg font-bold">No Entitlement</p>
            </li>
          )}
        </ul>
      </article>
    </NoSSR>
  );
};
export default EntitlementList;

import NoSSR from "@/components/NoSSR";
import { useAchievements } from "@/requests/assets";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { QuestState } from "../constants";

interface AchievementListProps {
  confirmMode?: boolean;
  onSelected?: (achievements: number[]) => void;
}

const AchievementList: React.FC<AchievementListProps> = ({
  confirmMode = false,
  onSelected = () => {},
}) => {
  const { data, isLoading } = useAchievements();

  const list = data?.achievements;

  const [selectedAchievement, setSelectedAchievement] = useState<number[]>([]);

  useEffect(() => {
    onSelected?.(selectedAchievement);
  }, [selectedAchievement]);

  return (
    <NoSSR>
      <article className="bg-[#383F46] pt-5 px-7 pb-20 w-full lg:grow rounded-lg">
        <h2 className="text-brown text-2xl font-bold mb-[50px]">
          Achievements
        </h2>
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
                item?.state !== QuestState.TurnedIn && "opacity-50",
                idx !== list.length - 1 && "pb-8 mb-8 border-b border-white",
              ])}
            >
              {confirmMode && item?.state === QuestState.TurnedIn && (
                <div className="pt-3">
                  <CheckCircleIcon
                    className={clsx([
                      "w-6",
                      selectedAchievement.includes(item.questID) &&
                        "text-yellow",
                    ])}
                  />
                </div>
              )}
              <button
                disabled={!confirmMode || item?.state !== QuestState.TurnedIn}
                className={clsx([
                  "flex flex-col gap-2 w-full p-2 rounded",
                  confirmMode
                    ? "cursor-pointer hover:bg-[rgba(255,255,255,0.1)]"
                    : "cursor-default",
                  selectedAchievement.includes(item.questID) &&
                    "bg-[rgba(255,255,255,0.1)] text-yellow",
                ])}
                onClick={() => {
                  if (!confirmMode) return;

                  if (selectedAchievement.includes(item.questID)) {
                    setSelectedAchievement(
                      selectedAchievement.filter((id) => id !== item.questID)
                    );
                  } else {
                    setSelectedAchievement([
                      ...selectedAchievement,
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
              <p className="text-lg font-bold">No Achievement</p>
            </li>
          )}
        </ul>
      </article>
    </NoSSR>
  );
};
export default AchievementList;

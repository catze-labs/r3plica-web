import NoSSR from "@/components/NoSSR";
import { useInventory } from "@/requests/assets";
import { useEffect, useState } from "react";
import ItemBox from "./ItemBox";

interface AssetListProps {
  confirmMode?: boolean;
  onSelected?: (items: Assets.Inventory.Item[]) => void;
}

const AssetList: React.FC<AssetListProps> = ({
  confirmMode = false,
  onSelected = () => {},
}) => {
  const { data } = useInventory();

  const list = data?.items;

  /**
   * get unique item id only recent one (by gainDate)
   */
  const ItemMap: Record<number, Assets.Inventory.Item | null> = {
    18: null,
    27: null,
    31: null,
    34: null,
  };

  list?.forEach((item) => {
    if (ItemMap[item.itemID] === null) {
      ItemMap[item.itemID] = item;
    } else {
      if (ItemMap?.[item?.itemID]?.gainDate < item.gainDate) {
        ItemMap[item?.itemID] = item;
      }
    }
  });

  const [selectedItem, setSelectedItem] = useState<number[]>([]);

  useEffect(() => {
    onSelected?.(selectedItem);
  }, [selectedItem]);

  const onItemCheck = (item: Assets.Inventory.Item, key: string) => {
    if (!item?.rarity) return;
    if (item?.isTransferred) return;
    if (selectedItem.some((id) => id === Number(key))) {
      setSelectedItem(selectedItem.filter((id) => id !== Number(key)));
    } else {
      setSelectedItem([...selectedItem, Number(key)]);
    }
  };

  return (
    <NoSSR>
      <article className="bg-[#383F46] p-5 w-full lg:w-[360px] rounded-lg">
        <h2 className="text-brown text-2xl font-bold mb-[50px]">Inventory</h2>
        <div className="flex flex-wrap gap-3 items-start">
          {Object.keys(ItemMap).map((key) => {
            const item = ItemMap[Number(key)];
            return (
              <div key={key}>
                <ItemBox
                  checkable={confirmMode}
                  checked={selectedItem.some((id) => id === Number(key))}
                  onCheck={() => {
                    onItemCheck(item, key);
                  }}
                  itemID={Number(key)}
                  type={item?.rarity}
                  isTransferred={item?.isTransferred}
                  transfer={item?.transfer}
                />
              </div>
            );
          })}
        </div>
      </article>
    </NoSSR>
  );
};

export default AssetList;

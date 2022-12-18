import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import AssetBox from "../../../components/AssetBox";
import AssetList from "../components/AssetList";
import AchievementList from "../components/AchievementList";
import InformationModal from "../components/InformationModal";

const AssetPage = () => {
  const [openInformationModal, setOpenInformationModal] = useState(false);
  const router = useRouter();
  const handleClickTransfer = () => {
    router.push("/transfer");
  };

  return (
    <Layout>
      <AssetBox>
        <h1 className="text-3xl font-bold mb-8">My Assets</h1>
        <div className="flex items-start gap-8 mb-[30px] flex-col lg:flex-row">
          <AssetList />
          <AchievementList />
        </div>
        <div className="flex flex-col justify-end items-end">
          <Button className="w-56" onClick={handleClickTransfer}>
            Transfer fSBT to my wallet
          </Button>
          <a
            className="text-yellow text-base mt-4 hover:underline cursor-pointer"
            onClick={() => setOpenInformationModal(true)}
          >
            What is <span className="tracking-wider">fSBT</span>? 🤔
          </a>
        </div>
      </AssetBox>
      <InformationModal
        title={
          <>
            What is <span className="tracking-widest">fSBT</span>?
          </>
        }
        open={openInformationModal}
        onClose={() => setOpenInformationModal(false)}
      />
    </Layout>
  );
};

export default AssetPage;

import Layout from "@/components/Layout";
import MainVisual from "../components/MainVisual";

export function getServerSideProps() {
  return {
    props: {},
  };
}

const LandingPage = () => {
  return (
    <Layout mainCentered={false}>
      <MainVisual />
    </Layout>
  );
};

export default LandingPage;

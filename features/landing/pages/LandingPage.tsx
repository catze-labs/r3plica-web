import Layout from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import MainVisual from "../components/MainVisual";
import PlayGame from "../components/PlayGame";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";

export function getServerSideProps() {
  return {
    props: {},
  };
}

const LandingPage = () => {
  return (
    <NoSSR>
      <Layout mainCentered={false}>
        <MainVisual />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <PlayGame />
      </Layout>
    </NoSSR>
  );
};

export default LandingPage;

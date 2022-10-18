import type { NextPage } from "next";
import Head from "next/head";
import Landing from "../components/Landing";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Open AI Generated Marketing Tool</title>
        <meta
          name="description"
          content="Generate branding for your product."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </div>
  );
};

export default Home;

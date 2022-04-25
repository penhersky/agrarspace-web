import { Button, Card, Input } from "antd";
import type { NextPage } from "next";
import Head from "next/head";

import { PageProvider } from "../components/providers";
import styles from "../styles/pages/Home.module.less";

const Home: NextPage = () => (
  <PageProvider>
    <>
      <Head>
        <title>App</title>
        <meta name="description" content="app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome</h1>
        <Button type="primary">Hello</Button>
        <Card>Test</Card>
        <Input placeholder="test" />
      </main>
    </>
  </PageProvider>
);

export default Home;

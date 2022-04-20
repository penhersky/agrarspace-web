import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Loading } from "../../shared";
import styles from "./page-loading.module.less";

export interface ILayoutWrapperProps {
  children: React.ReactNode;
}

const PageLoading: React.FC<ILayoutWrapperProps> = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath, router.events]);

  if (loading)
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <> {children}</>;
};

export default PageLoading;

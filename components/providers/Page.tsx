import { useTranslation } from "next-i18next";
import React from "react";

import { Loading } from "../shared";
import Seo from "./__seo";
import styles from "./pageLoading/page-loading.module.less";

export interface ILayoutWrapperProps {
  children: React.ReactNode;
  pageKey?: string;
  additionalSeo?: {
    keys?: any;
    description?: any;
    title?: any;
  };
  loading?: boolean;
}

const Layout: React.FC<ILayoutWrapperProps> = ({
  children,
  pageKey = "default",
  additionalSeo,
  loading,
}) => {
  const { t } = useTranslation();

  if (loading)
    return (
      <>
        <Seo
          description={t(`seo:loading.description`)}
          keywords={[]}
          title={t(`seo:loading.title`)}
        />
        <div className={styles.container}>
          <Loading />
        </div>
      </>
    );

  return (
    <>
      <Seo
        description={t(
          `seo:${pageKey}.description`,
          additionalSeo?.description
        )}
        keywords={t(`seo:${pageKey}.keywords`, additionalSeo?.keys).split(", ")}
        title={t(`seo:${pageKey}.title`, additionalSeo?.title)}
      />

      {children}
    </>
  );
};

export default Layout;

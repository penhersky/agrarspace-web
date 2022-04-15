import { useTranslation } from "next-i18next";
import React from "react";

import Seo from "./__seo";

export interface ILayoutWrapperProps {
  children: React.ReactNode;
  pageKey?: string;
  additionalSeo?: {
    keys?: any;
    description?: any;
    title?: any;
  };
}

const Layout: React.FC<ILayoutWrapperProps> = ({
  children,
  pageKey = "default",
  additionalSeo,
}) => {
  const { t } = useTranslation();
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

import Head from "next/head";
import React from "react";

export interface ISeoProps {
  description: string;
  keywords: string[];
  title: string | string[];
}

const SEO: React.FC<ISeoProps> = ({ description, keywords, title }) => (
  <Head>
    <title>{title instanceof Array ? title.join(" | ") : title}</title>
    <meta name="description" content={description} />
    <meta name="twitter:description" content={description} />
    <meta name="og:description" content={description} />
    <meta name="keywords" content={keywords.join(", ")} />
  </Head>
);

export default SEO;

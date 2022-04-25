import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AUTH } from "../../constants/navigation";
import { Locale } from "../../models/services.model";
import { decrypt } from "../../utils/crypto";

export default async ({
  locale,
  params,
}: Locale & GetServerSidePropsContext<{ organizationId: string }>) => {
  try {
    if (typeof params?.organizationId !== "string") throw Error();
    const id = decrypt(params.organizationId);

    /**
     * TODO: Add validation for organization
     */

    return {
      props: {
        organizationId: id,
        ...(await serverSideTranslations(locale)),
      },
    };
  } catch {
    return {
      props: {
        ...(await serverSideTranslations(locale)),
        redirect: {
          permanent: true,
          destination: AUTH.userSingIn,
        },
      },
    };
  }
};

import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AUTH } from "../../constants/navigation";
import { Locale } from "../../models/services.model";
import { decrypt } from "../../utils/crypto";

export default async ({
  locale,
  params,
}: Locale & GetServerSidePropsContext<{ id: string }>) => {
  try {
    if (typeof params?.id !== "string") throw Error();
    const id = decrypt(params.id);

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

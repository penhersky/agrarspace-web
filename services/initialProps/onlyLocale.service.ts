import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Locale } from "../../models/services.model";

export default async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

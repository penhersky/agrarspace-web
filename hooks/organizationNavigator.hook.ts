import { useRouter } from "next/router";
import { useMemo } from "react";

import { AUTH, OZ_PAGES } from "../constants/navigation";
import { decrypt } from "../utils/crypto";
import { capitalizeFirstLetter } from "../utils/string";

type Navigator = () => Promise<boolean>;

interface INavigatorsHook {
  id: string;
  decryptedId: string;
  // eslint-disable-next-line no-unused-vars
  createPath: (page: string) => string;
  goToCalendar: Navigator;
  goToContactUs: Navigator;
  goToDashboard: Navigator;
  goToEmployees: Navigator;
  goToGlobalMap: Navigator;
  goToHelp: Navigator;
  goToOrganization: Navigator;
  goToPlantations: Navigator;
  goToWeather: Navigator;
  goToYields: Navigator;
  goToOrganizationSingIn: Navigator;
}

export default () => {
  const { query, push, replace, pathname, asPath } = useRouter();
  const { organizationId } = query;

  if (typeof organizationId !== "string")
    throw Error(
      "organizationNavigator can only be used in organization dashboard"
    );

  const navigators = useMemo(
    () =>
      Object.keys(OZ_PAGES)
        .map((key) => ({
          [`goTo${capitalizeFirstLetter(key)}`]: () =>
            push(
              "/organization/[organizationId]/[page]",
              `/organization/${organizationId}/${key}`
            ),
        }))
        .reduce((prev, current) => ({ ...prev, ...current })),
    [organizationId, push]
  );

  return {
    id: organizationId,
    decryptedId: decrypt(organizationId),

    createPath: (page) => `/organization/${organizationId}/${page}`,

    ...navigators,

    goToOrganizationSingIn: () =>
      replace(
        AUTH.organizationLogin,
        `${AUTH.organizationLogin.replace(
          "[organizationId]",
          organizationId
        )}?pathname=${pathname}&asPath=${asPath}`
      ),
  } as INavigatorsHook;
};

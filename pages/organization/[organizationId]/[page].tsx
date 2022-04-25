// eslint-disable-next-line simple-import-sort/imports
import { useQuery } from "@apollo/client";
import { Result } from "antd";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Calendar,
  Dashboard,
  Weather,
  Organization,
} from "../../../components/modules";
import { AppHeader, SideBar } from "../../../components/navigation";
import { PageProvider } from "../../../components/providers";
import { OZ_PAGES } from "../../../constants/navigation";
import useOrganizationNavigator from "../../../hooks/organizationNavigator.hook";
import { IOrganization } from "../../../models/entity.model";
import getLocaleProps from "../../../services/initialProps/onlyLocale.service";
import { GET_MY_ORGANIZATION } from "../../../services/schemas/organization.schema";
import styles from "../../../styles/pages/Organization.module.less";

interface IOrganizationQuery {
  getMyOrganization: IOrganization;
}

const OrganizationDashboard: NextPage = () => {
  const { data, loading, error } = useQuery<IOrganizationQuery>(
    GET_MY_ORGANIZATION,
    {
      errorPolicy: "none",
      refetchWritePolicy: "merge",
      fetchPolicy: "cache-first",
    }
  );
  const { createPath } = useOrganizationNavigator();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  if (error) return <div>Organization Error</div>; // TODO: Add Error message

  return (
    <PageProvider loading={loading}>
      {isBrowser ? (
        <BrowserRouter>
          <div className={styles.organization}>
            <SideBar
              organization={{
                logo: "https://tripoli.land/uploads/org/logo/1774/webp_list_harveast_logo.png.webp",
                // logo: "https://tripoli.land/uploads/org/logo/427/webp_list_logo_for-student-2.png.webp",
                name: "test",
              }}
            />

            <div className={styles.content}>
              <AppHeader />
              <Routes>
                <Route
                  path={createPath(OZ_PAGES.dashboard)}
                  element={<Dashboard />}
                />
                <Route
                  path={createPath(OZ_PAGES.organization)}
                  element={
                    <Organization
                      organization={data?.getMyOrganization as IOrganization}
                    />
                  }
                />
                <Route
                  path={createPath(OZ_PAGES.calendar)}
                  element={<Calendar />}
                />
                <Route
                  path={createPath(OZ_PAGES.weather)}
                  element={<Weather />}
                />
                <Route
                  path="*"
                  element={
                    <Result
                      status="404"
                      title="404"
                      subTitle="Sorry, the page you visited does not exist."
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      ) : null}
    </PageProvider>
  );
};

export const getServerSideProps = getLocaleProps;

export default OrganizationDashboard;

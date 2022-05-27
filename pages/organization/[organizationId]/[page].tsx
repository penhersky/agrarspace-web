// eslint-disable-next-line simple-import-sort/imports
import { useQuery } from "@apollo/client";
import { Result } from "antd";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Calendar,
  Dashboard,
  Weather,
  Organization,
  Plantations,
} from "../../../components/modules";
import { AppHeader, SideBar } from "../../../components/navigation";
import { PageProvider } from "../../../components/providers";
import { OZ_PAGES } from "../../../constants/navigation";
import useOrganizationNavigator from "../../../hooks/organizationNavigator.hook";
import { IOrganization } from "../../../models/entity.model";
import { IRootWeather } from "../../../models/weather.model";
import getLocaleProps from "../../../services/initialProps/onlyLocale.service";
import { GET_MY_ORGANIZATION } from "../../../services/schemas/organization.schema";
import { setWeather } from "../../../store/actions";
import styles from "../../../styles/pages/Organization.module.less";

interface IOrganizationQuery {
  getMyOrganization: IOrganization;
}

const OrganizationDashboard: NextPage<{ weather: IRootWeather }> = ({
  weather,
}) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(setWeather(weather));
  }, [dispatch, weather]);

  if (error) return <div>Organization Error</div>; // TODO: Add Error message

  return (
    <PageProvider loading={loading}>
      {isBrowser ? (
        <BrowserRouter>
          <div className={styles.organization}>
            <SideBar
              organization={{
                logo:
                  data?.getMyOrganization.logo ??
                  "https://tripoli.land/uploads/org/logo/1774/webp_list_harveast_logo.png.webp", // TODO: delete it after adding logo logic
                // logo: "https://tripoli.land/uploads/org/logo/427/webp_list_logo_for-student-2.png.webp",
                name: data?.getMyOrganization.name as string,
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
                      organization={
                        {
                          ...data?.getMyOrganization,
                          logo: "https://tripoli.land/uploads/org/logo/1774/webp_list_harveast_logo.png.webp", // TODO: delete it after adding logo logic
                        } as IOrganization
                      }
                    />
                  }
                />
                <Route
                  path={createPath(OZ_PAGES.plantations)}
                  element={<Plantations />}
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

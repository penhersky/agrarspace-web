import { Result } from "antd";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Calendar, Dashboard, Weather } from "../../components/modules";
import { SideBar } from "../../components/navigation";
import { PageProvider } from "../../components/providers";
import { OZ_ROUTES } from "../../constants/navigation";
import getLocaleProps from "../../services/initialProps/onlyLocale.service";
import styles from "../../styles/pages/Organization.module.less";

const OrganizationDashboard: NextPage = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  return (
    <PageProvider>
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
              <Routes>
                <Route path={OZ_ROUTES.dashboard} element={<Dashboard />} />
                <Route path={OZ_ROUTES.calendar} element={<Calendar />} />
                <Route path={OZ_ROUTES.weather} element={<Weather />} />
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

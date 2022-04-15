import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Calendar, Dashboard, Weather } from "../../components/modules";
import { SideBar } from "../../components/navigation";
import { PageProvider } from "../../components/providers";
import { OZ_ROUTES } from "../../constants/navigation";
import getLocaleProps from "../../services/initialProps/onlyLocale.service";

const OrganizationDashboard: NextPage = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  return (
    <PageProvider>
      {isBrowser ? (
        <BrowserRouter>
          <div>
            <SideBar />
            <div>
              <Routes>
                <Route path={OZ_ROUTES.dashboard} element={<Dashboard />} />
                <Route path={OZ_ROUTES.calendar} element={<Calendar />} />
                <Route path={OZ_ROUTES.weather} element={<Weather />} />
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

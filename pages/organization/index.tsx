import React from "react";

import { OZ_ROUTES } from "../../constants/navigation";

const Organization = () => <div>Loading...</div>;

export const getServerSideProps = () => ({
  redirect: {
    permanent: true,
    destination: OZ_ROUTES.dashboard,
  },
});

export default Organization;

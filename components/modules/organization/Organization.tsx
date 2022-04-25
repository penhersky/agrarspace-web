import { Typography } from "antd";
import React from "react";

import { IOrganization } from "../../../models/entity.model";
import { ViewProvider } from "../../providers";

interface IOrganizationProps {
  organization: IOrganization;
}

// eslint-disable-next-line arrow-body-style
const Organization: React.FC<IOrganizationProps> = ({ organization }) => {
  return (
    <ViewProvider>
      <Typography.Title>{organization.name}</Typography.Title>
      <Typography.Text>{organization.description}</Typography.Text>
      <br />
      <Typography.Text>
        Owner: {organization.owner.firstName} {organization.owner.lastName}
      </Typography.Text>
    </ViewProvider>
  );
};

export default Organization;

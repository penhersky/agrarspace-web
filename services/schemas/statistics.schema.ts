import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const ORGANIZATION_PLANTED_AREA = gql`
  query GetOrganizationPlantedAreaPerYear($year: Int!) {
    getOrganizationPlantedAreaPerYear(year: $year) {
      data {
        value
        name
        percent
      }
      totalValue
      totalPercent
    }
  }
`;

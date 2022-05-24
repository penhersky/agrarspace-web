import { gql } from "@apollo/client";

export const GET_MY_ORGANIZATION = gql`
  query GetMyOrganization {
    getMyOrganization {
      id
      name
      description
      confirmed
      owner {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const GET_ORGANIZATION_GENERAL_INFO = gql`
  query GetOrganizationGeneralInfo($data: OrganizationGeneralInfoArgs!) {
    getOrganizationGeneralInfo(data: $data) {
      countOfCultures
      countOfEmployees
      plantationsCount
      plantedResources
      collectedResources
      totalAreaSize
    }
  }
`;

export const GET_TOTAL_ORGANIZATION_ANNUAL_YEAR_INCOME = gql`
  query GetTotalOrganizationAnnualYearsIncome(
    $getTotalOrganizationAnnualYearsIncomeId: ID!
  ) {
    getTotalOrganizationAnnualYearsIncome(
      id: $getTotalOrganizationAnnualYearsIncomeId
    ) {
      maxValue
      avgPlanted
      avgCollected
      data {
        sumPlanted
        sumCollected
        year
      }
    }
  }
`;

import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const PLANTATIONS_LIST = gql`
  query GetOrganizationPlantationList($data: PlantationListArgs!) {
    getOrganizationPlantationList(data: $data) {
      data {
        id
        name
        status
        areaSize
        region
        updatedAt
      }
      pagination {
        totalItemCount
        totalPagesCount
        itemCountPerPage
        currentPage
      }
      option {
        statuses {
          key
          label
        }
        areaSize {
          min
          max
        }
      }
    }
  }
`;

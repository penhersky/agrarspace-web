import { gql } from "@apollo/client";

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

export const CREATE_PLANTATION = gql`
  mutation CreatePlantation($data: PlantationInput!) {
    createPlantation(data: $data) {
      id
    }
  }
`;

export const DELETE_PLANTATION = gql`
  mutation DeletePlantation($deletePlantationId: ID!) {
    deletePlantation(id: $deletePlantationId) {
      id
    }
  }
`;

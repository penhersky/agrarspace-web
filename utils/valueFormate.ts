// eslint-disable-next-line import/prefer-default-export
export const formatNumber = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

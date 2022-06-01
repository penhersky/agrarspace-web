// eslint-disable-next-line import/prefer-default-export
export const formatNumber = (value: number) => {
  if (value < 1) return value;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

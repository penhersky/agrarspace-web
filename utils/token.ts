interface ITokenData {
  token: string;
  expiresIn?: string;
}

type Tokens = "admin" | "device";

export const getTokenDate = (name: Tokens) => {
  const str = localStorage.getItem(name);
  if (typeof str !== "string") return null;
  const data = JSON.parse(str);
  if (!data?.token) return null;

  return data as ITokenData;
};

export const setTokenDate = (name: Tokens, data: ITokenData) =>
  localStorage.setItem(name, JSON.stringify(data));

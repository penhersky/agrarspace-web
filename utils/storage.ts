type Tokens = "admin" | "rToken" | "session";

export const getTokenDate = (name: Tokens) => localStorage.getItem(name);

export const setTokenDate = (name: Tokens, token: string) =>
  localStorage.setItem(name, token);

export const clearStorage = () => localStorage.clear();

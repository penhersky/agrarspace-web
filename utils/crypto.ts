export const encrypt = (value: string) => Buffer.from(value).toString("base64");
export const decrypt = (value: string) => atob(value);

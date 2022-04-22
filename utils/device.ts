const detectOs = (userAgent: string) => {
  if (userAgent.indexOf("Win") !== -1) return "Windows";
  if (userAgent.indexOf("Mac") !== -1) return "Macintosh";
  if (userAgent.indexOf("Linux") !== -1) return "Linux";
  if (userAgent.indexOf("Android") !== -1) return "Android";
  if (userAgent.indexOf("like Mac") !== -1) return "iOS";
  return "unknown";
};

// eslint-disable-next-line import/prefer-default-export
export const useDevice = () => ({ getOs: () => detectOs(navigator.userAgent) });

/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");
const path = require("path");

const { i18n } = require("./next-i18next.config");

const pathToLessFileWithVariables = path.resolve("./styles/variables.less");

const plugins = [
  [
    withLess({
      lessLoaderOptions: {
        additionalData: (content) =>
          `${content}\n\n@import '${pathToLessFileWithVariables}';`,
      },
    }),
    {
      lessLoaderOptions: {},
    },
  ],
];

module.exports = withPlugins(plugins, {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  i18n,
  env: {
    MAIN_ENDPOINT_URL: process.env.MAIN_ENDPOINT_URL,
    WEATHER_API_URL: process.env.WEATHER_API_URL,
    WEATHER_ICON_URL: process.env.WEATHER_ICON_URL,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    MAP_ACCESS_KEY: process.env.MAP_ACCESS_KEY,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
        // for webpack 5 use
        // { and: [/\.(js|ts)x?$/] }
      },

      use: ["@svgr/webpack"],
    });

    return config;
  },
});

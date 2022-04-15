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
});

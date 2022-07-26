const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
        options: {
          source: "tsconfig",
          baseUrl: "./src",
          tsConfigPath: "./tsconfig.paths.json"
        }
      },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A', '@border-radius-base': '4px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
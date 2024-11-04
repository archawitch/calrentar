module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./components",
            "@configs": "./configs",
            "@navigation": "./navigation",
            "@screens": "./screens",
            "@services": "./services",
            "@state": "./state",
            "@styles": "./styles",
            "@types": "./types",
          },
        },
      ],
    ],
  };
};

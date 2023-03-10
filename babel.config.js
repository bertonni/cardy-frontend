module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@contexts": "./src/contexts",
            "@assets": "./src/assets",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@styles": "./src/styles",
            "@fonts": "./src/assets/fonts"
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

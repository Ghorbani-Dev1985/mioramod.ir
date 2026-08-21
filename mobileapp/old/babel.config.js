module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@/app': './src/app',
            '@/components': './src/common/components',
            '@/hooks': './src/common/hooks',
            '@/ui': './src/common/ui',
            '@/utils': './src/common/utils',
            '@/providers': './src/common/providers',
            '@/messages': './src/common/messages',
            '@/constants': './src/common/constants',
            '@/schemas': './src/common/schemas',
            '@/styles': './src/common/styles',
            '@/store': './src/common/store',
            '@/features': './src/features',
            '@': './src',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  '@/app': path.resolve(__dirname, 'src/app'),
  '@/components': path.resolve(__dirname, 'src/common/components'),
  '@/hooks': path.resolve(__dirname, 'src/common/hooks'),
  '@/ui': path.resolve(__dirname, 'src/common/ui'),
  '@/utils': path.resolve(__dirname, 'src/common/utils'),
  '@/providers': path.resolve(__dirname, 'src/common/providers'),
  '@/messages': path.resolve(__dirname, 'src/common/messages'),
  '@/constants': path.resolve(__dirname, 'src/common/constants'),
  '@/schemas': path.resolve(__dirname, 'src/common/schemas'),
  '@/styles': path.resolve(__dirname, 'src/common/styles'),
  '@/store': path.resolve(__dirname, 'src/common/store'),
  '@/features': path.resolve(__dirname, 'src/features'),
  '@': path.resolve(__dirname, 'src'),
};

config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

module.exports = withNativeWind(config, { input: './src/common/styles/global.css' });
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'], 
  },
};

const mergedConfig = mergeConfig(defaultConfig, config);

const finalConfig = wrapWithReanimatedMetroConfig(
  withNativeWind(mergedConfig, { input: './global.css' })
);

module.exports = finalConfig;

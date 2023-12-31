module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@themes': './src/themes',
          '@utils': './src/utils',
          '@services': './src/services',
          '@i18n': './src/i18n',
          '@configs': './src/configs',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}

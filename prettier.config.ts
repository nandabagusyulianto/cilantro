const config = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['<TYPES>', '', '<THIRD_PARTY_MODULES>', '', '^@/(.*)$|^@$'],
  importOrderParserPlugins: ['typescript'],
  importOrderTypeScriptVersion: '5.0.0',
  singleQuote: true,
  semi: false,
}

export default config

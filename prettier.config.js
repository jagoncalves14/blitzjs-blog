module.exports = {
  semi: false,
  printWidth: 100,
  bracketSpacing: false,
  trailingComma: "all",
  override  : [
    {
      files: "*.mdx",
      options: {
        printWidth: 74,
        proseWrap: "always"
      }
    }
  ]
}

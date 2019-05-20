const plugins = [
  [
    "component",
    {
      libraryName: "mint-ui",
      style: true
    }
  ]
];
if (["production", "prod"].includes(process.env.NODE_ENV)) {
  plugins.push("transform-remove-console"); //打包去除console
}
module.exports = {
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry",
        polyfills: ["es6.promise", "es6.symbol"]
      }
    ]
  ],
  plugins: plugins
};

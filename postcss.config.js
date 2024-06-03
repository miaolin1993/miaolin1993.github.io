// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 14, // rem 相对于 px 转换的基准值
      propList: ['*'], // 需要转换的 CSS 属性，* 表示全部
      unitPrecision: 6, // 转换后的小数位数
      exclude: (e) => { // 只对src/views/largeScreen文件进行px转rem，其他文件不转换
        if(/src(\\|\/)twelve(\\|\/)*/.test(e)) {
          return false
        } else {
          return true
        }
      }
    },
  },
};

module.exports = {
  siteUrl: "https://blog.d5v.cc",
  generateRobotsTxt: true, // 启用生成robots.txt文件
  exclude: [
    "/blog/.DS_Store", // 排除Mac系统文件
    "/blog/README.md", // 排除Markdown说明文件
    "/apple-icon.png", // 排除苹果图标
  ],
  // 其他配置选项
};

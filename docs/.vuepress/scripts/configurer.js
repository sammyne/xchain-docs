//export default { this failed
module.exports = {
  getCategories,
}

const categories = [
  { folder: "introduction", title: "介绍" },
  { folder: "quickstart", title: "快速开始" },
  { folder: "design_documents", title: "技术设计文档" },
  { folder: "advanced_usage", title: "进阶使用" },
  { folder: "developing_apps", title: "开发应用" },
  { folder: "development_manuals", title: "开发手册" },
  { folder: "test_network", title: "测试环境" },
  { folder: "other", title: "其他" },
];

function getCategories(version) {
  return categories;
}
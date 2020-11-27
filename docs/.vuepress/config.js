const { fs, path } = require('@vuepress/shared-utils')
const configurer = require("./scripts/configurer.js");

module.exports = {
  title: "XuperChain",
  description: "Document for XuperChain",
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    '@vuepress/html-redirect',
  ],
  themeConfig: {
    logo: "/assets/logo.png",
    lastUpdated: '最近更新时间', // string | boolean
    nav: [
      {
        text: "主页",
        ariaLabel: "版本",
        link: "/v3.8/",
      },
      {
        text: "版本",
        ariaLabel: "版本",
        items: [
          { text: "v3.8", link: "/v3.8/" }
        ]
      },
    ],
    repo: "xuperchain/docs",
    sidebar: {
      "/v3.8/": buildSidebar("v3.8"),
    },

    // "Edit this page"
    docsDir: 'docs',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: '帮助我们改进此页 :)',
  }
}

function buildSidebar(version) {
  const childrenBlacklist = ["README"];

  return configurer.getCategories(version)
    .map(v => ({ ...v, dir: version + "/" + v.folder }))
    .filter(v => hasDir(v.dir))
    .map(v => ({
      ...v,
      children: readDir(v.dir, childrenBlacklist).map(vv => v.folder + "/" + vv),
    }))
    .map(v => ({ title: v.title, collapsable: false, children: v.children, }));
}

function hasDir(dir) {
  return fs.pathExistsSync(path.resolve(__dirname, '../', dir));
}

function readDir(dir, childrenBlacklist) {
  //const sortByIdx = (x, y) => {
  //  let i = x.split("-", 2)[0] | 0;
  //  let j = y.split("-", 2)[0] | 0;

  //  return i - j;
  //};

  if (!childrenBlacklist) {
    childrenBlacklist = [];
  }

  return fs
    .readdirSync(path.resolve(__dirname, '../', dir))
    .filter(filename => filename.endsWith(".md"))
    .map(filename => filename.slice(0, -3))
    .filter(v => !childrenBlacklist.includes(v));
  //.sort(sortByIdx);
}

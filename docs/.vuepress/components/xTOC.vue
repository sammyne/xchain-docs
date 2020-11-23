<template>
  <div>
    <template v-for="c in collections">
      <h2 :id="c.title">
        <a class="header-anchor" :href="'#' + c.title">#</a>
        {{ c.title }}
      </h2>
      <ul>
        <li v-for="page in c.children">
          <a :href="page.path"> {{ page.title }} </a>
          <ul v-if="page.headers.length > 0">
            <li v-for="header in page.headers">
              <a :href="page.path + '#' + header.slug">
                {{ header.title }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    collections() {
      const base = this.$page.path;
      const suffix = ".html";

      const pages = this.$site.pages
        .filter((v) => v.path.startsWith(base) && v.path.endsWith(suffix))
        .map(this.slimDownPage)
        .reduce((out, v) => {
          out[v.path] = v;
          return out;
        }, {});

      const newCollection = (v) => {
        let children = v.children
          .map((v) => base + v + suffix)
          .filter((v) => pages[v])
          .map((v) => pages[v]);

        return {
          title: v.title,
          children,
        };
      };

      //return pages;
      return this.$site.themeConfig.sidebar[base].map(newCollection);
    },
  },
  methods: {
    slimDownPage(page) {
      let headers = [];
      if (page.headers instanceof Array) {
        headers = page.headers
          .filter((v) => v.level == 2)
          .map((v) => ({ title: v.title, slug: v.slug }));
      }

      return {
        headers,
        path: page.path,
        title: page.title,
      };
    },
  },
};
</script>
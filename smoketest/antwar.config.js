const marked = require('marked');

module.exports = {
  output: 'build',
  title: 'Smoke test',
  layout() {
    return require('./layouts/Body');
  },
  paths: {
    '/': {
      title: 'Smoke test',
      path() {
        return require.context(
          'json!yaml-frontmatter!./pages',
          false,
          /^\.\/.*\.md$/
        );
      },
      layouts: {
        page() {
          return require('./layouts/Index').default;
        }
      },
      processPage: {
        url(o) {
          return o.sectionName + '/' + o.fileName.split('.')[0];
        },
        content(o) {
          return marked(o.file.__content);
        }
      },
      redirects: {}
    }
  }
};
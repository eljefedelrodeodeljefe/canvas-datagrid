
/* globals Vue: false */

Vue.config.ignoredElements = ['canvas-datagrid']
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    grid: {
      data: [
        { col1: 'foo', col2: 0, col3: 'a' },
        { col1: 'bar', col2: 1, col3: 'b' },
        { col1: 'baz', col2: 2, col3: 'c' }
      ]
    }
  }
})

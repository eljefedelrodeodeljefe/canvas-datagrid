import DataGrid from './canvas-datagrid.vue'

export function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('canvas-datagrid', DataGrid)
}

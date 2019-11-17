<template>
  <div class="canvas-datagrid" ref="holder">
    <div class="canvas-target" ref="target">
    </div>
  </div>
</template>

<script>

import { GridProvider as CanvasDatagrid } from '../../../lib/main.js'

export default {
  name: 'VueCanvasDatagrid',
  props: {
    value: {
      type: [Array, Object],
      required: false,
      default: undefined
    }
  },
  components: {

  },
  computed: {
    tableData: {
      get () {
        return this.value
      },
      set () {

      }
    }
  },
  canvasDatagrid: null,
  mounted () {
    this.$options.canvasDatagrid = new CanvasDatagrid({
      parentNode: this.$refs.target,
      data: this.tableData,
      height: '100%',
      width: '100%'
    })

    this.$options.canvasDatagrid.attach()
  }
}
</script>

<style>
.canvas-datagrid,
.canvas-target {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

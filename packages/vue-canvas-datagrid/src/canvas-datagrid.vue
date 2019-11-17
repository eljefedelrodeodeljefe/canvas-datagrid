<template>
  <div class="canvas-datagrid" ref="holder">
    <div class="canvas-target" ref="target">
    </div>
  </div>
</template>

<script>

import { GridProvider as CanvasDatagrid } from '../../../lib/main.js'

export default {
  name: 'app',
  components: {

  },
  canvasDatagrid: null,
  mounted () {
    console.log('==============================')
    console.log(this.$refs.target)
    console.log('==============================')
    this.$options.canvasDatagrid = new CanvasDatagrid({ parentNode: this.$refs.target,
      data: [
        { col1: 'foo', col2: 0, col3: 'a' },
        { col1: 'bar', col2: 1, col3: 'b' },
        { col1: 'baz', col2: 2, col3: 'c' }
      ] })

    this.$options.canvasDatagrid.attach()

    console.log('==============================')
    console.log(this.$options.canvasDatagrid)
    console.log('==============================')
  }
}
</script>

<style>
.canvas-datagrid {
  width: 100%;
  height: 100%;
}
</style>

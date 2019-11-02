/* jslint browser: true */
/* globals canvasDatagrid: false */

// eslint-disable-next-line no-unused-vars
function g () {
  'use strict'
  var x
  var grid = canvasDatagrid()
  var data = []
  var schema = []
  data.length = Math.pow(10, 7)
  /// create columns A - Z
  for (x = 0; x < 26; x += 1) {
    schema.push({
      name: String.fromCharCode(65 + x)
    })
  }
  // constrain the height/width or we'd get a really large canvas element
  document.body.appendChild(grid)
  grid.style.height = '100%'
  grid.style.width = '100%'
  grid.schema = schema
  grid.data = data
}

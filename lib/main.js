/* jslint browser: true, unparam: true, todo: true, evil: true */
import _component from './component'
import defaults from './defaults'
import draw from './draw'
import events from './events'
import touch from './touch'
import intf from './intf'
import contextMenu from './contextMenu'
import dom from './dom'
import publicMethods from './publicMethods'

const component = _component()
const modules = [
  defaults,
  draw,
  events,
  touch,
  intf,
  contextMenu,
  dom,
  publicMethods
]

export default function factory (args) {
  args = args || {}
  var i
  var tKeys = ['style', 'formatters', 'sorters', 'filters',
    'treeGridAttributes', 'cellGridAttributes', 'data', 'schema']

  if (window.customElements && document.body.createShadowRoot) {
    i = document.createElement('canvas-datagrid')
    Object.keys(args).forEach(function (argKey) {
      // set data and parentNode after everything else
      if (argKey === 'data') { return }
      if (argKey === 'parentNode') { return }
      // top level keys in args
      if (tKeys.indexOf(argKey) !== -1) {
        tKeys.forEach(function (tKey) {
          if (args[tKey] === undefined || tKey !== argKey) { return }
          if (['formatters', 'sorters', 'filters'].indexOf(argKey) !== -1) {
            if (typeof args[tKey] === 'object' && args[tKey] !== null) {
              Object.keys(args[tKey]).forEach(function (sKey) {
                i[tKey][sKey] = args[tKey][sKey]
              })
            }
          } else {
            i[tKey] = args[tKey]
          }
        })

        return
      }
      // all others are attribute level keys
      i.attributes[argKey] = args[argKey]
    })
    if (args.data) {
      i.data = args.data
    }
    // add to the dom very last to avoid redraws
    if (args.parentNode) {
      args.parentNode.appendChild(i)
    }
    return i
  }

  args.component = false
  i = new Grid(args)

  if (args.parentNode && args.parentNode.appendChild) {
    args.parentNode.appendChild(i)
  }
  return i
}

export class Grid {
  constructor (args) {
    args = args || {}
    var self = {}
    self.isComponent = args.component === undefined
    self.isChildGrid = args.parentNode && /canvas-datagrid-(cell|tree)/.test(args.parentNode.nodeType)

    if (self.isChildGrid) {
      self.intf = {}
    } else {
    // TODO(eljefedelrodeodeljefe): review eval
    // self.isComponent = false
    // self.intf = document.createElement('canvas')
    // eslint-disable-next-line no-eval
      self.intf = self.isComponent ? eval('Reflect.construct(HTMLElement, [], new.target)') : document.createElement('canvas')
    }
    self.args = args
    self.intf.args = args
    self.applyComponentStyle = component.applyComponentStyle
    self.hyphenateProperty = component.hyphenateProperty
    self.dehyphenateProperty = component.dehyphenateProperty
    self.createGrid = function grid (args) {
      args.component = false
      return new Grid(args)
    }
    modules.forEach(function (m) {
      m(self)
    })

    if (self.isChildGrid) {
      self.shadowRoot = args.parentNode.shadowRoot
      self.parentNode = args.parentNode
    } else if (self.intf.createShadowRoot) {
      self.shadowRoot = self.intf.attachShadow({ mode: 'open' })
      self.parentNode = self.shadowRoot
    } else {
      self.parentNode = self.intf
    }
    self.init()

    return self.intf
  }
}

if (window.HTMLElement) {
  Grid.prototype = Object.create(window.HTMLElement.prototype)
}

export class GridProvider {
  constructor (args) {
    this.args = args
    this.grid = new Grid(args)

    this.handleCommonOptions()
  }

  attach () {
    this.args.parentNode.appendChild(this.grid)
  }

  handleCommonOptions () {
    if (this.args.height) this.grid.style.height = this.args.height
    if (this.args.width) this.grid.style.width = this.args.width
  }
}

// TODO(eljefedelrodeodeljefe): try to remove all of the following logic

// export web component
if (window.customElements) {
  Grid.observedAttributes = component.getObservableAttributes()
  Grid.prototype.disconnectedCallback = component.disconnectedCallback
  Grid.prototype.attributeChangedCallback = component.attributeChangedCallback
  Grid.prototype.connectedCallback = component.connectedCallback
  Grid.prototype.adoptedCallback = component.adoptedCallback
  window.customElements.define('canvas-datagrid', Grid)
}
// export global
if (window && !window.canvasDatagrid && !window.require) {
  window.canvasDatagrid = function (args) { return new Grid(args) }
}

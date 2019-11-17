var supportsPassive = false
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true
    }
  })
  window.addEventListener('testPassive', null, opts)
  window.removeEventListener('testPassive', null, opts)
} catch (e) { }

export function passiveListenersSupported () {
  return supportsPassive
}

export function maybeInjectPassive () {
  return supportsPassive ? { passive: true } : false
}

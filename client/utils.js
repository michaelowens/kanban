let matchesFn = ''

;['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(fn => {
  if (typeof document.body[fn] === 'function') {
    matchesFn = fn
    return true
  }

  return false
})

export function closest (el, selector) {
  let parentElement = el
  while (parentElement) {
    parentElement = parentElement.parentElement

    if (parentElement && parentElement[matchesFn](selector)) {
      return parentElement
    }
  }

  return null
}

export function hasParent(el, selector) {
  return !!closest(el, selector)
}

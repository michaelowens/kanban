/** Wrapper for fetch */
function VueFetch() {
}

VueFetch.install = (Vue, options) => {
  let handleError = (err) => {
    console.error('Caught error with AJAX:', err)
  }

  let jsonCall = (url, options) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => {
          resolve(response.json())
        })
        .catch(handleError)
    })
  }

  Vue.prototype.$fetch = {
    json (url) {
      return jsonCall(url)
    },

    postJson (url, data) {
      return jsonCall(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
  }
}

export default VueFetch

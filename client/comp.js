export default (config) => {
  return (resolve, reject) => {
    if (!('templateURL' in config)) {
      config.render = () => {}
      resolve(config)
      return
    }

    fetch(config.templateURL)
      .then(response => response.text())
      .then(template => {
        config.template = template
        resolve(config)
      })
  }
}
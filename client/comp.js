export default (config) => {
  return (resolve, reject) => {
    fetch(config.templateURL)
      .then(response => response.text())
      .then(template => {
        config.template = template
        resolve(config)
      })
  }
}
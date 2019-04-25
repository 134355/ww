let events = {}
let instance = null

function returnActives (eventName) {
  let actives = events[eventName]
  if (Array.isArray(actives)) {
    return actives
  }
  return events[eventName] = []
}

class Event {
  on (eventName, callback) {
    returnActives(eventName).push(callback)
  }
  emit (eventName, param) {
    returnActives(eventName).forEach(callback => {
      callback(param)
    })
  }
  off (eventName, callback) {
    let actives = returnActives(eventName)
    if (typeof (callback) === 'function') {
      for (let i = 0; i < actives.length; i++) {
        if (actives[i] === callback) {
          actives.splice(i, 1)
          break
        }
      }
    } else if (callback === true) {
      events[eventName] = []
    }
  }
  once (eventName, callback) {
    function callbackWrap (params) {
      callback(params)
      app.off(eventName, callbackWrap)
    }
    app.on(eventName, callbackWrap)
  }
} 

class ProxyEvents {
  constructor () {
    return instance || (instance = new Event())
  }
}

export default ProxyEvents

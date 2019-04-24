class CacheCell {
  constructor (data, timeout) {
    this.data = data
    this.timeout = timeout
    this.createTime = Date.now()
  }
}

let cacheMap =  new Map()
let instance = null

function isTimeout (name) {
  const data = cacheMap.get(name)
  if (!data) return true
  const currentTime = Date.now()
  const overTime = (currentTime - data.createTime) / 1000
  if (overTime > data.timeout) {
    cacheMap.delete(name)
    return true
  }
  return false
}

class Cache {
  set (name, data, timeout = 1200) {
    const cachecell = new CacheCell(data, timeout)
    return cacheMap.set(name, cachecell)
  }
  get (name) {
    return isTimeout(name) ? null : cacheMap.get(name).data
  }
  delete (name) {
    return cacheMap.delete(name)
  }
  has (name) {
    return !isTimeout(name)
  }
  clear () {
    return cacheMap.clear()
  }
}

class ProxyCache {
  constructor () {
    return instance || (instance = new Cache())
  }
}

export default ProxyCache

| 事件名            | 参数                                                         | 说明                                 | 返回值             |
| ----------------- | ------------------------------------------------------------ | ------------------------------------ | ------------------ |
| set               | name缓存的key,data缓存的数据,timeout(必须数字单位s)缓存时间，默认缓存1200s | 设置缓存数据                         | Map集合            |
| get               | name缓存的key                                                | 获取数据(缓存过期将返回null)         | 返回缓存的数据data |
| delete            | name缓存的key                                                | 删除数据                             | true/false         |
| has               | name缓存的key                                                | 检查值                               | true/false         |
| clear             | -                                                            | 清空缓存数据                         | -                  |
| setTimeoutDefault | timeout(必须数字单位s)                                       | 设计默认缓存过期时间（只能设置一次） | -                  |

## 使用代理模式实现的单例

不管在哪import引入cache缓存器对象都只有一个

## 示例

```
import Cache from './min-cache'
const cache = new Cache()

cache.setTimeoutDefault(1800) 注意只能设置一次否则报错

cache.set('cache', {cache: 111111}, 1000) 这条数据缓存1000秒

cache.get('cache') 返回{cache: 111111} 若是过了1000秒后将会返回null

cache.has('cache') 检查key为cache对应的缓存数据是否还在

cache.delete('cache') 删除key为cache对应的缓存数据

cache.clear() 清空全部缓存数据
```


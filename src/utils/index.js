
const formatTree = (source) => {
  source = [{ id: 1, pid: 0 }, { id: 2, pid: 1 }, { id: 3, pid: 1 }, { id: 4, pid: 2 }, { id: 5, pid: 3 }]
  var result = []
  function setChild (item, parents) {
    for (var i = 0; i < parents.length; i++) {
      if (item.pid === parents[i].id) { // 匹配到pid，是它的子级
        if (parents[i].children) { // 如果有子级，则加入其中
          parents[i].children.push(item)
        } else { // 没有子级，则创建新数组设置其子级
          parents[i].children = [item]
        }
        break
      } else { // 没有匹配到，继续向其子级匹配
        if (parents[i].children) {
          setChild(item, parents[i].children)
        }
      }
    }
  }
  // 取出根节点，约定好 pid=0 为根节点
  for (var i = source.length - 1; i >= 0; i--) {
    if (source[i].pid === 0) {
      result.push(source[i]) // 放到新数组
      source.splice(i, 1) // 从源数组中移除
    }
  }
  // 取出子级（源数组中全部为子级，根节点已移除）
  for (var j = 0; j < source.length; j++) {
    setChild(source[j], result)
  }
  return result
}

export default {
  formatTree
}

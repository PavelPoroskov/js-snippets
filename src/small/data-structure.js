export class ExtraSet extends Set {
  addList(list) {
    list.forEach((i) => {
      super.add(i);
    })
  }
}

export class ExtraMap extends Map {
  accumulateSum(key, addValue) {
    super.set(key, (super.get(key) || 0) + addValue)
  }
  accumulateMerge(key, updateObj) {
    super.set(key, {
      ...super.get(key),
      ...updateObj,
    })
  }
  accumulateList(key, inItem) {
    const item = inItem === undefined ? [] : inItem
    // item -- single item or array
    const ar = super.get(key) || []
    super.set(key, ar.concat(item))
  }
}
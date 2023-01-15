export function createUniqueId(item) {
  return {...item, uniqueId: (item._id + (new Date()).getTime())};
}

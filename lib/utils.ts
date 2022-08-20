export function insertALL<T>(
  items: T[],
  map: Record<string, T[]>,
  order: string[]
) {
  map["ALL"] = items;
  order.splice(0, 0, "ALL");
}

export function categorize<T>(items: T[], prio: string[]) {
  const map: Record<string, T[]> = {};

  for (const item of items as (T & { category: string })[]) {
    (map[item.category] || (map[item.category] = [])).push(item);
  }

  const prioMap = new Map(prio.map((key, index) => [key, index]));
  const order = Object.keys(map)
    .sort((a, b) => {
      return a > b ? -1 : 1;
    })
    .sort((a, b) => {
      return (prioMap.get(a) ?? Infinity) < (prioMap.get(b) ?? Infinity)
        ? -1
        : 1;
    });

  return { map, order };
}

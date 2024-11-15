export interface navItem {
  name: string,
  path: string
}
export interface coordinatesType {
  x: number
  y: number
}

export function get_current_item_coordinates(item: object): coordinatesType {
  const rect = (item as HTMLElement).getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  return { x, y }
}

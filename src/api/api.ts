export function getRandomInt(min: number, max: number): number {
  // 确保最小值和最大值都是整数
  min = Math.ceil(min)
  max = Math.floor(max)
  // 生成并返回随机整数
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function getRandomUniqueNumbers(min: number, max: number, count: number): number[] {
  // 生成从 min 到 max 的数字数组
  const numbers = Array.from({ length: max - min + 1 }, (_, index) => min + index)

  // 打乱数组
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // 随机索引
    // 交换元素
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }

  // 返回前 count 个数字
  return numbers.slice(0, count)
}

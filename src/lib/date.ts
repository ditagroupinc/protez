export type CurrentMonth = {
  monthIndex: number
  year: number
}

export const getCurrentMonth = (now: Date = new Date()): CurrentMonth => ({
  monthIndex: now.getUTCMonth(),
  year: now.getUTCFullYear(),
})

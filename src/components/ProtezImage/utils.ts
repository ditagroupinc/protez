export const getPath = (src: string, external: boolean): string => {
  if (external) {
    return src
  }

  return `/${src}`
}

export const getPath = (src: string, external: boolean, environment: string): string => {
  if (external) {
    return src
  }

  if (environment === 'pages') {
    return `/protez/${src}`
  }

  return `/${src}`
}

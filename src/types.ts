export enum Languages {
  english = 'english',
  ukrainian = 'ukrainian',
}

export type BilingualText = {
  [Languages.english]: string
  [Languages.ukrainian]: string
}

export enum Languages {
  English = 'english',
  Ukrainian = 'ukrainian',
}

export type BilingualText = {
  [Languages.English]: string
  [Languages.Ukrainian]: string
}

export type FormStatus = 'isLoading' | 'error' | 'sent' | 'default'

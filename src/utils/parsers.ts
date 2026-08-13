import * as cheerio from 'cheerio'

export interface SingleNews {
  image: string
  date: string
  address: string
  link: string
  logo: string
  title: string
  text: string
}
export interface SingleEvent {
  image: string
  startDate: string
  endDate: string
  title: string
  location: string
  link: string
}

export interface SinglePressRelease {
  image: string
  date: string
  title: string
  text: string
}

export function parseNews(postContent: string) {
  const $ = cheerio.load(postContent)

  const news: SingleNews[] = []

  $('.wp-block-group.newsCard').each((index, element) => {
    const $element = $(element)

    const image = $element.find('.newsCardImage img').attr('src')

    const date = $element.find('.newsCardDate').text().trim()
    const address = $element.find('.newsCardAddress').text().trim()

    const link = $element.find('.newsCardLink a').attr('href') // New line to extract the 'link' value

    const logo = $element.find('.newsCardLogo img').attr('src')
    const title = $element.find('.newsCardTitle').text().trim()
    const text = $element.find('.newsCardText').text().trim()

    news.push({
      image,
      date,
      address,
      link,
      logo,
      title,
      text,
    } as SingleNews)
  })

  return news as SingleNews[]
}

export function parseEvents(upcomingEventsContent: string) {
  const $ = cheerio.load(upcomingEventsContent)

  const upcomingEvents: SingleEvent[] = []

  $('.upcomingEventsCard').each((index, element) => {
    const $card = $(element)

    const imageSrc = $card.find('.upcomingEventsCardImage img').attr('src')

    const startDate = $card.find('.upcomingEventsCardStartDate p').text()
    const endDate = $card.find('.upcomingEventsCardEndDate p').text()
    const title = $card.find('.upcomingEventsCardTitle h3').text()
    const location = $card.find('.upcomingEventsCardLocation p').text()
    const link = $card.find('.upcomingEventsCardLink a').attr('href')

    const event = {
      image: imageSrc,
      startDate,
      endDate,
      title,
      location,
      link,
    }

    upcomingEvents.push(event as SingleEvent)
  })

  return upcomingEvents as SingleEvent[]
}

export function parsePressRelease(postContent: string) {
  const $ = cheerio.load(postContent)

  const pressReleases: SinglePressRelease[] = []

  $('.wp-block-group.pressReleaseCard').each((index, element) => {
    const $element = $(element)

    const image = $element.find('.pressReleaseCardImage img').attr('src')

    const date = $element.find('.pressReleaseCardDate').text().trim()

    const title = $element.find('.pressReleaseCardTitle').text().trim()
    const text = $element.find('.pressReleaseCardText').text().trim()

    pressReleases.push({
      image,
      date,
      title,
      text,
    } as SinglePressRelease)
  })

  return pressReleases as SinglePressRelease[]
}

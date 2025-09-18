export interface Services {
  name: string
  description: string
  images: string[]
  priceId: string
  unit_amount: number
}

export interface VideoMedia {
  title: string
  content: any
  thumbnail: string
  description: string
  community: {
    starRating: {
      count: number
      average: number
      min: number
      max: number
    }
    statistics: {
      views: number
    }
  }
}
export interface Video {
  id: string
  channelId: string
  videoId: string
  title: string
  link: string
  author: string
  published: Date
  updated: Date
  media: VideoMedia
}

export interface SocialMedia {
  id: number
  uri: string
  type: string
}

export interface User {
  id: number
  email: string
  avatar: string
  role: string
  createdAt: Date
  discord: {
    id: string
    avatar: string
    email: string
  }
}

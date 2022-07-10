// @@Fetching Interfaces

export interface SearchCriteria {
  slug: string
  categories: string[]
  groupSubCategories: string[]
  subCategories: string[]
  tags: string[]
  status: string
  createdAt: number
  updatedAt: number
}

export type geolocation = {
  lat: number
  lng: number
}


export * from './ChatsInterfaces'
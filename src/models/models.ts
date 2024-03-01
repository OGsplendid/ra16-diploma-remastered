export interface IProduct {
  id: number
  category: number
  title: string
  images: string[]
  sku: string
  manufacturer: string
  color: string
  material: string
  reason: string
  season: string
  heelSize: string
  price: number
  oldPrice: number
  sizes: Size[]
}

export interface ICartProduct {
  product: IProduct | undefined,
  quantity: number,
  checkedSize: string,
  priceSum: number,
}

export interface IHit {
  id: number
  category: number
  title: string
  images: string[],
  price: number,
}

export interface Size {
  size: string,
  available: boolean,
}

export interface ICategory {
  "id": number,
  "title": string,
}

export interface IOrder {
  owner: {
    phone: string,
    address: string,
  },
  items: IItem[],
}

export interface IItem {
    id: number | undefined,
    price: number | undefined,
    count: number,
}

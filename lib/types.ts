export interface Product {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    image: string
    category: string
    onSale?: boolean
    storeId?: string
  }
  
  export interface Store {
    id: string
    name: string
    logo: string
    address: string
    isOpen: boolean
    distance?: string
  }
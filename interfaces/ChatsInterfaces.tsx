// @CHATS Interfaces de chats

export interface Notification {
  _id: string,
  message: string,
  createdAt: Date,
  readAt?: Date
}

export interface Contact {
  _id: string,
  uid: string,
  type: string,
  onLine: onLine,
  nickName: string,
  photoURL: string
  correo: string,
  eventos: Event[]
}

interface permission {
  title: string
  value: string
}

export interface detalles_compartidos_array {
  uid: string
  email: string
  displayName: string
  photoURL: string
  onLine: onLine
  permissions?: permission[]
  owner?: boolean
  createdAt?: Date
  updatedAt?: Date
  icon?: any
}

export interface Event {
  _id: string,
  nombre: string
  compartido_array: string[]
  detalles_compartidos_array: detalles_compartidos_array[]
  usuario_id: string
}
export interface Chat {
  _id: string
  addedes: addedes[]
  messages: messageChat[]
  createdAt: number
  updatedAt: number
  onLine: string
  title: string
  type: string
  photoURL: string
}
interface onLine {
  status: Boolean
  dateConection: number
}
interface addedes {
  userUid: string
  type: string
  online: boolean
}

export interface messageChat {
  type: string
  emitUserUid: string
  message: string
  fileUrl: string
  createdAt: number
  received: boolean
  read: boolean
  deletedEmit: boolean
  deletedReceiv: boolean
}

interface online {
  status: boolean
  dateConection: number
}

export interface image {
  _id: string
  i1024: string
  i800: string
  i640: string
  i320: string
}
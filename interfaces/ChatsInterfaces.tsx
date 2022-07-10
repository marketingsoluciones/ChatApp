// @CHATS Interfaces de chats
export interface Contact {
  _id: string,
  uid: string,
  nickName: String,
  correo: String,
  eventos: evento[]
}
interface evento {
  _id: string,
  nombre: string
}
export interface Chat {
  _id: string
  addedes: addedes[]
  messages: messageChat[]
  createdAt: number
  updatedAt: number
  onLine: online
  title: string
  type: string
  photoURL: string
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
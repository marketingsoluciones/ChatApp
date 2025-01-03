import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Cookies from 'js-cookie';
import { io } from "socket.io-client";
//import { getCookie } from './utils/Cookies';
import { getAuth } from "firebase/auth";
import { parseJwt } from "./utils/Authentication";
import { varGlobalDomain, varGlobalDevelopment, varGlobalSubdomain } from "./context/AuthContext"

const instance: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })
const instanceApp: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL_APP })

interface dataQuery {
    query: string
    variables: any
}

interface ApisGraphql {
    data: dataQuery | FormData
}

interface SocketConnet {
    token: string
    development: string
    origin: string
}

type Fetching = {
    ApiBodas: (args: ApisGraphql) => Promise<any>
    ApiApp: (args: ApisGraphql) => Promise<any>
    restCountries: CallableFunction
    socketIOBodas: ({ token, development, origin }: SocketConnet) => any
    socketIOApp: ({ token, development, origin }: SocketConnet) => any
}

export const api: Fetching = {
    ApiBodas: async ({ data }: ApisGraphql) => {
        if ('query' in data && 'variables' in data) {
        }
        let idToken = Cookies.get("idTokenChat")
        if (getAuth().currentUser) {
            //idToken = Cookies.get("idTokenChat")
            if (!idToken) {
                idToken = await getAuth().currentUser?.getIdToken(true)
                const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
                Cookies.set("idTokenChat", idToken ?? "", { domain: process.env.NEXT_PUBLIC_PRODUCTION ? varGlobalDomain : process.env.NEXT_PUBLIC_DOMINIO, expires: dateExpire })
            }
        }
        return axios.post('https://api.bodasdehoy.com/graphql', data, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                Development: varGlobalDevelopment,
            }
        })
    },

    ApiApp: async ({ data }: ApisGraphql) => {
        let idToken = Cookies.get("idTokenChat")
        if (getAuth().currentUser) {
            //idToken = Cookies.get("idTokenChat")
            if (!idToken) {
                idToken = await getAuth().currentUser?.getIdToken(true)
                const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
                Cookies.set("idTokenChat", idToken ?? "", { domain: process.env.NEXT_PUBLIC_PRODUCTION ? varGlobalDomain : process.env.NEXT_PUBLIC_DOMINIO, expires: dateExpire })
            }
        }
        return axios.post('https://apiapp.bodasdehoy.com/graphql', data, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                Development: varGlobalDevelopment,
            }
        })
    },

    restCountries: async (): Promise<AxiosResponse> => {
        return await axios.get('https://restcountries.com/v3.1/all')
    },

    socketIOBodas: ({ token, development, origin }: SocketConnet) => {
        const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
            auth: {
                token: `Bearer ${token}`,
                development,
                origin
            }
        })
        return socket
    },

    socketIOApp: ({ token, development, origin }: SocketConnet) => {
        const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL_APP}`, {
            auth: {
                token: `Bearer ${token}`,
                development,
                origin
            }
        })
        return socket
    }


}




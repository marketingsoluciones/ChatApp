import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Cookies from 'js-cookie';
import { io } from "socket.io-client";
//import { getCookie } from './utils/Cookies';


type Fetching = {
    graphql: CallableFunction
    graphqlApp: CallableFunction
    youtube: CallableFunction
    restCountries: CallableFunction
    socketIO: CallableFunction
}



const instance: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })
const instanceApp: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL_APP })


export const api: Fetching | any = {
    graphql: async (data: object, token: string): Promise<AxiosResponse> => {
        let tokenFinal: string | null = token || Cookies.get("idToken") || ""
        return await instance.post("/graphql", data, {
            headers: {
                Authorization: `Bearer ${tokenFinal}`
            }
        })
    },
    graphqlApp: async (data: object, token: string): Promise<AxiosResponse> => {
        let tokenFinal: string | null = token || Cookies.get("idToken") || ""
        return await instanceApp.post("/graphql", data, {
            headers: {
                Authorization: `Bearer ${tokenFinal}`
            }
        })
    },
    youtube: async (data: any): Promise<AxiosResponse> => {
        return await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                key: process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE,
                part: "id,snippet",
                order: "date",
                channelId: "UCuQNm4bt_zQc5miwSm4WYXA"
            }
        })
    },
    restCountries: async (): Promise<AxiosResponse> => {
        return await axios.get('https://restcountries.com/v3.1/all')
    },

    socketIO: ({ token }: { token: string }) => {
        const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
            auth: {
                token: `Bearer ${token}`
            }
        })

        return socket
    }
}




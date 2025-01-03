export interface ConfigDevelopment {
    name: string
    development: string
    fileConfig: FirebaseConfig
    cookie: string | null
    domain: string
    cookieGuest: string
    pathDomain: string
    pathLogin: string
    pathSignout?: string
    pathPerfil?: string
    pathDirectory?: string
    logoDirectory: string | JSX.Element
    navbarDirectory?: OptionsPath[]
    headTitle: string
    theme: Theme
    favicon?: string
}

export interface FirebaseConfig {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
}

export interface OptionsPath {
    title: string
    path: string
}

export interface Theme {
    primaryColor: string
    secondaryColor: string
    tertiaryColor: string
    baseColor: string
    colorScroll: string
}
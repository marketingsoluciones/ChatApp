import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { createContext, FC, useState, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { fetchApi, queries } from "../utils/Fetching";
import Cookies from 'js-cookie'
import { signInWithCustomToken } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { developments } from "../firebase";
import { useRouter } from "next/router";
import { ConfigDevelopment } from "../utils/Interfaces";
//import { LoadingContextProvider } from "./LoadingContext";
export let varGlobalDomain = ""
export let varGlobalSubdomain = ""
export let varGlobalDevelopment = ""

const develop = process.env.DEVELOP

export const parseJwt = (token: string) => {
  if (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  return {}
}

export interface UserMax extends User {
  city?: string;
  country?: string;
  weddingDate?: Date;
  role?: string[];
  accessToken?: string;
  _id?: string;
}
type EmailPassword = {
  email: string | undefined,
  password: string | undefined
}
type Context = {
  user: Partial<UserMax | null>;
  setUser: Dispatch<SetStateAction<Partial<UserMax | null>>>;
  emailPassword?: EmailPassword,
  setEmailPassword?: any
  setUserTemp: Dispatch<SetStateAction<Partial<UserMax | null>>>;
  userTemp: Partial<UserMax | null>;
  config: ConfigDevelopment
  verificationDone: boolean,
};

const initialContext: Context = {
  user: null,
  setUser: (user) => { },
  emailPassword: { email: undefined, password: undefined },
  setEmailPassword: () => { },
  setUserTemp: (user) => { },
  userTemp: null,
  config: developments[0],
  verificationDone: false
};
const AuthContext = createContext<Context>(initialContext);

const AuthProvider: FC = ({ children }): JSX.Element => {
  //const { loading, setLoading } = LoadingContextProvider()
  const [user, setUser] = useState<Partial<UserMax | null>>(null);
  const [emailPassword, setEmailPassword] = useState();
  const [userTemp, setUserTemp] = useState<Partial<UserMax | null>>(null);
  const [triggerAuthStateChanged, setTriggerAuthStateChanged] = useState<number | null>(null)
  const [isStartingRegisterOrLogin, setIsStartingRegisterOrLogin] = useState<boolean>()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [config, setConfig] = useState<ConfigDevelopment>(developments[0]);
  const router = useRouter()
  const [verificationDone, setVerificationDone] = useState<boolean>(false);


  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    return () => {
      setIsMounted(false)
    }
  }, [])

  let resp: any = undefined

  useEffect(() => {
    if (isMounted) {
      /* console.log(window.location) */
      const path = window.location.hostname
      //  const path = "https://www.eventosplanificador.com"
      /*  console.log("hostname:", path) */
      const c = path?.split(".")
      const idx = c?.findIndex(el => el === "com" || el === "mx")
      /* console.log("isProduction:", idx) */
      /*--------------------------------------------------------------------*/
      const devDomain = ["bodasdehoy", "eventosplanificador", "eventosorganizador", "vivetuboda", "champagne-events", "annloevents", "miamorcitocorazon", "eventosintegrados"]
      const devSubdomain = [undefined, "invitado", "ticket"]
      const domainDevelop = !!idx && idx !== -1 ? c[idx - 1] : devDomain[4] /*<<<<<<<<<*/
      const subdomainDevelop = idx === -1 && devSubdomain[0] /*<<<<<<<<<*/
      /*--------------------------------------------------------------------*/
      resp = developments.filter(elem => elem.name === domainDevelop)[0]
      resp.subdomain = ["ticket", "testticket", "invitado", "testinvitado", "dev"].includes(c[0]) ? c[0] : subdomainDevelop

      //redireccion a: /RelacionesPublicas
      if (["ticket", "testticket"].includes(resp.subdomain) && window.location.pathname.split("/")[1] === "") {
        router.push("/RelacionesPublicas")
      }

      if (idx === -1 || window.origin.includes("://test")) {
        const directory = window.origin.includes("://test") ? process.env.NEXT_PUBLIC_DIRECTORY?.replace("//", "//test.") : process.env.NEXT_PUBLIC_DIRECTORY
        /* console.log(window.origin, window.location.hostname, directory) */
        resp = {
          ...resp,
          domain: process.env.NEXT_PUBLIC_PRODUCTION ? resp?.domain : process.env.NEXT_PUBLIC_DOMINIO,
          pathDirectory: resp?.pathDirectory ? `${directory}` : undefined,
          pathLogin: resp?.pathLogin ? `${directory}/login` : undefined,
          pathSignout: resp?.pathSignout ? `${directory}/signout` : undefined,
          pathPerfil: resp?.pathPerfil ? `${directory}/configuracion` : undefined
        }
        /* console.log(222215, { domain: resp?.domain }) */
      }

      varGlobalDomain = resp?.domain
      varGlobalSubdomain = resp?.subdomain
      varGlobalDevelopment = resp?.development
      console.log(resp)
      setConfig(resp)
      try {
        initializeApp(resp?.fileConfig)
        console.log(100051, getAuth())
      } catch (error) {
        console.log(90001, error)
      }
    }
  }, [isMounted])

  // useEffect(() => {
  //   if (isMounted && config) {
  //     getAuth().onAuthStateChanged(async (user: any) => {
  //       const sessionCookie = Cookies.get("sessionChat");
  //       develop && console.info("Verificando cookie", sessionCookie);
  //       if (sessionCookie) {
  //         develop && console.info("Tengo cookie de sesion");
  //         if (user) {
  //           develop && console.info("Tengo user de contexto firebase");
  //           const moreInfo: any = await fetchApi({
  //             query: queries.getUser,
  //             variables: { uid: user?.uid },
  //             apiRoute: "ApiBodas",
  //             type: "json",
  //           }).then(() => {
  //             //setLoading(false)
  //             setVerificandoCookie(true)
  //           })
  //           develop && moreInfo && console.info("Tengo datos de la base de datos");
  //           setUser({ ...user, ...moreInfo });
  //           develop && console.info("Guardo datos en contexto react");
  //         } else {
  //           develop && console.info("NO tengo user de contexto de firebase");
  //           develop && console.log("queries.authStatus", queries.authStatus)
  //           develop && console.log("sessionCookie", sessionCookie)
  //           const asdf: any = await fetchApi({
  //             query: queries.authStatus,
  //             variables: { sessionCookie },
  //             apiRoute: "ApiBodas",
  //             type: "json",
  //           }).then(() => {
  //             //setLoading(false)
  //             setVerificandoCookie(true)
  //           })
  //           develop && console.log("asdf", asdf)
  //           const customToken = asdf?.customToken
  //           develop && console.info("Llamo con mi sessionCookie para traerme customToken");
  //           customToken && signInWithCustomToken(getAuth(), customToken);
  //           develop && console.info("Hago sesion con el custom token");
  //         }
  //       } else {
  //         setVerificandoCookie(true)
  //       }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (isMounted && config) {
      onAuthStateChanged(getAuth(), async () => {
        setTriggerAuthStateChanged(new Date().getTime())
      });
    }
  }, [config]);

  useEffect(() => {
    if (triggerAuthStateChanged && !isStartingRegisterOrLogin) {
      const user = getAuth().currentUser
      const sessionCookie = Cookies.get(config?.cookie ?? "") ?? ""
      verificator({ user, sessionCookie })
    }
    if (isStartingRegisterOrLogin) {
      setIsStartingRegisterOrLogin(false)
    }
  }, [triggerAuthStateChanged])

  const moreInfo = async (user: UserMax) => {
    /* console.log("moreInfo") */
    let idToken = Cookies.get("idTokenChat")
    if (!idToken) {
      idToken = await getAuth().currentUser?.getIdToken(true)
      const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
      Cookies.set("idTokenChat", idToken ?? "", { domain: process.env.NEXT_PUBLIC_PRODUCTION ? varGlobalDomain : process.env.NEXT_PUBLIC_DOMINIO, expires: dateExpire })
    }
    const moreInfo = await fetchApi({
      query: queries.getUser,
      variables: { uid: user?.uid },
      type: "json",
      apiRoute: "ApiBodas",
    });
    /* moreInfo && console.info("Tengo datos de la base de datos"); */
    /* console.log(100.004) */
    setUser({ ...user, ...moreInfo });
    //aqui fetch de accesed
    setVerificationDone(true)
    /* console.info("Guardo datos en contexto react"); */
  }

  interface props {
    user: UserMax | null
    sessionCookie: string
  }

  const verificator = async ({ user, sessionCookie }: props) => {
    try {
      /* console.log(80000301, { "user?.uid": user?.uid }) */
      const sessionCookieParsed = parseJwt(sessionCookie)
      /* console.log(80000302, { "sessionCookieParsed?.user_id": sessionCookieParsed?.user_id }) */

      if (!sessionCookieParsed?.user_id && user?.uid) {
        /* console.log(0.00001) */
        getAuth().signOut().then(() => {
          setVerificationDone(true)
        })
      }

      if (sessionCookieParsed?.user_id && user?.uid) {
        if (sessionCookieParsed?.user_id !== user?.uid) {
          /*  console.log(0.00002) */
          getAuth().signOut().then(() => {
            /*  console.log(8000043, "signOut con éxito") */
            setVerificationDone(true)
          })
            .catch((error) => {
              console.log(error);
            });
        }

        if (sessionCookieParsed?.user_id === user?.uid) {
          /*  console.log(0.00003) */
          setUser(user)
          moreInfo(user)
        }
      }

      if (sessionCookieParsed?.user_id && !user?.uid) {
        /*  console.log(0.00004) */
        const resp = await fetchApi({
          query: queries.authStatus,
          variables: { sessionCookie },
          type: "json",
          apiRoute: "ApiBodas",
        });
        /* console.info("Llamo con mi sessionCookie para traerme customToken"); */
        if (resp?.customToken) {
          /* console.info("customTokenParse", parseJwt(resp.customToken)) */
          setIsStartingRegisterOrLogin(true)
          await signInWithCustomToken(getAuth(), resp.customToken)
            .then(result => {
              /* console.log(100.002) */
              setUser(result?.user)
              moreInfo(result?.user)
            }).catch(error => {
              console.log(error)
            })
        } else {
          /* console.log(0.00006) */
          //cambiar el tiempo duracion de sessioncookie y una semana, hacerlo coincidir expiracion de la cookie para que se borre y evaluarlo como se hace con los idtoken que si no exite se renueve
          setVerificationDone(true)
        }
      }

      if (!sessionCookieParsed?.user_id && !user?.uid) {
        /*   console.log(0.00005) */
        setVerificationDone(true)
      }

    } catch (error) {
      console.log(90002, error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, userTemp, setUserTemp, emailPassword, setEmailPassword, config, verificationDone }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext);

export { AuthProvider, AuthContextProvider };

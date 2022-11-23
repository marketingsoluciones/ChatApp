import { User } from "@firebase/auth";
import {
  createContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import { auth } from "../firebase";
import { fetchApi, queries } from "../utils/Fetching";
import Cookies from 'js-cookie'
import { signInWithCustomToken } from "firebase/auth";
//import { LoadingContextProvider } from "./LoadingContext";

const develop = process.env.DEVELOP

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
  verificandoCookie: Partial<boolean | null>;
  setVerificandoCookie: Dispatch<SetStateAction<Partial<boolean | null>>>;
  emailPassword?: EmailPassword,
  setEmailPassword?: any
  setUserTemp: Dispatch<SetStateAction<Partial<UserMax | null>>>;
  userTemp: Partial<UserMax | null>;
};

const initialContext: Context = {
  user: null,
  setUser: (user) => { },
  verificandoCookie: null,
  setVerificandoCookie: (user) => null,
  emailPassword: { email: undefined, password: undefined },
  setEmailPassword: () => { },
  setUserTemp: (user) => { },
  userTemp: null,
};

const AuthContext = createContext<Context>(initialContext);

const AuthProvider: FC = ({ children }): JSX.Element => {
  //const { loading, setLoading } = LoadingContextProvider()
  const [user, setUser] = useState<Partial<UserMax | null>>(null);
  const [verificandoCookie, setVerificandoCookie] = useState<Partial<boolean | null>>(null);
  const [emailPassword, setEmailPassword] = useState();
  const [userTemp, setUserTemp] = useState<Partial<UserMax | null>>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user: any) => {
      const sessionCookie = Cookies.get("sessionChat");
      develop && console.info("Verificando cookie", sessionCookie);
      if (sessionCookie) {
        develop && console.info("Tengo cookie de sesion");
        if (user) {
          develop && console.info("Tengo user de contexto firebase");
          const moreInfo = await fetchApi({
            query: queries.getUser,
            variables: { uid: user?.uid },
          }).then(() => {
            //setLoading(false)
            setVerificandoCookie(true)
          })
          develop && moreInfo && console.info("Tengo datos de la base de datos");
          setUser({ ...user, ...moreInfo });
          develop && console.info("Guardo datos en contexto react");
        } else {
          develop && console.info("NO tengo user de contexto de firebase");
          develop && console.log("queries.authStatus", queries.authStatus)
          develop && console.log("sessionCookie", sessionCookie)
          const asdf = await fetchApi({
            query: queries.authStatus,
            variables: { sessionCookie },
          }).then(() => {
            //setLoading(false)
            setVerificandoCookie(true)
          })
          develop && console.log("asdf", asdf)
          const customToken = asdf?.customToken
          develop && console.info("Llamo con mi sessionCookie para traerme customToken");
          customToken && signInWithCustomToken(auth, customToken);
          develop && console.info("Hago sesion con el custom token");
        }
      } else {
        setVerificandoCookie(true)
      }
    });
  }, []);

  useEffect(() => {
    auth.onIdTokenChanged(async user => {
      if (user) {
        Cookies.set("idTokenChat", await user.getIdToken(), { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" })
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, userTemp, setUserTemp, verificandoCookie, setVerificandoCookie, emailPassword, setEmailPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext);

export { AuthProvider, AuthContextProvider };

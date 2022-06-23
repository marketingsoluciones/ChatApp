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

export interface UserMax extends User {
  city?: string;
  country?: string;
  weddingDate?: Date;
  role?: string[];
  accessToken?: string;
  _id?: string;
}

type Context = {
  user: Partial<UserMax | null>;
  setUser: Dispatch<SetStateAction<Partial<UserMax | null>>>;
  verificandoCookie: Partial<boolean | null>;
  setVerificandoCookie: Dispatch<SetStateAction<Partial<boolean | null>>>;
  };

const initialContext: Context = {
  user: null,
  setUser: (user) => { },
  verificandoCookie: null,
  setVerificandoCookie: (user) => { },
};

const AuthContext = createContext<Context>(initialContext);

const AuthProvider: FC = ({ children }): JSX.Element => {
  //const { loading, setLoading } = LoadingContextProvider()
  const [user, setUser] = useState<Partial<UserMax | null>>(null);
  const [verificandoCookie, setVerificandoCookie] = useState<Partial<boolean | null>>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user: any) => {
      const sessionCookie = Cookies.get("sessionBodas");
      console.info("Verificando cookie", sessionCookie);
      if (sessionCookie) {
        console.info("Tengo cookie de sesion");
        if (user) {
          console.info("Tengo user de contexto firebase");
          const moreInfo = await fetchApi({
            query: queries.getUser,
            variables: { uid: user?.uid },
          }).then(() => {
            //setLoading(false)
            setVerificandoCookie(true)
          })
          moreInfo && console.info("Tengo datos de la base de datos");
          setUser({ ...user, ...moreInfo });
          console.info("Guardo datos en contexto react");
        } else {
          console.info("NO tengo user de contexto de firebase");
          console.log("queries.authStatus", queries.authStatus)
          console.log("sessionCookie", sessionCookie)
          const asdf = await fetchApi({
            query: queries.authStatus,
            variables: { sessionCookie },
          }).then(() => {
            //setLoading(false)
            setVerificandoCookie(true)
          })
          console.log("asdf", asdf)
          const customToken = asdf?.customToken
          console.info("Llamo con mi sessionCookie para traerme customToken");
          customToken && signInWithCustomToken(auth, customToken);
          console.info("Hago sesion con el custom token");
        }
      } else {
        setVerificandoCookie(true)
      }
    });
  }, []);

  useEffect(() => {
    auth.onIdTokenChanged(async user => {
      if (user) {
        Cookies.set("idToken", await user.getIdToken())
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, verificandoCookie, setVerificandoCookie }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext);

export { AuthProvider, AuthContextProvider };

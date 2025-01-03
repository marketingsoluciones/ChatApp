import { useCallback } from "react";
import { signInWithPopup, UserCredential, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

import { LoadingContextProvider, AuthContextProvider } from "../context";
import { fetchApi, queries } from "./Fetching";
import { useToast } from "../hooks/useToast";

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

export const useAuthentication = () => {
  //console.log("entro")
  const { setLoading } = LoadingContextProvider();
  const { setUser } = AuthContextProvider();
  const toast = useToast();
  const router = useRouter();

  const getSessionCookie = useCallback(async (tokenID): Promise<string | undefined> => {
    if (tokenID) {
      const authResult = await fetchApi({
        query: queries.auth,
        variables: { idToken: tokenID },
        apiRoute: "ApiBodas",
        type: "json"
      });
      if (authResult?.sessionCookie) {
        const { sessionCookie } = authResult;
        // Setear en localStorage token JWT
        Cookies.set("sessionChat", sessionCookie, { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" });
        return sessionCookie
      } else {
        console.warn("No se pudo cargar la cookie de sesión por que hubo un problema")
        throw new Error("No se pudo cargar la cookie de sesión por que hubo un problema")
      }
    } else {
      console.warn("No hay tokenID para pedir la cookie de sesion")
      throw new Error("No hay tokenID para pedir la cookie de sesion")
    }

  }, [])

  const signIn = useCallback(
    async (type: keyof typeof types, payload) => {
      /*
          ### Login por primera vez
          1.- Verificar tipo de login y tomar del diccionario el metodo
          2.- Obtener el tokenID del usuario
          3.- Enviar tokenID a API para recibir la sessionCookie
          4.- Almacenar en una cookie el token de la sessionCookie
          5.- Mutar el contexto User de React con los datos de Firebase + MoreInfo (API BODAS)
      */
      setLoading(true);
      console.log(100030, getAuth(), { type, payload })

      const types = {
        provider: async () => await signInWithPopup(getAuth(), payload),
        credentials: async () => {
          try {
            return await signInWithEmailAndPassword(getAuth(), payload.identifier, payload.password)
          } catch (error) {
            toast("error", "usuario o contraseña inválida")
          }
        }
      };

      // Autenticar con firebase
      try {
        const res: UserCredential | void = await types[type]();
        console.log(100031, res)
        if (res) {
          const token = (await res?.user?.getIdTokenResult())?.token;
          const exist = await fetchApi({
            query: queries.getExistUser,
            variables: { uid: res?.user?.uid },
            apiRoute: "ApiApp",
            type: "json"
          })
          if (!exist) {
            throw new Error('user does not exist into events bd')
          }

          const sessionCookie = await getSessionCookie(token)
          if (sessionCookie) {

            // Solicitar datos adicionales del usuario
            const moreInfo = await fetchApi({
              query: queries.getUser,
              variables: { uid: res.user.uid },
              apiRoute: "ApiBodas",
              type: "json"
            });
            if (moreInfo?.errors) {
              throw Error("no hay datos bd");
              //setStage("register")
            }
            // Actualizar estado con los dos datos
            setUser({ ...res.user, ...moreInfo });

            toast("success", "Inicio de sesión con exito");
            await router.push("/");
          }

        } else {
          console.log("No hay session cookie");
        }
      } catch (error: any) {
        const errorCode: string = error?.code ? error.code : error?.message
        switch (errorCode) {
          case "auth/too-many-requests":
            toast("error", "usuario o contraseña inválida");
            break;
          case "user does not exist into events bd":
            toast("error", "debes estar invitado a un evento para poder ingresar");
            break;
          case "user does not exist into events bd":
            toast("error", "debes estar invitado a un evento para poder ingresar");
            break;
          default:
            console.log("error", error)
            console.log("errorCode", error?.code ? error.code : error?.message)
            break;
        }
      }
      setLoading(false);
    },
    [getSessionCookie, router, setLoading, setUser, toast]
  );

  const _signOut = useCallback(async () => {
    await fetchApi({
      query: queries.signOut,
      variables: { sessionCookie: Cookies.get("sessionChat") },
      apiRoute: "ApiBodas",
      type: "json"
    })
    Cookies.remove("sessionChat", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" });
    Cookies.remove("idTokenChat");
    setUser(null);
    await signOut(getAuth());
    await router.push("/");
    toast("success", "Gracias por visitarnos, te esperamos luego 😀");
  }, [router, setUser, toast])

  const resetPassword = async (values: any, setStage: any) => {// funcion para conectar con con firebase para enviar el correo 
    if (values?.identifier !== "") {
      try {
        await sendPasswordResetEmail(getAuth(), values?.identifier);
        setStage("login")
        toast("success", "Email enviado correctamente")
      } catch (error) {
        toast("error", "Error, email no encontrado")
        console.log(error);
      }
    } else {
      toast("error", "introduce un correo")
    }
  };

  return { signIn, getSessionCookie, _signOut, resetPassword };

};


import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { AuthContextProvider, LoadingContextProvider } from "../../../context";
import { useToast } from "../../../hooks/useToast";
import { image } from "../../../interfaces";
import { useAuthentication } from "../../../utils/Authentication";
import { fetchApi, queries } from "../../../utils/Fetching";
import { createURL } from "../../../utils/UrlImage";
import { PerfilFoto } from "../../ConfiguracionPerfil/PerfilFoto";
import { EmailIcon, EmailIcon as PasswordIcon } from "../../Icons";
import { ButtonComponent, InputField } from "../../Inputs";
import { Avatar } from "./Avatar";

interface propsRegister {
  setStage: CallableFunction;
}
type MyFormValues = {
  identifier: string;
  validador: any;
  nickName: string;
  avatar: File | null;
  password: string;
  rePassword: string;
  wrong: any;
};

export const Register: FC<propsRegister> = ({ setStage }) => {
  const { emailPassword, setUser, user } = AuthContextProvider()
  const { signIn } = useAuthentication();
  const toast = useToast()
  const { setLoading } = LoadingContextProvider()
  const [file, setFile] = useState<File | null>(null)
  const initialValues: MyFormValues = {
    identifier: emailPassword?.email ?? '',
    validador: emailPassword?.password ?? '',
    nickName: '',
    avatar: null,
    password: '',
    rePassword: '',
    wrong: "",
  };

  //consultar firebase por uid y obtener photoURL

  const errorsCode: any = {
    "auth/wrong-password": "Correo o contraseña invalida",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Intenta de nuevo más tarde",
  };

  const handleSubmit = async (values: MyFormValues, actions: any) => {
    values.avatar = file
    console.log("MyFormValues", values)
    try {
      if (!values.avatar) {
        toast("error", "selecciona una imagen para mostrar")
        return
      }
      if (values.password !== values.rePassword) {
        toast("error", "la confirmación de la contraseña es incorrecta")
        return
      }
      if (values.password.length < 6) {
        toast("error", "la contraseña debe tener 6 carácteres mínimo")
        return
      }
      signIn("credentials", { identifier: values.identifier, password: values.validador })
        .then(async () => {
          const auth: any = getAuth();
          console.log(123, auth.currentUser)
          await updatePassword(auth.currentUser, values.password);
          await fetchApi({
            query: queries.updateNickName,
            variables: {
              uid: auth.currentUser.uid,
              nickName: values.nickName,
            },
            token: auth.currentUser.accessToken,
            apiRoute: "graphqlApp"
          })
          const result: Partial<image> = await fetchApi({
            query: queries.singleUpload, variables: {
              file,
              use: "profile"
            },
            type: "formData"
          })
          if (result?.i640 && auth?.currentUser) {
            await updateProfile(auth.currentUser, {
              photoURL: createURL(result.i640)
            })
            setUser(old => ({ ...old, photoURL: createURL(result.i640) }))
          }
        })



      //actualizo agregor el nickName a modeloInvitado en evento 
      //subo avatar single upload y respuesta url 
      //cambio contraseña en firebase y añado photoURL = respuesta url 
    } catch (error: any) {
      setLoading(false)
      toast("error", JSON.stringify(errorsCode[error.code]))
    }
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
        <Form className=" text-gray-200 flex flex-col gap-4 py-4 w-full md:w-3/4">
          <span className="w-full relative ">
            <InputField
              label={"Correo electronico"}
              name="identifier"
              placeholder="jhondoe@gmail.com"
              type="email"
              icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto text-gray-500" />}
              disabled
            />

            <InputField
              label={"Validador"}
              name="validador"
              placeholder="******"
              type={"label"}
              icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
              disabled
            />
          </span>
          <span className="w-full relative ">
            <InputField
              label={"Nickname visible en el chat"}
              name="nickName"
              placeholder="Seudonimo"
              type={"text"}
              icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
              required
            />
          </span>
          <span >
            <Avatar setFile={setFile} diameter={20} />
          </span>
          <span className="w-full relative ">
            <InputField
              label={"Ingrese password"}
              name="password"
              placeholder="******"
              type={"password"}
              icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
              required
            />
          </span>
          <span className="w-full relative ">
            <InputField
              name="rePassword"
              placeholder="******"
              type={"password"}
              icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
              label={"Ingrese nuevamente password"}
              required
            />
          </span>
          <span className="text-sm text-red">
            <ErrorMessage name="wrong" />
          </span>
          <ButtonComponent
            type="submit"
          >
            Registrarse
          </ButtonComponent>
        </Form>
      </Formik>
    </>
  );
};
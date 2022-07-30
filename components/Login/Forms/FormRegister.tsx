import { ErrorMessage, Form, Formik } from "formik";
import { FC } from "react";
import { AuthContextProvider, LoadingContextProvider } from "../../../context";
import { useToast } from "../../../hooks/useToast";
import { useAuthentication } from "../../../utils/Authentication";
import { PerfilFoto } from "../../ConfiguracionPerfil/PerfilFoto";
import { EmailIcon, EmailIcon as PasswordIcon } from "../../Icons";
import { ButtonComponent, InputField } from "../../Inputs";

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
  const { emailPassword } = AuthContextProvider()
  const { signIn } = useAuthentication();
  const toast = useToast()
  const { setLoading } = LoadingContextProvider()
  const initialValues: MyFormValues = {
    identifier: emailPassword?.email ?? '',
    validador: emailPassword?.password ?? '',
    nickName: '',
    avatar: null,
    password: '',
    rePassword: '',
    wrong: "",
  };

  const errorsCode: any = {
    "auth/wrong-password": "Correo o contraseña invalida",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Intenta de nuevo más tarde",
  };

  const handleSubmit = async (values: MyFormValues, actions: any) => {
    console.log("MyFormValues", values)
    try {
      signIn("credentials", values)
    } catch (error: any) {
      setLoading(false)
      console.error(JSON.stringify(error));
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
            />
          </span>
          <span className="w-full relative ">
            <InputField
              label={"Imagen de perfil"}
              name="avatar"
              placeholder="avatar"
              type={"file"}
              icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
            />
          </span>
          <span className="w-full relative ">
            <InputField
              label={"Ingrese password"}
              name="password"
              placeholder="******"
              type={"password"}
              icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
            />
          </span>
          <span className="w-full relative ">
            <InputField
              name="rePassword"
              placeholder="******"
              type={"password"}
              icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
              label={"Ingrese nuevamente password"}
            />
          </span>
          <span className="text-sm text-red">
            <ErrorMessage name="wrong" />
          </span>
          <ButtonComponent
            onClick={() => { }}
            type="submit"
          >
            Registrarse
          </ButtonComponent>
        </Form>
      </Formik>
    </>
  );
};
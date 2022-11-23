import { Formik, Form, ErrorMessage } from "formik";
import { FC, useState } from "react";
import { EmailIcon, Eye, EyeSlash, LockClosed } from "../../Icons/";
import { InputField, ButtonComponent } from "../../Inputs";
import { useToast } from '../../../hooks/useToast';
import { AuthContextProvider, LoadingContextProvider } from "../../../context";
import { useAuthentication } from '../../../utils/Authentication';
import ToastContainer from "../../Toast/ToastContainer";

type MyFormValues = {
  identifier: string;
  password: any;
  wrong: any;
};

const FormLogin: FC<any> = ({ setStage }) => {
  const [passwordView, setPasswordView] = useState(false)
  const { signIn } = useAuthentication();
  const toast = useToast()
  const { setLoading } = LoadingContextProvider()
  const initialValues: MyFormValues = {
    identifier: '',
    password: '',
    wrong: ""
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
      console.log(123)
      setLoading(false)
      console.error(JSON.stringify(error));
      toast("error", JSON.stringify(errorsCode[error.code]))
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
      <Form className=" text-gray-700 flex flex-col gap-4  w-full md:w-3/4 pb-8">
        <span className="w-full relative ">
          <InputField
            label={"Correo electronico"}
            name="identifier"
            type="email"
            icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto text-gray-500" />}
          />

        </span>

        <span className="w-full relative ">
          <InputField
            name="password"
            type={!passwordView ? "password" : "text"}
            autoComplete="off"
            icon={<LockClosed className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
            label={"Contraseña"}
          />
          <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 top-5 right-4 m-auto w-4 h-4 text-gray-500" >
            {!passwordView ? <Eye /> : <EyeSlash />}
          </div>
        </span>

        <span className="text-sm text-red">
          <ErrorMessage name="wrong" />
        </span>
        <div onClick={() => setStage("resetPassword")} className="text-sm text-primary w-full text-left hover:text-gray-500 transition cursor-pointer">
          Olvidé mi contraseña
        </div >
        {/* <ToastContainer toasts={[{ id: 1, type: "error", message: "algo" }]} /> */}
        <ButtonComponent
          onClick={() => { }}
          type="submit"
        >
          Iniciar sesión
        </ButtonComponent>
      </Form>
    </Formik>
  );
};

export default FormLogin;

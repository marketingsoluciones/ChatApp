import { updateEmail, updatePassword, updateProfile, getAuth } from "firebase/auth";
import { Form, Formik, useFormikContext, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../../context";
import { auth, } from "../../firebase";
import { BlockConfiguration } from "../../pages/configuracion";
import { ButtonComponent, InputField } from "../Inputs";
import { useToast } from '../../hooks/useToast';
import Link from "next/link";

export const FristPerfil = () => {
    const { user } = AuthContextProvider();
    const initialValues = {
        Usuario: "" + -+6,
    };

    return (
        <div className="flex flex-col w-full gap-6 container ">
            <Formik initialValues={{ email: user?.email }} onSubmit={() => { }}>
                <DatosAcceso />
            </Formik>
        </div>
    );
};

const DatosAcceso = () => {
    const { user, setUser } = AuthContextProvider();
    const { setFieldValue, values } =
        useFormikContext<{ email: string; password: string, displayName: string }>();
    const [canEditEmail, setCanEditEmail] = useState(false);
    const [canEditPassword, setCanEditPassword] = useState(false);
    const [canDisplayName, setCanDisplayName] = useState(false);
    const toast = useToast();
    const auth = getAuth();


    useEffect(() => {
        setFieldValue("email", user?.email);
        setFieldValue("displayName", user?.displayName);
    }, [user]);


    const handleEditPassword = async () => {
        if (canEditPassword && auth.currentUser) {
            try {
                await updatePassword(auth.currentUser, values.password);
                setCanEditPassword(!canEditPassword);
                toast("success", "Contraseña actualizada con exito")
                setFieldValue("password", "")
            } catch (error) {
                toast("error", "Error al actualizar la contraseña")
                console.log(error);
            }
        } else if (!canEditPassword) {
            setCanEditPassword(!canEditPassword);
        }
    };

    const handleEditDisplayName = async () => {
        if (canDisplayName && auth.currentUser) {
            try {
                await updateProfile(auth.currentUser, {
                    displayName: values.displayName
                });
                setCanDisplayName(!canDisplayName);
                setUser(old => ({ ...old, displayName: values.displayName }))
                toast("success", "Nombre actualizado con exito")
            } catch (error) {
                toast("success", "Error al actualizar el nombre")
                console.log(error);
            }
        } else if (!canDisplayName) {
            setCanDisplayName(!canDisplayName);
        }
    }

    const PostDatos = () => {
            handleEditDisplayName(),
            handleEditPassword()
    }


    return (
        <BlockConfiguration title={"Datos de acceso"}>
            <Form className="w-full flex flex-col gap-4">
                <div className="w-full grid flex items-center gap-2 relative">
                    <InputField
                        disabled={!canEditEmail}
                        label={"Correo electronico"}
                        name={"email"}
                        type={"text"}
                    />
                </div>
                <div className="w-full grid  flex items-center gap-2 relative">
                    <InputField
                        label={"Nombre visible"}
                        placeholder={"Maria valeria"}
                        name={"displayName"}
                        type={"text"}
                    />
                </div>
                <div className="w-full grid  flex items-center gap-2 relative">
                    <InputField
                        label={"Cambiar Contraseña"}
                        name={"password"}
                        placeholder={"**********"}
                        type={"text"}
                        
                    />
                </div>

                <div className="w-full grid  flex items-center gap-2 relative">
                    <button
                        onClick={PostDatos}
                        className={" bg-primary px-2 py-1 text-white text-xs rounded-lg w-fit right-2 top-1/2 "}
                        type={"button"}
                    >
                        ENVIAR
                    </button>
                </div>
            </Form>
        </BlockConfiguration>
    );
};
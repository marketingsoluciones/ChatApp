import { FC, MouseEventHandler } from "react";
import { GoogleProvider, FacebookProvider, AppleProvidor } from "../../firebase";
import { Icon } from "../Surface/Footer";
import { AppleIcon, FacebookIcon2, GoogleIcon } from "../Icons/";
import { useToast } from "../../hooks/useToast";
import { LoadingContextProvider } from "../../context";
import { useAuthentication } from "../../utils/Authentication";
import { ButtonProvider } from "./Forms/ButtonProvider"

interface propsRegisterQuestion {
  onClick: MouseEventHandler;
}
export const RegisterQuestion: FC<propsRegisterQuestion> = ({ onClick }) => {
  return (
    <h2 className={`font-light text-tertiary flex gap-2 items-center text-sm `}>
      ¿No dispones de una cuenta?
      <span
        className="text-primary font-semibold cursor-pointer hover:text-tertiary transition"
        onClick={onClick}
      >
        Regístrate
      </span>
    </h2>
  );
};

export const Providers: FC<any> = ({ setStage }) => {
  const { signIn } = useAuthentication();
  const toast = useToast();
  const { setLoading } = LoadingContextProvider();

  const handleClick = async (provider: any) => {
    try {
      signIn("provider", provider);
    } catch (error) {
      setLoading(false);
      toast("error", JSON.stringify(error));
      console.log(error);
    }
  };

  /* const ListProviders = [
    {
      icon: <FacebookIcon className="w-5 h-5" />,
      function: () => handleClick(FacebookProvider),
    },
    {
      icon: <GoogleIcon className="w-5 h-5" />,
      function: () => handleClick(GoogleProvider()),
    },
    {
      icon: <AppleIcon className="w-5 h-5" />,
      function: () => alert("Aun por configurar"),
    },
  ]; */

  return (
    <>
      <div className={`text-center flex flex-col gap-2 w-full items-center `}>
        {/* <div className="gap-4 flex items-center">
        {ListProviders.map((item, idx) => (
          <Icon key={idx} icon={item.icon} onClick={item.function} />
        ))}
      </div> */}
        <div className="">
          <ButtonProvider provider="Google" handle={GoogleProvider()} icon={<GoogleIcon className="ml-15 w-[20px] h-[20px] text-gray-500" />} />
          <ButtonProvider provider="Facebook" handle={FacebookProvider} icon={<FacebookIcon2 className="ml-15 w-5 h-5 text-gray-500" />} />
          {/* <ButtonProvider provider="Apple" handle={AppleProvidor()} icon={<AppleIcon className="ml-15 w-[20px] h-[20px] text-gray-500" />}/> */}
        </div>
      </div>
      <style jsx>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        `}
      </style>
    </>
  );
};

export const BusinessAccess: FC = () => {
  return (
    <div className="w-full text-center h-max text-gray-500">
      <p>¿Eres profesional?</p>
      <h3 className="text-primary font-medium cursor-pointer hover:text-tertiary transition">
        Acceso para empresas
      </h3>
    </div>
  );
};

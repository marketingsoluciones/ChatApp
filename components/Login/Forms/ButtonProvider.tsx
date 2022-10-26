import { FC } from "react";
import { LoadingContextProvider } from "../../../context";
import { useToast } from "../../../hooks/useToast";
import { useAuthentication } from "../../../utils/Authentication";
//import { EmailIcon, GoogleIcon } from "../../Icons";

interface propsButtonProvider {
  provider: string
  handle: any
  icon: any
}

export const ButtonProvider: FC<propsButtonProvider> = ({ provider, handle, icon }) => {
  const { signIn } = useAuthentication();
  const toast = useToast();
  const { setLoading } = LoadingContextProvider();
  const handleClick = async (provider: any) => {
    try {
      signIn("provider", provider);
    } catch (error) {
      setLoading(false);
      toast("error", JSON.stringify(error));
      console.log("este es un error en el onClick de los listProviders", error);
    }
  };
  return (
    <>
      <div className="*bg-blue-200">
        <span className="*bg-white flex m-2 rounded  ">
          <button onClick={() => handleClick(handle)} className=" rounded-md border border-gray-300 hover:border-blue-300 hover:border-2 w-250 h-10 flex justify-center items-center" >
            {icon}
            <p className="*bg-blue-300 w-215 font-Roboto text-sm">{`Continúa con ${provider}`}</p>
          </button>
        </span>
      </div>
    </>
  )

}
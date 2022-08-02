import { Dispatch, FC, SetStateAction, useState } from "react";
import { AuthContextProvider } from "../../../context";
import { useToast } from "../../../hooks/useToast";
import { LoadingItem } from "../../Loading";

type propsAvatar = {
  setFile: Dispatch<SetStateAction<File | null>>
}

export const Avatar: FC<propsAvatar> = ({ setFile }: propsAvatar) => {
  const { user, setUser } = AuthContextProvider()
  const [loading, setLoading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string | any>("http://96.126.110.203:4500//uploads/69e26e/tux-i640.webp")
  const toast = useToast();


  const handleChange = async (e: any) => {
    setLoading(true)
    try {
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.onloadend = async () => {
        setAvatar(reader.result);
        setFile(file ? file : null)
      }
      reader.readAsDataURL(file);

      //toast("success", "la imagen fue actualizado con exito")
      setTimeout(() => {
        setLoading(false)
      }, 500);
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
      }, 500);
      toast("error", "error al cargar la imagen")
      console.log(error)
    }

  }

  return (
    <div>
      <label htmlFor="photo" className={"relative"}>
        <img src={user?.photoURL ?? avatar} alt={"imagen del perfil"} className={"border-primary border-2 rounded-full objeto-cover h-40 w-40 hover:opacity-50 cursor-pointer object-cover object-center"} />
        {loading && (
          <div className="flex items-center justify-center h-40 w-40 rounded-full bg-primary bg-opacity-90 absolute top-0 left-0 text-white">
            <LoadingItem size="small" text="Cargando" />
          </div>
        )}
      </label>
      <input type="file" id="photo" name="photo" className="hidden" onChange={handleChange} />
    </div>

  );
}
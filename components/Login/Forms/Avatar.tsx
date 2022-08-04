import { Dispatch, FC, SetStateAction, useState } from "react";
import { AuthContextProvider } from "../../../context";
import { useToast } from "../../../hooks/useToast";
import { SubirImagenIcon } from "../../icons";
import { LoadingItem } from "../../Loading";

type propsAvatar = {
  setFile: Dispatch<SetStateAction<File | null>>
  photoURL?: string
  diameter: number
}

export const Avatar: FC<propsAvatar> = ({ setFile, photoURL, diameter }: propsAvatar) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string | any>()
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
    <div className={`h-${diameter} w-${diameter}`}>
      <label htmlFor="photo" className={"relative hover:opacity-50 cursor-pointer object-cover"}>
        {avatar ?
          <img src={avatar} alt={"imagen del perfil"} className={`border-primary border-2 rounded-full h-${diameter} w-${diameter}  object-center`} /> :
          <div className={`flex flex-col items-center justify-center border-primary border-2 rounded-full h-${diameter} w-${diameter}`}>
            <SubirImagenIcon />
          </div>
        }
        {loading && (
          <div className={`flex items-center justify-center h-${diameter} w-${diameter} rounded-full bg-primary bg-opacity-90 absolute top-0 left-0 text-white`}>
            <LoadingItem size="xsmall" text="Cargando" />
          </div>
        )}
      </label>
      <input type="file" id="photo" name="photo" className="hidden" onChange={handleChange} />
    </div>
  );
}
import { FristPerfil } from "../components/ConfiguracionPerfil/FristPerfil";
import { PerfilFoto } from "../components/ConfiguracionPerfil/PerfilFoto";
import { PerfilOpciones } from "../components/ConfiguracionPerfil/PerfilOpciones";
import { FC, useState } from "react";



// Tipos de datos personalizados
const DatosConfirmation: FC = () => {

    return (
        <>
            <div className="w-screen fixed h-full top-0 left-0 md:grid z-30 grid-cols-5">
                <div className="bg-white w-full h-full col-span-3 relative flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 w-full px-10 md:px-0 sm:w-3/4 md:w-2/3">
                        <PerfilFoto />
                        <FristPerfil/>
                    </div>
                </div>
                <div className="hidden md:block banner w-full h-full col-span-2 " />
            </div>
            <style >
                {`
          .banner {
            background-image: url("/banner-login.webp");
            background-size: cover;
            background-position: top;
          }
        `}
            </style>
        </>
    );
};

export default DatosConfirmation;

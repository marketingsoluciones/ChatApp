import { FC, memo } from "react";
import { CircleImage } from '../CircleImg'
import ImgPerfilContacto from './ImgPerfilContacto'


interface propsItem {
    image: any | undefined | null
    name: String
    info: any
    _id: String
    onLine?: boolean
}

const PerfilContacto: FC<propsItem> = memo(({ image, name, info, _id, onLine }) => {
    return (
        <div
            className="bg-white h-max w-full rounded-lg p-10 flex flex-col items-center justify-center"
        >
            <ImgPerfilContacto image={image} name={name} onLine={onLine} />
            <h3 className="text-md font-semibold text-gray-500 pt-3">{name}</h3>
            <p className="text-sm text-gray-500 leading-4">{info}</p>

        </div>
    );
});

export default PerfilContacto
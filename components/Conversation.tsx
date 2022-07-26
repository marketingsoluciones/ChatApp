import { useState } from "react"
import { Message } from "./Conversations/ComponentsConversation"

const Conversation = () => {
    const [messages, setMessages] = useState([])
    return (
        <div className="h-full w-full pl-3 pr-3">
            <Message type="file" emisor={false} message={"hola"} date={"10:45 pm"} />
            <Message type="text" emisor={true} message={"como estas"} date={"10:45 pm"} />
            <Message type="text" emisor={true} message={"esto es un link https://tutorial.eyehunts.com/html/html-p-tag-paragraph-break-font-size-line-space-indent/#:~:text=The%20width%20property%20sets%20the,break%20to%20the%20next%20line."} date={"10:45 pm"} />
            <Message type="text" emisor={false} message={"esto es otro link https://tailwindcss.com/docs/display#block-and-inline para revisar si salta la linea"} date={"10:45 pm"} />
            <Message type="text" emisor={false} message={"hola mundo, en este sólo hay palabras nada mas que letras en un párrafo"} date={"10:45 pm"} />
            <Message type="text" emisor={false} message={"1111111111111111111111111111111111111111111111111111112222222222222222222222222222222222222222222222222222222222222222222222222223333333333333333333333333333333333333333333334"} date={"10:45 pm"} />
            <Message type="text" emisor={true} message={"hola mundo"} date={"10:45 pm"} />
            <Message type="file" emisor={false} message={"hola mundo"} date={"10:45 pm"} />
            <Message type="text" emisor={true} message={"hola mundo"} date={"10:45 pm"} />
            <Message type="file" emisor={false} message={"hola mundo"} date={"10:45 pm"} />
            <Message type="text" emisor={true} message={"hola mundo"} date={"10:45 pm"} />
            <Message type="file" emisor={false} message={"hola mundo"} date={"10:45 pm"} />
            <Message type="text" emisor={true} message={"hola mundo"} date={"10:45 pm"} />
            <Message type="file" emisor={false} message={"hola mundo"} date={"10:45 pm"} />
            <Message type="text" emisor={true} message={"hola mundo"} date={"10:45 pm"} />
        </div>
    )
}

export default Conversation


import { useState } from "react"
import { Message } from "./Conversations/ComponentsConversation"

const Conversation = () => {
    const [messages, setMessages] = useState([])
    return (
        <div className="h-full w-full py-6 flex flex-col gap-10 md:gap-6">
            <Message type="file" emisor={false}/>
            <Message type="text" emisor={true}/>
        </div>
    )
}

export default Conversation


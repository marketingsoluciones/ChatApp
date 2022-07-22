import { useState } from "react"
import { Message } from "./Conversations/ComponentsConversation"

const Conversation = () => {
    const [messages, setMessages] = useState([])
    return (
        <div className="h-full w-full pl-3 pr-3">
            <Message type="file" emisor={false} />
            <Message type="text" emisor={true} />
            <Message type="file" emisor={false} />
            <Message type="text" emisor={true} />
            <Message type="file" emisor={false} />
            <Message type="text" emisor={true} />
            <Message type="file" emisor={false} />
            <Message type="text" emisor={true} />
            <Message type="file" emisor={false} />
            <Message type="text" emisor={true} />
            <Message type="file" emisor={false} />
            <Message type="text" emisor={true} />
        </div>
    )
}

export default Conversation


import { useState } from 'react';
import { useEventProducer } from "../lib";


export const Header = () => {
    const [eventResponse, setEventResponse] = useState<string>()
    const [handleClick] = useEventProducer({
        eventName: 'doSomething', onComplete: (response) => {
            if (typeof response === 'string')
                setEventResponse(response);
        }
    }, [])

    const onClick = () => {
        handleClick('Ticket # ', 302);
    }

    return (
        <header>
            <button onClick={onClick}>Trigger Event</button>
            {eventResponse && <h3>{eventResponse}</h3>}
        </header>
    )
}
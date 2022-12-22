import { useEventSubscriber } from "../lib";
import { useState } from 'react';
import { NestedComponent } from "./NestedComponent";

const delay = (ms: number) => {
    return new Promise((res, _) => {
        setTimeout(() => { 
            res('');
        }, ms);
    });
}


export const EventListener = () => {
    const [message, setMessage] = useState('');
    useEventSubscriber({
        doSomething: async () => {
            setMessage('Loading');
            await delay(3000);
            setMessage('I am the parrent');
            return 'Complete';
        }
    })
    return (
        <>
        { message && <h2>{message}</h2>}
        <NestedComponent />
        </>
    )
}
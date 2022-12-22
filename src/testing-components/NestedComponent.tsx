import { useState } from "react";
import { useEventSubscriber } from "../lib";

export const NestedComponent = () => {
    const [msg, setMsg] = useState('');
    useEventSubscriber({doSomething: (_, args) => {
        let msg = 'Got event';
        if(args.length) {
            msg += ` ${args[0]} ${args[1]}`;
        }
        setMsg(msg);
    }})


    return (
        <>
            <h4>Child component</h4>
            { msg && <label>{msg}</label>}
        </>
    )
}
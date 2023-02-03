import { useState } from "react";
import { useEventSubscriber } from "../lib";

export const NestedComponent = () => {
    const [msg, setMsg] = useState('');
    const [prefix, setPrefix] = useState('prefix-')
    useEventSubscriber({
        doSomething: (_, args) => {
            let msg = prefix + ' Got event';
            if (args.length) {
                msg += ` ${args[0]} ${args[1]}`;
            }
            setMsg(msg);
        }
    }, [prefix])


    return (
        <>
            <h4>Child component</h4>
            {msg && <p>{msg}</p>}
            <input value={prefix} onChange={(e) => setPrefix(e.currentTarget.value)} />
        </>
    )
}
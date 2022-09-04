import { useState } from "react";

export default function useReducer(elements, limit) {
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen)
    let reducerArray = [];
    if(elements.length > limit && !isOpen) {
        reducerArray = elements.slice(0, limit);
    }
    else{
        reducerArray = elements;
    }
    return {reducerArray, toggle, isOpen};
}

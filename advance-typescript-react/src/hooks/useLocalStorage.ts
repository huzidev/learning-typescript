import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) {
            return JSON.parse(jsonValue)
        }
        if (typeof initialValue === "function") {
            // if we remove inside of initialValue parameter then it'll be like
            // initialValue() which means it is function
            return (initialValue as () => T)()
        }
        else {
            return initialValue
        }
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}
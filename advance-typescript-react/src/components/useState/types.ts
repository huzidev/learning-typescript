// here we've defined types with object but when we import the type in UseState.tsx component here we'll use <Data[]> to defined it as array of objects
export interface Data {
    name: string,
    age: number,
    // means note of type optional
    note?: string
}
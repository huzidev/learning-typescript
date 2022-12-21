import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./index";

// now export the useSelector and useDispatch with their TypedVersion
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // because it'll runs/send function therefore using return fucntion

// we'll use these export in every components
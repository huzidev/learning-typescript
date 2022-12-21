import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import {userSlice} from "./userSlice";
import thunk from "redux-thunk";

// export const store = configureStore(userSlice, applyMiddleware(thunk))

export const store = configureStore(userSlice)
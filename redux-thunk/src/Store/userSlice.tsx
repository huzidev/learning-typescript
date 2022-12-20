import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    users: [],
    error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUserss', () => {
    return axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res: any) => {
            res.data.map((user: any) => user.id)
        })
})
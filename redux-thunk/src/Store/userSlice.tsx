import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: []
}

export const fetchUsers: any = createAsyncThunk('user/fetchUsers', () => {
    return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        fetchData(state: any, action: any) {
            state.users = action.payload
        }
    }
})

export default userSlice.reducer
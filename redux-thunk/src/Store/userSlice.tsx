import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id: number
    name: string
}

interface Types {
    loading: boolean
    users: User[]
    error: string
}

const initialState: Types = {
    loading: false,
    users: [],
    error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUserss', () => {
    return axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res: any) => res.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state: any, action: PayloadAction<User[]>) => { // action is of type payloadAction and further it is Array of User
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state: any, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || "Something went wrong!"
        })
    },
})

export default userSlice.reducer
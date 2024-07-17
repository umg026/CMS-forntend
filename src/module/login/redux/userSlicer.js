import { createSlice } from "@reduxjs/toolkit";

export const userSlicer = createSlice({
    name: "user",
    initialState: {
        email: '',
        password: '',
        isLoggedIn: false,
    },

    reducers: {
        login(state, actions) {
            state.email = actions.payload.email
            state.password = actions.payload.password
            state.isLoggedIn = true;
            
        },
        logout(state) {
            state.email = "";
            state.password = "";
            state.isLoggedIn = false;
            localStorage.clear();

        }

    }
})

export const { login, logout } = userSlicer.actions
export default userSlicer.reducer

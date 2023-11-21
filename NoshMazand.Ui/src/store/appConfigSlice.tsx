import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    user: {},

};

const initialState = {
    logedIn:localStorage.getItem('token')?true:false,
    userName: localStorage.getItem('userName'),
    title: localStorage.getItem('title'),
    menus: JSON.parse(localStorage.getItem('menus') || "[]"),
    roles: JSON.parse(localStorage.getItem('roles') || "[]")
};

const appConfigSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        login(state,  data) {
            //console.log('in login reducers',token)
            state.logedIn=true
            // state.userName=payload.userName,
            // state.title=payload.title;
            // state.menus=payload.menus
            //state.roles= payload.roles
            localStorage.setItem('token', data.payload.token);
            //localStorage.setItem('userName', payload.userName);
            //localStorage.setItem('title', payload.title);
            //localStorage.setItem('menus', JSON.stringify(payload.menus || []));
            //localStorage.setItem('roles', JSON.stringify(payload.roles || []));
        },
        logout() {
            
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('title');
            localStorage.removeItem('menus');
            localStorage.removeItem('roles');
        },
    },
});

export const { login,logout } = appConfigSlice.actions;

export default appConfigSlice.reducer;

export const getToken = _ => localStorage.getItem("token");

export const setToken = token => localStorage.setItem("token", token);

export const removeToken = _ => localStorage.removeItem("token");
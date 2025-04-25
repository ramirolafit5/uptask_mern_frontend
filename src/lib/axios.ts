import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

/* Asi eran los servicios antes de que implementemos la siguiente funcion 
const {data} = await api.get('/projects', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
*/

api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//entonces ahora cuando uso api viene con la implementacion del interceptor y autoriza directamente

export default api
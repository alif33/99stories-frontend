import axios from 'axios'
import { toast } from 'react-toastify'

export const ROOT_URL= `http://localhost:3000/`
export const APP_URL= `http://127.0.0.1:8000/`
export const IMAGE_URL = `${APP_URL}storage/`
export const API_URL= `${APP_URL}api/`
export const BLANK_IMAGE= `https://res.cloudinary.com/homefinder/image/upload/v1638456798/99stories/blank-photo-icon-vector-3265848-removebg-preview_f3yxje.png`


const api = axios.create({
    baseURL: API_URL
})

const authHeader = token =>{
    return {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
    }
}
export const getData = async (endPoint) => {
    try {
      const { data } = await api.get(endPoint)
        return data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
}

export const getUserData = async (endPoint, token) => {
    try {
      const { data } = await api.get(endPoint, {
          headers: authHeader(token)
      })
        return data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
}

export const postData = async (endPoint, formData, setDisable) => {
    try {
      const { data } = await api.post(endPoint, formData)
        setDisable(false)
        return data
    } catch (error) {
        setDisable(false)
        toast.error(error?.response?.data?.message)
        return error
    }
}

export const postReq = async (endPoint, formData ) => {
    try {
      const { data } = await api.post(endPoint, formData)
        return data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
}

export const authPost = async ( endPoint, formData, token ) => {

    try {
        const { data } = await api.post(endPoint, formData, {
            headers: authHeader(token)
        })
          return data
      } catch (error) {
          toast.error(error?.response?.data?.message)
          return error
      }
}


export const updateData = async (endPoint, formData, token) => {
    try {
      const { data } = await axios.put(API_URL+endPoint, formData, {
            headers: authHeader(token)
      })        
        return data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
}

export const getFormData = async( key, data ) => {
    // needed for images
    const formData = new FormData()
        for (let i = 0; i < key.length; i++) {
            formData.append(key[i], data[i])
        }
    return  formData;
}


import axios from 'axios'


const baseUrl = '/api/observations'


const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const updateToDelete = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateObservation = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}


export default { getAll, create, updateToDelete, updateObservation }
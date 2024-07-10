import axios from 'axios'

const baseUrl = '/api/observations'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getPlants = () => {
    const request = axios.get('/api/observations/kasvit')
    return request.then(response => response.data)
}

const getMushrooms = () => {
    const request = axios.get('/api/observations/sienet')
    return request.then(response => response.data)
}

const getBirds = () => {
    const request = axios.get('/api/observations/linnut')
    return request.then(response => response.data)
}

const getButterflies = () => {
    const request = axios.get('/api/observations/perhoset')
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
      }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const updateToDelete = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const updateObservation = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}


export default { getAll, create, updateToDelete, updateObservation, setToken, getPlants, getMushrooms, getBirds, getButterflies }
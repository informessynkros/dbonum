import axios from 'axios'


const api = axios.create({
  baseURL: 'https://7af0yxvu6c.execute-api.us-east-1.amazonaws.com/dev'
})

export default api

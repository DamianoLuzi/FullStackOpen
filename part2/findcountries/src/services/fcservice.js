import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries";

const fetchAll = () => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then(response => {
    console.log("server response data",response.data)
    return response.data
  })
}

export default {fetchAll};

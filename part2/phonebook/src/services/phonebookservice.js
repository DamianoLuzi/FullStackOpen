import axios from "axios";
const baseUrl = '/api/people'

const getAll = () => {
	const request = axios.get(baseUrl)
  return request.then(response => {
		console.log("server response data",response.data)
		return response.data
	})
}

const create = newPerson => {
	const request = axios.post(baseUrl,newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
	console.log("id to delete ",id)
  const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

const update = (person) => {
	console.log("person before update",person)
	const request = axios.patch(`${baseUrl}/${person.id}`,person)
	return request.then(response => response.data)
}
export default {getAll, create, deletePerson, update};
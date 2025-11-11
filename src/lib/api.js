const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const handleResponse = async response => {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }
  return response.json()
}

export const fetchEstimatorConfig = () => {
  return fetch(`${API_BASE_URL}/estimator/config`, {
    headers: {
      Accept: 'application/json',
    },
  }).then(handleResponse)
}

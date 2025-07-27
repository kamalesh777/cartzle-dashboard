import type { AxiosError } from 'axios'

import type { DataResponse } from 'src/types/common'

import API from './API'
// import landerAPI from '@pages/api/landerAPI';

/**
 * Perform an HTTP GET request to the specified API endpoint.
 *
 * @param {string} endPoint - The API endpoint to request.
 * @param {object} headerData - (Optional) Additional headers to include in the request (default is an empty object).
 * @param {string} appSlug - (Optional) The application slug (default is 'hire').
 * @param {string} baseVersion - (Optional) The API base version (default is 'v1').
 *
 * @returns {Promise<DataResponse>} A Promise that resolves to the response data or rejects with an error.
 */

export const getRequest = async (endPoint: string, headerData = {}): Promise<DataResponse> => {
  try {
    const response = await API.get(endPoint, headerData)
    return response as DataResponse
  } catch (err) {
    // Return a rejected promise with the error response
    return (err as AxiosError).response as DataResponse
  }
}

interface payloadType {
  payload: Record<string, unknown> | null | ''
}

/**
 * Perform an HTTP POST request to the specified API endpoint.
 *
 * @param {string} endPoint - The API endpoint to send the POST request to.
 * @param {payloadType} data - The data to be sent in the request body.
 * @param {object} headerData - (Optional) Additional headers to include in the request (default is an empty object).
 * @param {string} appSlug - (Optional) The application slug (default is 'hire').
 * @param {string} baseVersion - (Optional) The API base version (default is 'v1').
 *
 * @returns {Promise<DataResponse>} A Promise that resolves to the response data or rejects with an error.
 */

export const postRequest = async (
  endPoint: string,
  data: payloadType['payload'],
  headerData = {},
): Promise<DataResponse> => {
  // Construct the full API endpoint URL
  // const API_ENDPOINT = cloudEndpoint(endPoint)

  try {
    // Perform an HTTP POST request using the provided endpoint, data, and headers
    const response = await API.post(`${endPoint}`, data, headerData)

    // Return the response data
    return response as DataResponse
  } catch (err) {
    // If an error occurs, return a rejected promise with the error response
    return (err as AxiosError).response as DataResponse
  }
}

// same as post method here we useing only PUT request instead of POST
export const putRequest = async (
  endPoint: string,
  data: payloadType['payload'],
  headerData = {},
): Promise<DataResponse> => {
  try {
    // Perform an HTTP PUT request using the provided endpoint, data, and headers
    const response = await API.put(endPoint, data, headerData)

    // Return the response data
    return response as DataResponse
  } catch (err) {
    // If an error occurs, return a rejected promise with the error response
    return (err as AxiosError).response as DataResponse
  }
}

// same as post method here we useing only PATCH request instead of POST
export const patchRequest = async (
  endPoint: string,
  data: payloadType['payload'],
  headerData = {},
): Promise<DataResponse> => {
  try {
    // Perform an HTTP PATCH request using the provided endpoint, data, and headers
    const response = await API.patch(endPoint, data, headerData)

    // Return the response data
    return response as DataResponse
  } catch (err) {
    // If an error occurs, return a rejected promise with the error response
    return (err as AxiosError).response as DataResponse
  }
}

/**
 * * Perform an HTTP DELETE request to the specified API endpoint.
 *
 * @param {string} endPoint - The API endpoint to send the DELETE request to.
 * @param {object} headerData - (Optional) Additional headers to include in the request (default is an empty object).
 * @param {string} appSlug - (Optional) The application slug (default is 'hire').
 * @param {string} baseVersion - (Optional) The API base version (default is 'v1').
 * @returns {Promise<DataResponse>} A Promise that resolves to the response data or rejects with an error.
 */

export const deleteRequest = async (endPoint: string, headerData = {}): Promise<DataResponse> => {
  try {
    const response = await API.delete(endPoint, headerData)
    return response as DataResponse
  } catch (err) {
    return (err as AxiosError).response as DataResponse
  }
}

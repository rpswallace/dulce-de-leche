import axios from 'axios'

class API {
  /**
   * Get BASE URLs
   *
   * Configuration
   */
  static get URLS() {
    const BASE = process.env.NEXT_PUBLIC_BASE_URL

    return {
      BASE: BASE,
      BASE_API: BASE,
    }
  }

  /**
   * Make a GET request.
   *
   * @param {string} endPoint
   */
  static getRequest(endPoint, params) {
    return axios.get(this.URLS.BASE_API + endPoint, params)
  }

  /**
   * Make a POST request.
   *
   * @param {string} endPoint
   * @param {object} data
   */
  static postRequest(endPoint, data) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    return axios.post(this.URLS.BASE_API + endPoint, data, config)
  }

  /**
   * Make a PUT request.
   *
   * @param {string} endPoint
   */
  static putRequest(endPoint) {
    return axios.put(this.URLS.BASE_API + endPoint)
  }
}

export default API

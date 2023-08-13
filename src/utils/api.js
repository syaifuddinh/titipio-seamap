import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = "https://api.searoutes.com";
const headers = {
    "accept": "application/json",
    "x-api-key": apiKey
}

const Api = axios.create({ 
    baseURL: baseUrl,
    headers 
});

export default Api;
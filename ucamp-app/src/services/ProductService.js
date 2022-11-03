import axios from "axios";

axios.defaults.headers.common["Authorization"] = "Basic dWNhbXA6QDIwMjJVYzRtcCM=";

const ProductService = {

    async search(query) {
        const {data, error} = await axios.get(`http://localhost:8000/api/search?query=${query}`);
        return data;
    }
}

export default ProductService;
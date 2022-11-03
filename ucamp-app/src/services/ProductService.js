import axios from "axios";

axios.defaults.headers.common["Authorization"] = "Basic dWNhbXA6QDIwMjJVYzRtcCM=";

const ProductService = {

    async search(query) {
        const {data, error} = await axios.get(`http://localhost:8000/api/search?query=${query}`);
        return data;
    },
    async paginate(list, page, size) {
        if(size > list.length) size = list.length;
        const totalPages = Math.ceil(list.length / size);
        
        let offset = (page - 1) * size;
        if(offset >= list.length) offset = (totalPages -  1) * size;

        return list.slice( offset, offset + size);
    }
}

export default ProductService;
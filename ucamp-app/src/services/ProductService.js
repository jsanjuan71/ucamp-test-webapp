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
    },

    async sortByPrice(list, asc) {
        if( asc === false){
            return list.sort( (itemA,itemB) => itemA.price - itemB.price);
        }  
        else{
            return list.sort( (itemA,itemB) => itemB.price - itemA.price);
        }
            
    },
    async listAllConditions(list) {
        let conditions = [];
        list.map( (item) => {
            if( conditions.indexOf(item.condition) )
                conditions.push( item.condition );
        })
        return conditions.map(condition => {
            return {value: condition.toLowerCase(), label: condition }
        });
    },
    async sortByCondition(list, condition) {
        return list.filter( (item) => item.condition === condition )
    }
}

export default ProductService;
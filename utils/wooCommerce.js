import wcapi from "@woocommerce/woocommerce-rest-api";
import axios from "axios";

const WooCommerceRestApi = wcapi.default;

const WooCommerce = new WooCommerceRestApi({
    url: "https://ecommercewp.managedcoder.com",
    consumerKey: "ck_d4a037e1e858a8c055e66abe7e6fe333ed096de8",
    consumerSecret: "cs_e6321e472859b7dba8a89feabb2576efe38199c8",
    version: "wc/v3"
});

// fetches all products
export const products = async (id = '') => {
    let endpoint = `products`;
    if (id != '') endpoint = `products/${id}`
    try {
        const response = await WooCommerce.get(endpoint, { 'per_page': 100 });
        return response.data
    } catch (error) {
        return error
    }
}


// updates product
export const update_product = async (id, data) => {
    let endpoint = `products/${id}`
    let final_data = JSON.parse(data)
    console.log(final_data)
    try {

        const response = await WooCommerce.put(endpoint, final_data)
            .catch((error) => {
                console.log(error.response.data);
            });
        console.log(response.data)
        return "Update is Successful"
    } catch (error) {
        console.error("Error connecting to WooCommerce:", error);
    }
}


// fetches sales report
export const sales_report = async () => {
    const response = await WooCommerce.get("reports/sales")
        .catch((error) => {
            console.log(error);
        });
    return response.data
}

// gets to search product by name
export const search_product = async (product_name) => {
    const productsArray = product_name.split(",")
    const len = productsArray.length
    const resultArray = []
    for (let i = 0; i < len; i++) {
        const response = await WooCommerce.get("products", {
            search: productsArray[i],
            per_page: 20
        }).catch((error) => {
            console.log(error);
        });
        resultArray.push(response.data)
    }
    return resultArray
}

// deletes a product
export const delete_product_ecom = async (id) => {
    const response = await WooCommerce.delete("products/" + id).catch((error) => {
        console.log(error);
    });
    console.log("Deleted.........................................")
    console.log(response.data)
    return response.data
}

export const create_product_ecom = async (data) => {
    data = JSON.parse(data)
    console.log(typeof data)
    const response = await WooCommerce.post("products", data)
    return response.data
}

export const fetch_categories_ecom = async (type) => {
    const response = await WooCommerce.get("products/categories", {
        search: type
    })
        .catch((error) => {
            console.log(error.response.data);
        });
    return response.data
}

export const createCategoryEcom = async (data) => {
    try {
        data = JSON.parse(data)
        const response = await WooCommerce.post("products/categories", data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateCategoryEcom = async (data) => {
    try {
        data = JSON.parse(data)
        const response = await WooCommerce.put("products/categories/9", data)

        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getReportEcom = async (purpose = "", parameters = "") => {

    try {
        let response
        if (purpose != "" && parameters != "") {
            purpose = "reports/" + purpose
            let temp = JSON.parse(parameters)
            console.log(temp)
            response = await WooCommerce.get(purpose, temp)

        } else if (purpose != "") {
            purpose = "reports/" + purpose
            response = await WooCommerce.get(purpose)

        } else {
            return "Error"
        }
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}


// fetches all products' stock quantity, name, and price
/**
 * Retrieves ecommerce stock information.
 * @param {number} [page=1] - The page number to retrieve.
 * @returns {Promise<Array<{name: string, price: number, stock_quantity: number}>>} - A promise that resolves to an array of stock quantities.
 */
export const getAllEcommerceStocktInfo = async (page = 1) => {
    try {
        const response = await WooCommerce.get("products", {
            page: page,
            per_page: 10,
        });
        if (response.data.length === 0) {
            return "No more products";
        }
        const stockQuantities = response.data.map(({ name, price, stock_quantity }) => ({
            name,
            price,
            stock_quantity
        }));
        return stockQuantities;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const predictEcommerceStock = async (page = 1, ids = "") => {
    try {
        console.log("ids: ",ids)
        const endpoint = `products/`
        const response = await WooCommerce.get(endpoint, {
            page: page,
            per_page: 10,
            include: ids
        });
        if (response.data.length === 0) {
            return "No more products";
        }
        const stockInfo = response.data.map(({ name, price, regular_price, sale_price, on_sale, total_sales, stock_quantity }) => ({
            name,
            price,
            regular_price,
            sale_price,
            on_sale,
            total_sales,
            stock_quantity
        }));
        return stockInfo;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getCustomerInfoListEcom = async (customerName="",customerID=0) => {
    try {
        let endpoint = ""
        if(customerName != ""){
            endpoint = `customers`
        } else if(customerID != 0){
        customerName = ''
        endpoint = `customers/${customerID}`
        }
        const response = await WooCommerce.get(endpoint,{
            search: customerName
        })
        const customerInfo = response.data.map(({ first_name, last_name, email }) => ({
            full_name: `${first_name} ${last_name}`,
            email: email
        }));
        console.log(customerInfo)
        return customerInfo

    } catch (error) {
        console.error(error)
        return error
    }
}

export const getProductReviewEcom = async (customerEmail) => {
    try {
        
        const response = await WooCommerce.get("products/reviews/", {
            reviewer_email: customerEmail
        });
        const productReviewInfo = response.data.map(({ date_created_gmt,product_name, review, rating }) => ({
            date_created_gmt: date_created_gmt,
            product_name: product_name,
            review: review,
            rating: rating
        }));
        return productReviewInfo
    }
    catch (error) {
        console.error(error);
        return error;
    }
}

console.log(await products(245))

//-------------------Creating dummy reviews---------------------
// const data ={
//  product_id: 243,
//   review: "Nice product. I love it!",
//   reviewer: "Aaron Barker",
//   reviewer_email: "bradleyholland@bowen.com",
//   rating: 5
// }

// let x = await WooCommerce.post("products/reviews", data)
// console.log(x.data)
import { products, update_product, search_product,delete_product_ecom,create_product_ecom,fetch_categories_ecom, createCategoryEcom, getReportEcom, getAllEcommerceStocktInfo, predictEcommerceStock, getCustomerInfoListEcom, getProductReviewEcom } from "./woocommerce.js";
import axios from "axios";
import dotenv from "dotenv";
import fs from 'fs'
import { updateRules,createRules, categoryRules } from "./rules.js";
import { createBlog, listPostsByName, getPostById, updatePostById, deletePostById } from "./blogService.js";

dotenv.config();



async function get_product_info(id,name=""){
  console.log("Product Info--going---")
  console.log(id)
  
    let productData = await products(id)
    console.log(productData)
    try {
    return JSON.stringify({
      description: productData,
      id: id,
      product_name: name
    });
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
}

async function update_product_info(id,names,data){
  console.log("Update Operation--going---")
  console.log(data)
  if(id!=''){
    let status = await update_product(id,data)
    console.log(status)
    try {
      return `this is the response we got from woocommerce.
      here is the data,
      """ ${JSON.stringify({  
        data:data,
        status: status,
      })}
      })} """
      here our target is not to lose any data while outputting. It is showing the status of the operation. If the operation is successful, then it will show the status as 'success'. If the operation is not successful, then it will show the status as 'failed'`
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  }
}


async function do_product_operation(id,names,operations){
  console.log("Product Operation--going---")
  console.log(id)
  console.log(names)
  console.log(operations)
  if(names!=''){
    let productData = await products()
    fs.writeFileSync('product.json', JSON.stringify(productData, null, 2));
    try {
    return JSON.stringify({  
      id: id,
      product_names: names,
      operation: operations,
      data: productData
    });
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  }
}

async function get_search_products(product_name){
  console.log("Searching Product-----going----")
  console.log(product_name)
  try {
    let res = await search_product(product_name)
    console.log(res)
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({  
      data: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

async function delete_product(id){
  console.log("Deleting Product-----going----")
  console.log(id)
  try {
    let res = await delete_product_ecom(id)
    console.log(res)
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({  
      id: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

async function create_product(data){
  console.log("Creating Product-----going----")
  console.log(data)
  try {
   let res = await create_product_ecom(data)
    console.log(res)
    // return "Created"
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({  
      data: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

async function fetch_categories(type=""){
  console.log("Fetching Categories-----going----")
  try {
   let res = await fetch_categories_ecom(type)
    console.log(res)
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({  
      data: res,
      type: type
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

export async function createCategory(data){
  console.log("Creating Categories-----going----")
  try {
   let res = await createCategoryEcom(data)
    console.log(res)
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({  
      data: res,
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

export async function updateCategory(data){
  console.log("Updating Categories-----going----")
  try {
   let res = await createCategoryEcom(data)
    console.log(res)
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({  
      data: res,
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

export async function getReport(data,parameters){
  console.log("Getting Report-----going----")
  console.log(data)
  console.log(parameters)
  try {
    if (data!=""){
    let res = await getReportEcom(data,parameters)
    console.log(res)
      return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({  
      result: res
    })}
    })} """
    here our target is not to lose any data while outputting`
    } else{
      return "Not Specific. Choose sales report, top sellers, orders, products, customers, coupons, reviews, categories, tags or attributes"
    }
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

/**
 * Creates an ecommerce blog.
 * @param {Object} data - The data for creating the blog.
 * @returns {Promise<string>} - A promise that resolves with the response from WordPress.
 * @throws {Error} - If an error occurs during the creation process.
 */
export async function createEcommerceBlog(data){
  console.log("Creating Blog-----going----")
  try {
    console.log(data)
    let res = await createBlog(data)
    console.log(res)
    return `this is the response we got from wordpress.
    here is the data,
    """ ${JSON.stringify({  
      data: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

/**
 * Lists ecommerce blogs by name.
 * 
 * @param {string} name - The name of the blog.
 * @returns {Promise<string>} - The response from WordPress.
 * @throws {Error} - If an error occurs while listing the blogs.
 */
export async function listEcommerceBlog(name){
  console.log("Listing Blogs by Name-----going----")
  try {
    console.log(name)
    let res = await listPostsByName(name)
    console.log(res)
    return `this is the response we got from wordpress.
    here is the data,
    """ ${JSON.stringify({  
      data: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

/**
 * Retrieves an ecommerce blog by its ID.
 * @param {number} id - The ID of the blog to retrieve.
 * @returns {Promise<string>} - A promise that resolves to a string containing the response from WordPress.
 * @throws {Error} - If an error occurs while retrieving the blog.
 */
export async function getEcommerceBlog(id){
  console.log("Listing Blogs by ID-----going----")
  try {
    console.log(id)
    let res = await getPostById(id)
    console.log(res)
    return `this is the response we got from wordpress.
    here is the data,
    """ ${JSON.stringify({  
      data: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

/**
 * Updates an ecommerce blog post by its ID.
 *
 * @param {string} id - The ID of the blog post to update.
 * @param {object} data - The updated data for the blog post.
 * @returns {Promise<string>} - A promise that resolves to the response from WordPress.
 * @throws {Error} - If an error occurs during the update process.
 */
export async function updateEcommerceBlog(id,data){
console.log("Updating Blog-----going----")
  try {
    console.log(id)
    console.log(data)
    let res = await updatePostById(id,data)
    console.log(res)
    return `this is the response we got from wordpress.
    here is the data,
    """ ${JSON.stringify({  
      data: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

/**
 * Deletes an ecommerce blog by its ID.
 * @param {string} id - The ID of the blog to delete.
 * @param {boolean} [force=false] - Whether to force delete the blog.
 * @returns {Promise<string>} - A promise that resolves to a response from WordPress.
 * @throws {Error} - If an error occurs during the deletion process.
 */
export async function deleteEcommerceBlog(id,force=false){
  console.log("Deleting Blog-----going----")
  try {
    console.log(id)
    let res = await deletePostById(id,force)
    console.log(res)
    return `this is the response we got from wordpress.
    here is the data,
    """ ${JSON.stringify({  
      data: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

/**
 * Gets the stock level of the store.
 * @param {number} page - The page number of the stock level.
 * @returns {Promise<string>} - A promise that resolves to a string containing the stock level of the store.
 * @throws {Error} - If an error occurs while fetching the stock level.
**/

export async function getStocktInfo(page){
  console.log("Getting Stock Info-----going----")
  try {
    let res = await getAllEcommerceStocktInfo(page)
    console.log(res)
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({  
      data: res
    })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

/*
  * Retrieves ecommerce stock information.
  * @param {number} page - The page number of the stock level.
  * @param {string} ids - The ids of the products.
  * @returns {Promise<string>} - A promise that resolves to a string containing the stock level of the store.
  * @throws {Error} - If an error occurs while fetching the stock level.
  * */
export async function predictStock(page, ids = "") {
  try {
      let res = await predictEcommerceStock(page, ids)
      console.log(res)
      return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({
          data: res
      })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
      console.error("Error :", error);
      throw error;
  }
}

export async function getCustomerInfoList(name="",id=0){
  console.log("Getting Customer Info-----going----")
  try {
    let res = await getCustomerInfoListEcom(name,id)
    console.log(res)
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({
          data: res
      })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

export async function getProductReview(email){
  console.log("Getting Product Review-----going----")
  try {
    if (email==''){
      return "Email is not found"
    }
    let res = await getProductReviewEcom(email)
    console.log(res)
    return `this is the response we got from woocommerce.
    here is the data,
    """ ${JSON.stringify({
          data: res
      })}
    })} """
    here our target is not to lose any data while outputting`
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }

}

async function run_conversation() {

  const baseURL = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
  };
  let data = {
    messages: [
      {
        role: "user",
        content:
          // "What's my brother's name?",
          // "What's the description of the product id 160?",
          // "Find the description of product id 160 and sales report in the store?",
          // "Get all the names of the products that is in the store. The total number of products should be 12."
          // "Get the id and price of the product 'Handpicked Red Chillies and get the description'"
          // "Update the product handpicked red chillies and set the catlog visibility to hidden, regular price to 10."
          // "Update the product 'Handpicked Red Chillies' and set the catlog visibility to hidden, regular price to 100."
          // "Search the id of the 'Red Chillies'."
          // "Delete the product red chillies."
          // `Create our latest product, 'Premium Quality 1' It's a simple type product that we're really excited about. The regular price is $21.99. Let me tell you a bit about it:
          
          // Description: The white t-shirt stands as an emblem of simplicity and versatility, embodying effortless style and timeless appeal. Crafted from soft cotton fabric, it drapes smoothly against the skin, offering comfort throughout the day. Its pristine hue exudes purity and clarity, while its classic crew neck design ensures a flattering fit for all occasions. Whether paired with denim for a casual look or layered beneath a blazer for a touch of sophistication, the white t-shirt epitomizes understated elegance and enduring fashion.
          
          // Short Description: A white t-shirt, crafted from soft cotton, offers timeless style and comfort. With its classic crew neck design and pristine hue, it's a wardrobe essential for effortless everyday wear.
          
          // It falls under the following categories: [id 9, id 14].
          
          // And here are a couple of images: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg" and "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg"`
          "Search juice category and red chillies"
          // "Create Bag Category and the image url is 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg'"
          // "Update Bag Category and change the description to 'Very Cool Bag'"
          // "show me the product report"
          // "Show me the top sellers report of 2020"
          // "Create a blog with the title 'My Blog 122' and the content 'This is the content of my 122nd blog.' and publish it"
          // "Search the blog which goes by 'blog 50'"
          // "Show the blog with the id 5543"
          // 'Get the link of the blog with the id 5543'
          // "update the blog with the name blog 50 and set the title to 'My Blog 50' and the content to 'This is the content of my 13rd blog.' and draft"
          // "delete the blog id 5551"
          // "Undelete blog id 5551 and publish it"
          // "What's the stock level in the store?"
          // "Suggest about the storage of product id 245"
          // "What is the info of Hand Sanitizer"
          // "update the stock quantity of red chillies and yellow chillies to 12 and 15 respectively"
          // "turn off the manage stock of product 245"
          // "update the stock quantity of red chillies to 10"
          // "predict the stock levels of all products"
          // " Search for this customer aaron barker"
          // "Get the product review of aaron barker"
          

      },
    ],
    model: "gpt-4-1106-preview",
    functions: [
      {
        name: "get_product_review_list",
        description: "Get the product review of the customer. The email of the customer is mentioned in the prompt. If the email is not found, then try to find it from the 'get_customer_info' function. But even after using that function, if the email could not be found then it will show the message that the product review can't fetched.",
        parameters: {
          type: "object",
          properties: {
            email: {
              type:"string",
              description: "The email of the customer. If the email is not found, then it will be empty string", 
            },
          },
          required: ["email"],
        },
      },
      {
        name: "get_customer_info",
        description: "Get the customer info from the store. The name of the customer is mentioned in the prompt. If the customer is not found, then try to find the customer id. If both of them are not found, then it will show the message that the customer is not found. Don't show the email in output to the user. It will be used in abstract.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type:"string",
              description: "The name of the customer. If the name is not found, then it will be empty string", 
            },
            id: {
              type:"integer",
              description: "The id of the customer. If the id is not found, then it will be 0", 
            },
          },
          required: ["name","id"],
        },
      },
      {
        name: "update_product_info",
        description: "Tells the status of update operation of the product from the prompt if only the id of the product is mentioned. You will only do updates. For updating stock or storage quanitity of products, the management of stock should be turned on. At the end, you will let the user know if the operation is successful or not after analyzing the update status. You will never show any null or empty string in the response. Please tell the user that multiple updates are not allowed. If the user wants to update multiple products, then he has to do it one by one.",
        parameters: {
          type: "object",
          properties: {
            id:{
              type:"string",
              description: "The ids of the products",
            },
            product_name:{
              type:"string",
              description: "The specific name of the product if it's not specified, then it's name will be null. Also, get the other information about the product.",
            },
            new_data: {
              type:"string",
              description: "The new data which the user wants to update. The keys name for multpl are " + updateRules + "",
            },
            status:{
              type:"string",
              description: "Status of the operation where the update has been successful or not"
            }
          },
          required: ["id",'status'],
        },
      },
      {
        name: "predict_stock_ecommerce",
        description: "Give prediction or suggestion based on the name, price, regular price, sale price, on sale, total sales, and stock or storage quantity. You can do prediction on one or multiple products. Give the user suggestion on what to do with the stock quantity/level in the inventory. If the user tells to predict by providing the products' name, then find the id of those products first. For example: sometimes, the stock quantity/level might be null or zero, then it may suggest to fill the stock. Again it will suggest like should the user increase the stock level of product or should not? The ids of the products are mentioned in the prompt. If the ids are not found, then search each item at a time and pass the combined string of ids, seperated by comma here. The user will be asked if they want to see more predictions, in that case, the page number will be changed. It is to be noted that there can be synonymous words for stock level like stock quantity, stock, storage, etc.",
        parameters: {
          type: "object",
          properties: {
            page: {
              type:"integer",
              description: "The page number of the stock level. The default value is 1", 
            },
            ids:{
              type:"string",
              description: "The ids of the products. If the users want to predict for all products, then the ids will be null"
            }
          },
          required: ["page","ids"],
        },
      },
      {
        name: "get_stock_ecommerce_info",
        description: "Get the stock level of the store. The stock level of the store is mentioned in the prompt. If the stock level is not found, then it will show the message that the stock level is not found. The user will be asked if they want to see more product's stock level, in that case, the page number will be changed.",
        parameters: {
          type: "object",
          properties: {
            page: {
              type:"integer",
              description: "The page number of the stock level. The default value is 1", 
            },
          },
          required: ["page"],
        },
      },
      {
        name: "delete_ecommerce_blog",
        description: "Delete the blog in the WordPress site. The id of the blog is mentioned in the prompt. If the blog is not found, then it will show the message that the blog is not found. Without id, this will not work. By default, the blog will be sent to the trash, but the user can also delete it permanently. After deleting the blog, it will show the message that the blog has been deleted.",
        parameters: {
          type: "object",
          properties: {
            id: {
              type:"string",
              description: "The id of the blog", 
            },
            force:{
              type:"boolean",
              description: "Whether to bypass trash and force deletion."
            }
          },
          required: ["id","force"],
        },
      },
      {
        name: "update_ecommerce_blog",
        description: "Update the blog in the WordPress site. The id of the blog is mentioned in the prompt, if not then search the blog by name and find the id. If the blog is not found, then it will show the message that the blog is not found. Without id and updated data, this will not work. It will also work if the user wants to move the blog which can be done by changing the status of the blog. By default, if the user asks to take out the blog from trash, then the status will be changed to draft, otherwise the status will be as the user wants. After doing the operation, it will show the message that the blog has been updated. If any error occurs, then it will show the message that the blog has not been updated.",
        parameters: {
          type: "object",
          properties: {
            id: {
              type:"string",
              description: "The id of the blog", 
            },
            data: {
              type:"string",
              description: "The data from the prompt. The keys name are {\"id\": \"Unique identifier for the post.\",\"date\": \"The date the post was published, in the site's timezone.\",\n" +
                "\"date_gmt\": \"The date the post was published, as GMT.\",\n" +
                "\"slug\": \"An alphanumeric identifier for the post unique to its type.\",\n" +
                "\"status\": \"A named status for the post. One of: publish, future, draft, pending, private, trash\",\n" +
                "\"password\": \"A password to protect access to the content and excerpt.\",\n" +
                "\"title\": \"The title for the post.\",\n" +
                "\"content\": \"The content for the post.\",\n" +
                "\"author\": \"The ID for the author of the post.\",\n" +
                "\"excerpt\": \"The excerpt for the post.\",\n" +
                "\"featured_media\": \"The ID of the featured media for the post.\",\n" +
                "\"comment_status\": \"Whether or not comments are open on the post. One of: open, closed\",\n" +
                "\"ping_status\": \"Whether or not the post can be pinged. One of: open, closed\",\n" +
                "\"format\": \"The format for the post. One of: standard, aside, chat, gallery, link, image, quote, status, video, audio\",\n" +
                "\"meta\": \"Meta fields.\",\n" +
                "\"sticky\": \"Whether or not the post should be treated as sticky.\",\n" +
                "\"template\": \"The theme file to use to display the post.\",\n" +
                "\"categories\": \"The terms assigned to the post in the category taxonomy.\",\n" +
                "\"tags\": \"The terms assigned to the post in the post_tag taxonomy.\"}" 
            },
          },
          required: ["id","data"],
        },
      },
      {
        name: "get_ecommerce_blog_by_id",
        description: "Get the blog by id in the WordPress site. The id of the blog is mentioned in the prompt. If the blog is not found, then it will show the message that the blog is not found.",
        parameters: {
          type: "object",
          properties: {
            id: {
              type:"string",
              description: "The id of the blog", 
            },
          },
          required: ["id"],
        },
      },
      {
        name: "search_ecommerce_blog",
        description: "Searches the blog in the WordPress site. The name or title of the blog is mentioned in the prompt. If the blog is not found, then it will show the message that the blog is not found.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type:"string",
              description: "The name or title of the blog", 
            },
          },
          required: ["name"],
        },
      },
      {
        name: "create_ecommerce_blog",
        description: "Create a blog in the WordPress site. The title and content of the blog are mentioned in the prompt. The status of the blog is also mentioned in the prompt. If the status is not mentioned, then it will be draft by default.",
        parameters: {
          type: "object",
          properties: {
            data: {
              type:"string",
              description: "The data from the prompt. The keys name are {\"date\": \"The date the post was published, in the site's timezone.\",\n" +
                "\"date_gmt\": \"The date the post was published, as GMT.\",\n" +
                "\"slug\": \"An alphanumeric identifier for the post unique to its type.\",\n" +
                "\"status\": \"A named status for the post. One of: publish, future, draft, pending, private, trash\",\n" +
                "\"password\": \"A password to protect access to the content and excerpt.\",\n" +
                "\"title\": \"The title for the post.\",\n" +
                "\"content\": \"The content for the post.\",\n" +
                "\"author\": \"The ID for the author of the post.\",\n" +
                "\"excerpt\": \"The excerpt for the post.\",\n" +
                "\"featured_media\": \"The ID of the featured media for the post.\",\n" +
                "\"comment_status\": \"Whether or not comments are open on the post. One of: open, closed\",\n" +
                "\"ping_status\": \"Whether or not the post can be pinged. One of: open, closed\",\n" +
                "\"format\": \"The format for the post. One of: standard, aside, chat, gallery, link, image, quote, status, video, audio\",\n" +
                "\"meta\": \"Meta fields.\",\n" +
                "\"sticky\": \"Whether or not the post should be treated as sticky.\",\n" +
                "\"template\": \"The theme file to use to display the post.\",\n" +
                "\"categories\": \"The terms assigned to the post in the category taxonomy.\",\n" +
                "\"tags\": \"The terms assigned to the post in the post_tag taxonomy.\"}" 
            },
          },
          required: ["data"],
        },
      },
      {
        name: "get_report",
        description: "Get the report of the store. The type of reports that can be fetched are: sales report, top sellers, orders, products, customers, coupons, reviews, categories, tags and attributes. Show the full details of the report. Don't miss anything. It can't show all the reports, but you will say sorry in that case. Sometimes there will get no data for any report. Say sorry. The dafault parameter for top_sellers is {\"period\":\"week\"}. Mention the time period for sales and top-sellers, but don't mention if the user specifices a definite time period like he wants to know the sales report of 2020, so \"period\" won't be shown.",
        parameters: {
          type: "object",
          properties: {
            preData: {
              type:"string",
              description: "The processed purpose from the prompt. For sales report: '''sales''', for top sellers/sellers report: '''top_sellers''', for total orders/orders report: '''orders/totals''', for products' report: '''products/totals''', for customers report: '''customers/totals''', for coupons report: '''coupons/totals''', for reviews report: '''reviews/totals''', for categories report: '''categories/totals''',  for tags report: '''tags/totals''', for attributes report: '''attributes/totals''' and for all report: ''",
            },
            parametersData:{
              type: "string",
              description: "It will get the parameters for sales and top sellers. You don't have to mention all parameters, just the ones that are mentioned. But there's period for top sellers by default and it's \'week\'. The key rules are: '{\"context\":{\"type\":\"string\",\"description\":\"Scope under which the request is made; determines fields present in response. Default is view. Options: view.\"},\"period\":{\"type\":\"string\",\"description\":\"Report period. Default is 'week'. Options: 'week', 'month', 'last_month' and 'year'\"},\"date_min\":{\"type\":\"string\",\"description\":\"Return sales for a specific start date, the date need to be in the YYYY-MM-DD format.\"},\"date_max\":{\"type\":\"string\",\"description\":\"Return sales for a specific end date, the date need to be in the YYYY-MM-DD format.\"}}'",
            }
          },
          required: ["preData","parametersData"],
        },
      },
      {
        name: "update_categories",
        description: "Update the category in the store. It will only work if the category id is mentioned explicitly in the prompt",
        parameters: {
          type: "object",
          properties: {
            data: {
              type:"string",
              description: "The data from the prompt. The keys name are " + categoryRules,
            },
            id: {
              type:"string",
              description: "The category id",
            },
          },
          required: ["data"],
        },
      },
      {
        name: "create_categories",
        description: "Create the category in the store.",
        parameters: {
          type: "object",
          properties: {
            data: {
              type:"string",
              description: "The data from the prompt. The keys name are " + categoryRules,
            },
          },
          required: ["data"],
        },
      },
      {
        name: "fetch_categories",
        description: "Fetch or search the categories of the products in the store. If the user wants to fetch or search product types, then the search or fetch will be made accordingly",
        parameters: {
          type: "object",
          properties: {
            data: {
              type:"string",
              description: "The fetched or searched data",
            },
            type: {
              type:"string",
              description: "The type of the category that is to be fetched or searched",
            },
          },
          required: [],
        },
      },
      {
        name: "get_search_products",
        description: "Searches the information of the product by name.",
        parameters: {
          type: "object",
          properties: {
            product_name:{
              type: "string",
              description:"The name of the products. The names will be seperated by commas if there are multiple products",
            },
            data: {
              type:"object",
              description: "The data",
            },
          },
          required: [],
        },
      },
      {
        name: "delete_product",
        description: "Deletes the product of the store. It can delete one product at a time. If the product name is only provided in the prompt, then it will use it to search and get the product id and then delete it. The information about the product id which is to be deleted is pointed out explicitly, then delete it using the id. If the product's name is mentioned instead of product id, then search the product and get the id of that product and then delete it. Remember the product id is a number and it can't be any number mentioned in the prompt unless it is pointed out",
        parameters: {
          type: "object",
          properties: {
            id:{
              type: "string",
              description:"The id of the product",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "create_product_preprocessing",
        description: "Preprocesses the information of the product from the prompt before creating the product of the store.",
        parameters: {
          type: "object",
          properties: {
            data: {
              type:"string",
              description: "The new data which the user wants to create. The keys name are " + createRules,
            },
          },
          required: [],
        },
      },
      {
        name: "create_product",
        description: "Create the product of the store.",
        parameters: {
          type: "object",
          properties: {
            data: {
              type:"string",
              description: "The new data which the user wants to create. The keys name are " + createRules,
            },
          },
          required: ["data"],
        },
      },
      {
        name: "do_other_non_ecommerce_things",
        description: "If the user gives any prompt which is unrelated to products or ecommerce then then that you are sorry to do this operation",
        parameters: {
          type: "object",
          properties: {
            purpose:{
              type:"string",
              description: "The purpose that the user wants",
            },
            status:{
              type:"string",
              description: "The name of the person",
            },
          },
          required: ["purpose","status"],
        },
      },
      {
        name: "get_product_operation",
        description: "do the operation that is mentioned in the prompt. But you can't do CRUD operations. Do not miss anything. If you get empty strings, then ignore those and work with what you have. Also, you can find the id of the product which the given product info like name,etc",
        parameters: {
          type: "object",
          properties: {
            product_names:{
              type:"string",
              description: "The specific name of the product. If it's not specified, then it's names will be empty string.",
            },
            id:{
              type:"string",
              description: "List of the ids of the product. If it's not specified, then it's ids will be empty string",
            },
            operation: {
              type:"string",
              description: "The type of operation that the user wants. Read the whole prompt and make it descriptive",
            },
            data: {
              type:"object",
              description: "The data of the all products",
            },
          },
          required: ["operation","data"],
        },
      },
      {
        name: "get_product_info",
        description: "Get the information of the product from the prompt if only the id of the product is mentioned",
        parameters: {
          type: "object",
          properties: {
            id:{
              type:"string",
              description: "The id of the product",
            },
            product_name:{
              type:"string",
              description: "The specific name of the product if it's not specified, then it's name will be null. Also, get the other information about the product.",
            },
            data: {
              type:"object",
              description: "The data of the product",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "show_status",
        description: "Show the status of the operation",
        parameters: {
          type: "object",
          properties: {
            status:{
              type:"string",
              description: "Status of the operation"
            }
          },
          required: ["status"],
        },
      },
    ],
    function_call: "auto",
  };

  try {

    console.log(`Sending initial request to OpenAI API...`);
    let response = await axios.post(baseURL, data, { headers });
    response = response.data;
    
// 15. Track Executed Functions to Prevent Unnecessary Invocations
    let executedFunctions = {};
// 16. Loop to process the conversation until it finishes.
    while (
      response.choices[0].message.function_call &&
      response.choices[0].finish_reason !== "stop"
    ) {
      let message = response.choices[0].message;
      
      const function_name = message.function_call.name;
      // 17. Breaks the loop if function has already been executed.
      if (executedFunctions[function_name]) {
        break;
      }
      // 18. Calls the appropriate function based on the name.
      let function_response = "";
      switch (function_name) {
        case "get_product_review_list":
          let argsProductReview = JSON.parse(message.function_call.arguments);
          function_response = await getProductReview(
            argsProductReview.email
          );
          break;
        case "get_customer_info":
          let argsCustomerInfo = JSON.parse(message.function_call.arguments);
          function_response = await getCustomerInfoList(
            argsCustomerInfo.name,
            argsCustomerInfo.id
          );
          break;
        case "predict_stock_ecommerce":
          let argsPredictStock = JSON.parse(message.function_call.arguments);
          function_response = await predictStock(
            argsPredictStock.page,
            argsPredictStock.ids
          );
          break;
        case "get_stock_ecommerce_info":
          let argsStock = JSON.parse(message.function_call.arguments);
          function_response = await getStocktInfo(
            argsStock.page
          );
          break;
        case "delete_ecommerce_blog":
          let argsDeleteBlog = JSON.parse(message.function_call.arguments);
          function_response = await deleteEcommerceBlog(
            argsDeleteBlog.id,
            argsDeleteBlog.force
          );
          break;
        case "update_ecommerce_blog":
          let argsUpdateBlog = JSON.parse(message.function_call.arguments);
          function_response = await updateEcommerceBlog(
            argsUpdateBlog.id,
            argsUpdateBlog.data
          );
          break;
        case "get_ecommerce_blog_by_id":
          let argsBlogId = JSON.parse(message.function_call.arguments);
          function_response = await getEcommerceBlog(
            argsBlogId.id
          );
          break;
        case "search_ecommerce_blog":
          let argsSearchBlog = JSON.parse(message.function_call.arguments);
          function_response = await listEcommerceBlog(
            argsSearchBlog.name
          );
          break;
        case "create_ecommerce_blog":
          let argsBlog = JSON.parse(message.function_call.arguments);
          function_response = await createEcommerceBlog(
            argsBlog.data
          );
          break;
        case "get_report":
          let argsReport = JSON.parse(message.function_call.arguments);
          function_response = await getReport(
            argsReport.preData,
            argsReport.parametersData
          )
          break;  
        
        case "create_categories":
          let argsCatCreate = JSON.parse(message.function_call.arguments);
          function_response = await createCategory(
            argsCatCreate.data
          )
          break;
        case "fetch_categories":
          let argsCatInfo = JSON.parse(message.function_call.arguments);
          function_response = await fetch_categories(
            argsCatInfo.type
          )
          break;
        
        case "get_product_info":
          let argsProdInfo = JSON.parse(message.function_call.arguments);
          function_response = await get_product_info(
            argsProdInfo.id,
          );
          break;
        case "get_search_products":
          let argsSearchProd = JSON.parse(message.function_call.arguments);
          function_response = await get_search_products(
              argsSearchProd.product_name,
          );
          break;
        case "delete_product":
          let argsDeleteProd = JSON.parse(message.function_call.arguments);
          function_response = await delete_product(
            argsDeleteProd.id,
          );
          break;
        case "create_product_preprocessing":
        let argsPreCreateProd = JSON.parse(message.function_call.arguments);
          function_response = JSON.stringify({
            data: argsPreCreateProd.data,
          })
          break;
        case "create_product":
          let argsCreateProd = JSON.parse(message.function_call.arguments);
          function_response = await create_product(
              argsCreateProd.data,
          );
          break;
        case "do_other_non_ecommerce_things":
          let argsNonEcom = JSON.parse(message.function_call.arguments);
          function_response = JSON.stringify({
            purpose: argsNonEcom.purpose,
            status: "Sorry. It can't be done",
          })
          break;
        case "get_product_operation":
          let argsProdOp = JSON.parse(message.function_call.arguments);
          function_response = await do_product_operation(
            argsProdOp.id,
            argsProdOp.product_names,
            argsProdOp.operation,
          );
          break;

        case "show_status":
          let argsStatus = JSON.parse(message.function_call.arguments);
          function_response = await JSON.stringify({
            status: argsStatus.status,
          })
          break;
          
        case "update_product_info":
          let argsUpdateOp = JSON.parse(message.function_call.arguments);
          function_response = await update_product_info(
            argsUpdateOp.id,
            argsUpdateOp.product_name,
            argsUpdateOp.new_data,
          );
          break;
        default:
          throw new Error(`Unsupported function: ${function_name}`);
      }
// 19. Adds the function to the executed functions list.
      executedFunctions[function_name] = true;
// 20. Appends the function response to the messages list.
      data.messages.push({
        role: "function",
        name: function_name,
        content: function_response,
      });
// 21. Makes another API request with the updated messages list.
console.log(data)
      console.log(`Sending request to OpenAI with ${function_name} response...`);
      response = await axios.post(baseURL, data, { headers });
      response = response.data;
      console.log(response.choices[0]['message'])
    }
// 22. Makes the final API request after the conversation is finished.

    response = await axios.post(baseURL, data, { headers });
    response = response.data;
    
    
// 23. Returns the final response data.
    return response;
  } catch (error) {
// 24. Logs any error encountered during execution.
    console.error("Error:", error);
  }
}
// 25. Running the conversation and processing the response.
run_conversation()
  .then((response) => {
// 26. Logging the final message content.
    console.log(response.choices[0].message.content);
  })
  .catch((error) => {
// 27. Logging any error encountered during execution.
    console.error("Error:", error);
  });

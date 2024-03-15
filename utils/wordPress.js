import axios from "axios";
import { config } from "../config.js";
/**
 * Connects to WordPress and retrieves an authentication token.
 * @returns {Promise<string>} The authentication token.
 * @throws {Error} If there is an error connecting to WordPress.
 */
const connectToWordPress = async () => {
    try {
        const url = config.WORDPRESS_URL + '/wp-json/jwt-auth/v1/token'
        const response = await axios.post(url, {
            username: config.WORDPRESS_USERNAME,
            password: config.WORDPRESS_PASSWORD
        });
        const token = response.data.token;
        return token;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a blog in WordPress.
 * @param {Object} data - The data for the blog.
 * @returns {Promise<Object>} The created blog data.
 * @throws {Error} If there is an error creating the blog.
 */
export const createBlog = async (data) => {
    try {
        const token = await connectToWordPress();
        const response = await axios.post('https://ecommercewp.managedcoder.com/wp-json/wp/v2/posts', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response && response.data) {
            return response.data;
        } else {
            return 'Invalid response data received'
        }
    } catch (error) {
        return 'Error creating blog:';
    }
};

/**
 * Lists WordPress posts by name.
 * @param {string} name - The name to search for in the posts.
 * @returns {Promise<Array<Object>>} The list of posts matching the name.
 * @throws {Error} If there is an error listing the posts.
 */
export const listPostsByName = async (name) => {
    try {
        const token = await connectToWordPress();
        const response = await axios.get(`https://ecommercewp.managedcoder.com/wp-json/wp/v2/posts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                search: name,
                status: 'publish, draft, trash' // Search for both published and draft posts
            }
        });
        if (response && response.data) {
            console.log(response.data)
            return response.data;
        } else {
            return 'Invalid response data received'
        }
    } catch (error) {
        return 'Error listing posts. Check the name of the post to list.';
    }
};

/**
 * Gets a WordPress post by ID.
 * @param {number} id - The ID of the post to retrieve.
 * @returns {Promise<Object>} The retrieved post data.
 * @throws {Error} If there is an error getting the post.
 */
export const getPostById = async (id) => {
    try {
        const token = await connectToWordPress();
        const response = await axios.get(`https://ecommercewp.managedcoder.com/wp-json/wp/v2/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return 'Failed to get post. Check ID or Name of the post to get.';
        }
    } catch (error) {
        return 'Error getting post. Check ID or Name of the post to get.';
    }
};

/**
 * Updates a WordPress post by ID.
 * @param {number} id - The ID of the post to update.
 * @param {Object} data - The updated data for the post.
 * @returns {Promise<Object>} The updated post data.
 * @throws {Error} If there is an error updating the post.
 */
export const updatePostById = async (id, data) => {
    try {
        const token = await connectToWordPress();
        const response = await axios.put(`https://ecommercewp.managedcoder.com/wp-json/wp/v2/posts/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return 'Failed to update post. Check ID or Name of the post to update.';
        }
    } catch (error) {
        return 'Failed to update post. Check ID or Name of the post to update.';
    }
};

/**
 * Deletes a WordPress post by ID.
 * @param {number} id - The ID of the post to delete.
 * @param {boolean} permanently - Whether to permanently delete the post or move it to trash.
 * @returns {Promise<Object>} The deleted post data.
 * @throws {Error} If there is an error deleting the post.
 */

export const deletePostById = async (id, permanently) => {
    try {
        const token = await connectToWordPress();
        const response = await axios.delete(`https://ecommercewp.managedcoder.com/wp-json/wp/v2/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                force: permanently ? 'true' : 'false'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return 'Failed to delete post. Check ID or Name of the post to delete.';
        }
    } catch (error) {
        return 'Failed to delete post. Check ID or Name of the post to delete.'
    }
};

listPostsByName('blog 50')
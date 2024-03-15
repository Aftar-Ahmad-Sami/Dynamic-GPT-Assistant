import dotEnv from "dotenv";
import path from 'path';

dotEnv.config({
    path: path.resolve(`${process.cwd()}`, `.env.${process.env.NODE_ENV}`),
});
export const config ={
    WORDPRESS_URL: process.env.WORDPRESS_URL,
    WORDPRESS_USERNAME: process.env.WORDPRESS_USERNAME,
    WORDPRESS_PASSWORD: process.env.WORDPRESS_PASSWORD,
    WOOCOMMERCE_CONSUMER_KEY: process.env.WO_CONSUMER_KEY,
    WOOCOMMERCE_CONSUMER_SECRET: process.env.WO_CONSUMER_SECRET,
    WORDPRESS_VERSION: process.env.WORDPRESS_VERSION,
}
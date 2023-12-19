import * as request from '../lib/requests.js';

const baseUrl = 'http://localhost:3030/data/posts';

export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
}

export const getRecentPosts = async (limit = 3) => {
    const allPosts = await getAll();

    // Sort posts based on creation time in descending order
    const sortedPosts = allPosts.sort((a, b) => b._createdOn - a._createdOn);

    // Return only the three most recent posts
    return sortedPosts.slice(0, limit);
};

export const create = async (postData) => {
    const result = await request.post(baseUrl, postData);

    return result;
}

export const getOne = async (postId) => {
    const result = await request.get(`${baseUrl}/${postId}`);

    return result;
}

export const edit = async (postId, postData) => {
    const result = await request.put(`${baseUrl}/${postId}`, postData);

    return result;
};

export const removePost = async (postId) => request.remove(`${baseUrl}/${postId}`)
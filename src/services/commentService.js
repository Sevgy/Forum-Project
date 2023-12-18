import * as request from '../lib/requests.js';

const baseUrl = 'http://localhost:3030/data/comments';

export const getAll = async (postId) => {
    const query = new URLSearchParams({
        where: `postId="${postId}"`,
        load: `owner=_ownerId:users`
    })

    const result = await request.get(`${baseUrl}?${query}`);

    return result;
}

export const getOne = async (commentId) => {
    const result = await request.get(`${baseUrl}/${commentId}`);

    return result;
}

export const create = async (postId, text) => {
    const newComment = await request.post(baseUrl, {
        postId,
        text
    });

    return newComment;
}

export const edit = async (commentId, commentData) => {
    const result = await request.put(`${baseUrl}/${commentId}`, commentData);

    return result;
};

export const removeComment = async (commentId) => request.remove(`${baseUrl}/${commentId}`)
    
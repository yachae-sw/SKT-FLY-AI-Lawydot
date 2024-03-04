export const host = 'http://localhost:5000';

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const logoutRoute = `${host}/api/auth/logout`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;

export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const sendOptionRoute = `${host}/api/messages/geminiall`;
export const sendCosinRoute = `${host}/api/messages/cosin`;

export const postsRoute = `${host}/api/posts/getAllPost`;
export const postoneRoute = `${host}/api/posts/getonePost`;

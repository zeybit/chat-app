export const host = "http://localhost:5000";
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;

export const addEventRoute = `${host}/api/eventRoutes/createEvent`; // Olay oluşturma rotası
export const getUserEventsRoute = (userId) => `${host}/api/eventRoutes/${userId}`; // Kullanıcıya ait olayları alma
export const updateEventRoute = (eventId) => `${host}/api/eventRoutes/${eventId}`; // Olay güncelleme
export const deleteEventRoute = (eventId) => `${host}/api/eventRoutes/${eventId}`; // Olay silme

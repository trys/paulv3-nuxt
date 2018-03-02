import GoTrue from 'gotrue-js';
const isLocal = document.location.host.split(":").shift() === 'localhost'
const auth = new GoTrue({ APIUrl: 'https://paultheoctopus.netlify.com/.netlify/identity', setCookie: !isLocal });
export default auth

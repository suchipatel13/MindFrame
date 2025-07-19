// app/firebaseAuth.js
import { getAuth } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);

export { auth };

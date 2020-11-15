import { v4 as uuidv4 } from 'uuid';
import cookie from 'react-cookies';

const USER_ID_KEY = 'userId';

const getUserId = () => {
  let userId = cookie.load(USER_ID_KEY);

  if (!userId) {
    userId = uuidv4();
    cookie.save(USER_ID_KEY, userId);
  }

  return userId;
};

export default getUserId;

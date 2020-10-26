import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'react-cookies';
import { websocketServer } from '../../../../settings';

const USER_ID_KEY = 'userId';

const Counter = () => {
  if (!websocketServer) return null;

  useEffect(() => {
    let userId = cookie.load(USER_ID_KEY);

    if (!userId) {
      userId = uuidv4();
      cookie.save(USER_ID_KEY, userId);
    }

    const client = new WebSocket(`ws://${websocketServer}`);
    client.onopen = () => {
      const payload = { action: 'joined', userId };
      client.send(JSON.stringify(payload));
    };

    return () => {
      const payload = { action: 'left', userId };
      client.send(JSON.stringify(payload));
    };
  }, []);

  return null;
};

export default Counter;

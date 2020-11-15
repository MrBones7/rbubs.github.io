import React, { useEffect } from 'react';
import getUserId from '../../../lib/UserId';

import { websocketServer } from '../../../../settings';

const Counter = () => {
  if (!websocketServer) return null;

  useEffect(() => {
    const userId = getUserId();

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

import mitt from 'mitt';

export type AppEvents = {
  'inbox-message': any;
  'socket-disconnect': void;
  'socket-connect': void;
};

export const eventBus = mitt<AppEvents>();

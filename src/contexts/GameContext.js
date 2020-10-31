import React, { useReducer, useEffect } from 'react';
import socketClient from 'socket.io-client';

//const socket = socketClient(process.env.REACT_APP_SOCKET_ADDRESS, {
const socket = socketClient('https://murmuring-lowlands-11880.herokuapp.com/', {

  autoConnect: false,
});

const GameContext = React.createContext();

const storage = localStorage.getItem('player');


const reducer = (state, action) => {

  switch (action.type) {

    case 'RELOAD':
      // return window.location.reload();
      return window.location.reload(false);

    case 'FEEDBACK_ERROR':
      return {
        ...state,
        showError: action.payload
      }

    case 'ROOMS':
      return {
        ...state,
        rooms: action.payload,
      };

    case 'ROOM':
      if (state.players[action.payload]) {
        return {
          ...state,
          room: state.rooms[state.players[action.payload].room],
        };
      } else return { ...state };

    case 'MATCHS':
      return {
        ...state,
        matchs: action.payload,
      };

    case 'MATCH':
      if (state.players[action.payload]) {
        return {
          ...state,
          match: state.matchs[state.players[action.payload].room],
        };
      } else return { ...state };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case 'CLEAR_MESSAGE':
      return {
        ...state,
        messages: [],
      };

    case 'CLEAR_PLAYER':
      return {
        ...state,
        player: {},
        messages: []
      };

    case 'PLAYER':
      return {
        ...state,
        player: action.payload,
      };

    case 'PLAYERS':
      return {
        ...state,
        players: action.payload,
      };

    case 'MARCAR_CAMPO':
      return {
        ...state,
        match: state.match.tabuleiro[0] = "X",
      };

    case 'CONNECTED':
      return {
        ...state,
        isConnected: action.payload,
      }

    case 'SETAR_DISPLAY_WIDTH':
      return {
        ...state,
        displayLarge: action.payload,
      }

    default:
      return state;
  }
};

const initialState = {
  isConnected: false,
  player: {},
  rooms: {},
  room: {},
  players: {},
  messages: [],
  matchs: {},
  match: {},
  displayLarge: window.innerWidth,
  showError: undefined
};

const GameProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {

    socket.on('connect', () => {

      if (storage) {
        socket.emit('Reconnect', JSON.parse(storage));
      }
      dispatch({ type: 'CONNECTED', payload: true });
    });

    socket.on('disconnect', () => {

      dispatch({ type: 'CONNECTED', payload: false });

    });

    socket.on('deslogar', () => {

      localStorage.removeItem('player');
      dispatch({ type: 'CLEAR_PLAYER' });
    });

    socket.on('PlayersRefresh', (players) => {

      const player = players[socket.id];

      if (player) {

        localStorage.setItem('player', JSON.stringify(player));
        dispatch({ type: 'PLAYER', payload: player });
      }

      dispatch({ type: 'PLAYERS', payload: players });

    });

    socket.on('ReceiveMessage', (receivedMessage) => {
      dispatch({ type: 'ADD_MESSAGE', payload: receivedMessage });
    });

    socket.on('ClearMessage', () => {
      dispatch({ type: 'CLEAR_MESSAGE', payload: {} });
    });

    socket.on('RoomsRefresh', (rooms) => {
      dispatch({ type: 'ROOMS', payload: rooms });
      dispatch({ type: 'ROOM', payload: socket.id });
    });

    socket.on('MatchRefresh', (matchs) => {
      dispatch({ type: 'MATCHS', payload: matchs });
      dispatch({ type: 'MATCH', payload: socket.id });
    });

    socket.on('MatchClear', () => {
      dispatch({ type: 'MATCH', payload: {} });
    });

    socket.on('Reload', () => {
      dispatch({ type: 'RELOAD' });
    });

    socket.on('ShowError', (msg) => {

      dispatch({ type: 'FEEDBACK_ERROR', payload: msg });

      setTimeout(() => {
        dispatch({ type: 'FEEDBACK_ERROR', payload: undefined });
      }, 4000);

    });

    socket.on('MarcarCampo', () => {
      dispatch({ type: 'MARCAR_CAMPO', payload: {} });
    });

    socket.open();

    function handleResize() {
      dispatch({ type: 'SETAR_DISPLAY_WIDTH', payload: window.innerWidth });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <GameContext.Provider value={state}>{props.children}</GameContext.Provider>
  );
};

export {
  GameContext,
  GameProvider
};

export default socket

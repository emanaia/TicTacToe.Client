
import socket from '../contexts/GameContext.js';

const sendMessage = (message) => {
    socket.emit('SendMessage', message);
};

const createRoom = (values) => {
    socket.emit('CreateRoom', values);
};

const leaveRoom = () => {
    socket.emit('LeaveRoom');
};

const joinRoom = (roomId) => {
    socket.emit('JoinRoom', roomId);
};

const gameLoaded = () => {
    socket.emit('GameLoaded');
};

const login = (name) => {
    socket.emit('Login', name);
};

const deslogar = () => {
    socket.emit('deslogar');
};

const playerPronto = (check) => {
    socket.emit('playerPronto', check);
}

const startMatch = () => {
    socket.emit('startMatch');
}

const startMatchRobo = () => {
    socket.emit('startMatchRobo');
}

const LeaveMatch = () => {
    socket.emit('LeaveMatch');
}

const marcarCampo = (values) => {
    socket.emit('SetarTabuleiro', values);
}

const verifyPass = (senha, roomId) => {
    socket.emit('checkPass', { senha, roomId });
}

export {
    sendMessage,
    createRoom,
    leaveRoom,
    joinRoom,
    gameLoaded,
    login,
    deslogar,
    playerPronto,
    startMatch,
    startMatchRobo,
    LeaveMatch,
    marcarCampo,
    verifyPass
}

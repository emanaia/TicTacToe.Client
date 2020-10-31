import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { leaveRoom, playerPronto, startMatch } from '../helpers/socketEmit';

import PlayerCheck from '../icons/PlayerCheck';
import PlayerNotCheck from '../icons/PlayerNotCheck';
import Leave from '../icons/Leave'


const Room = () => {
    const { player, room } = useContext(GameContext);

    const handleCheck = () => {

        if (room.player1 === player.socketId) {
            playerPronto({ player: 1, check: !room.checkP1 })
        }

        if (room.player2 === player.socketId) {
            playerPronto({ player: 2, check: !room.checkP2 })
        }
    }

    return (
        <>
            {player.room && <>

                <div className="row border border-dark rounded-top mx-2 my-0 py-1 px-3 align-items-center tet-dark " >
                    <div className="media-body align-self-center m-0 px-0 py-2 ">

                        <div className="row p-0 m-0 ">
                            <h6 className='m-0 p-0' >{room && room.name}</h6>
                        </div>
                    </div>

                    <div className="m-0 p-0">
                        <button className="btn btn-sm text-dark p-0 m-0 shadow-none" title='Sair' data-toggle="modal" data-target="#leaveRoom" > {/*BOTAO SAIR*/}
                            <Leave />
                        </button>
                    </div>
                </div>

                <div className='mx-2 my-0 p-0 border border-top-0 border-dark rounded-bottom'>             {/* PLAYER ESTÁ NUMA SALA */}

                    <div className='row justify-content-center align-items-center p-0 m-0 py-3 '>

                        <div className='col-4 px-0 m-0 text-right'>
                            <span className='text-monospace'>{room && room.player1 && room.nameP1}</span>
                        </div>

                        <div className='col-auto p-0 my-0 mx-1 '>
                            {(room && room.checkP1) ? <PlayerCheck /> : <PlayerNotCheck />}
                            <small className='text-info font-weight-bold'>VS</small>
                            {(room && room.checkP2) ? <PlayerCheck /> : <PlayerNotCheck />}
                        </div>

                        <div className='col-4 px-0 m-0 text-left'>
                            <span className='text-monospace'> {room && room.player2 && room.nameP2}</span>
                        </div>
                    </div>

                    {(room && room.player1 && room.player2) ?
                        <div className='row  p-0 m-0 mb-3 '>

                            <div className="col py-0 px-4 m-0">

                                {room.player1 === player.socketId ?
                                    (!room.checkP1) ?
                                        <button onClick={handleCheck} className="d-flex btn btn-sm btn-info text-light font-weight-bolder p-0 m-0 ml-2 playerCheck" >
                                            <span className="m-0 mr-1 p-0 inner-circle bg-light rounded rounded-lg"></span>
                                            <span className='m-0 p-0 my-auto'>Pronto</span>
                                        </button>
                                        :
                                        <button onClick={handleCheck} className="d-flex btn btn-sm btn-success text-light font-weight-bolder p-0 m-0 ml-2  playerCheck"  >
                                            <span className='m-0 p-0 ml-1 my-auto'>Pronto</span>
                                            <span className="m-0 ml-auto p-0 inner-circle bg-light rounded rounded-lg"></span>
                                        </button>
                                    : (!room.checkP2) ?
                                        <button onClick={handleCheck} className="d-flex btn btn-sm btn-info text-light font-weight-bolder p-0  mx-auto playerCheck"  >
                                            <span className="m-0 mr-1 p-0 inner-circle bg-light rounded rounded-lg"></span>
                                            <span className='m-0 p-0 my-auto'>Pronto</span>
                                        </button>
                                        :
                                        <button onClick={handleCheck} className="d-flex btn btn-sm btn-success text-light font-weight-bolder p-0  mx-auto playerCheck"  >
                                            <span className='m-0 p-0 ml-1 my-auto'>Pronto</span>
                                            <span className="m-0 ml-auto p-0 inner-circle bg-light rounded rounded-lg"></span>
                                        </button>}

                            </div>

                            {room && room.player1 && room.player2 && (room.player1 === player.socketId) && (room.checkP1) && (room.checkP2) &&
                                <div className=' col m-0 py-0 px-4 ' >
                                    <button className="d-flex btn btn-sm btn-info text-light font-weight-bolder p-1 my-0 ml-auto" onClick={() => { startMatch() }}>Iniciar Jogo</button>
                                </div>
                            }
                        </div>
                        : null
                    }


                </div>


                <hr></hr>
            </>
            }

            {/* -----v------ Modal de leaveRoom     */}

            <div className="modal fade" id="leaveRoom" >
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content p-2">

                        <div className="modal-body mx-auto">Quer realmente sair dessa sala?</div>

                        <div className="row justify-content-around py-3">
                            <button type="button" className="btn btn-secondary shadow-none" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger shadow-none" data-dismiss="modal" onClick={leaveRoom}>Sair</button>
                        </div>

                    </div>
                </div>
            </div>

        </>

    );
};

export default Room;


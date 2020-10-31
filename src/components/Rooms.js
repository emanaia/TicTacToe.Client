import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { joinRoom, verifyPass, startMatchRobo } from '../helpers/socketEmit';
import Room from './Room';

import Enter from '../icons/Enter';
import Padlock from "../icons/password.png";

const Rooms = () => {
    const { matchs, player, rooms } = useContext(GameContext);

    const [roomSelected, setRoomSelected] = useState('');
    const [roomPassEnter, setRoomPassEnter] = useState('');

    const handleEnterRoom = (roomId) => {
        verifyPass(roomPassEnter, roomId);
        setRoomPassEnter('');
    }

    return (
        <>
            <Room />


            {!player.room &&
                <div className="row border mx-2 mt-0 mb-2 p-2 rounded bg-light shadow align-items-center">
                    <div className="media-body align-self-center m-0 px-0 py-2 ">

                        <div className="row p-0 m-0">
                            <h6 className="m-0 p-0 ">Jogue contra o robô</h6>
                        </div>
                    </div>
                    <div className="m-0 p-0">
                        <button className='btn btn-sm shadow-none p-1 m-0' title="Entrar" onClick={() => startMatchRobo()}><Enter /></button>
                    </div>
                </div>
            }

            {Object.keys(rooms).map((r) => (   // r = roomId         EXIBIÇÃO DE SALAS  

                (rooms[r].player1 !== player.socketId) && (rooms[r].player2 !== player.socketId) ?

                    <div className="row border mx-2 mt-0 mb-2 p-2 rounded bg-light shadow align-items-center" key={r}>

                        <div className="media-body align-self-center m-0 p-0 ">

                            <div className="row p-0 m-0 mb-2">
                                <h6 className="m-0 p-0 ">{rooms[r].name}</h6>
                            </div>

                            <div className="row p-0 m-0" >

                                <div className="text-light py-0 px-2 m-0 mr-2 rounded rounded-lg rooms-info ">
                                    {matchs[r] ? <small>EM JOGO</small> : (rooms[r].player2 === undefined) ? <small>1 / 2</small> : <small>F U L L</small>}
                                </div>

                                {rooms[r].senha && <img src={Padlock} alt="" width='38' height='17' />}
                            </div>
                        </div>

                        <div className="m-0 p-0">
                            {!player.room && !rooms[r].player2 && (!rooms[r].senha ?
                                <button className='btn btn-sm shadow-none p-1 m-0' title="Entrar" onClick={() => joinRoom(r)}><Enter /></button>
                                :
                                <button className='btn btn-sm shadow-none p-1 m-0' data-toggle="modal" data-target="#enter" title="Entrar" onClick={() => { setRoomSelected(r) }}><Enter /></button>
                            )}
                        </div>
                    </div>
                    : null

            ))}



            {/* MODAL ENTER ROOM*/}
            <div className="modal fade" id="enter" >
                <div className="modal-dialog modal-dialog-centered modal-sm " >
                    <div className="modal-content p-4">
                        <form >
                            <div className="form-group">
                                <label htmlFor="roomPass">Digite a senha da sala</label>
                                <input
                                    className="form-control form-control-md shadow-none"
                                    type="password"
                                    maxLength="12"
                                    autoComplete="off"
                                    value={roomPassEnter}
                                    onChange={(e) => { setRoomPassEnter(e.target.value) }} />
                            </div>

                            <div className="row justify-content-around py-2" >
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => { handleEnterRoom(roomSelected) }}>Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </>
    );
};

export default Rooms;


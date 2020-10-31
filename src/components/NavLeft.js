import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { createRoom } from '../helpers/socketEmit';

import PlayerList from './PlayerList';
import Rooms from './Rooms';
import Chat from './Chat';
import CreateRoom from '../icons/CreateRoom';
import blackList from '../helpers/validacao';

const NavLeft = () => {
    const { player, players, displayLarge } = useContext(GameContext);

    const [roomName, setRoomName] = useState('');
    const [roomPass, setRoomPass] = useState('');
    const [tabRooms, setTabRooms] = useState(true);
    const [alert, setAlert] = useState(false);

    const handleCreateRoom = () => {

        const name = roomName.trim();

        if (blackList(name)) {
            createRoom({ name: roomName, senha: roomPass });
            setRoomName('');
            setRoomPass('');

        } else setAlert(true)
    }

    return (<>

        <div className='row justify-content-between align-items-center px-2 py-2 m-0 mb-3 bg-dark text-light shadow menu' >

            <ul className="nav nav-pills pl-2" id="pills-tab" role="tablist">

                <li className="nav-item" role="presentation" onClick={() => { setTabRooms(true) }}>
                    <h6 className='nav-link active btn-outline-light  p-2 m-0' type='button' id="pills-home-tab" href="#pills-home"
                        data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true" title='Exibir Salas'> Salas </h6>
                </li>


                <li className="nav-item my-0 mx-3" role="presentation" onClick={() => { setTabRooms(false) }}>
                    <h6 className='nav-link btn-outline-light border-light p-2 m-0 ' type='button' id="pills-players-tab" href="#pills-players"
                        data-toggle="pill" role="tab" aria-controls="pills-players" aria-selected="false" title='Exibir Jogadores'> Jogadores </h6>
                </li>

                {displayLarge < 576 &&
                    <li className="nav-item " role="presentation" onClick={() => { setTabRooms(false) }}>
                        <h6 className='nav-link btn-outline-light border-light p-2 m-0 ' type='button' id="pills-chat-tab" href="#pills-chat"
                            data-toggle="pill" role="tab" aria-controls="pills-chat" aria-selected="false" title='Exibir Chat'> Chat </h6>
                    </li>}
            </ul>

            {!player.room && tabRooms &&
                <button className="btn btn-sm text-light shadow-none p-0 mr-2" title='Criar Sala' data-toggle="modal" data-target="#create" >    { /* CRIAR SALA */}
                    <CreateRoom />
                </button>
            }
        </div>

        <div className="tab-content d-flex content" id="pills-tabContent" style={{ overflowX: "hidden", overflowY: 'auto' }}>
            <div className="tab-pane fade show active w-100" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"> <Rooms /></div>
            <div className="tab-pane fade w-100" id="pills-players" role="tabpanel" aria-labelledby="pills-players-tab"> <PlayerList players={players} /></div>
            {displayLarge < 576 && <div className="tab-pane fade w-100 h-100" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
                <Chat />

            </div>}
        </div>


        {/* MODAL CREATE ROOM*/}
        <div className="modal fade" id="create" >
            <div className="modal-dialog modal-dialog-centered modal-sm " >
                <div className="modal-content p-2">

                    <div className="modal-header p-2">
                        <h5 className="modal-title">Criar Sala</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <form >
                            <div className="form-group">
                                <small htmlFor="roomName" >Nome da Sala</small>
                                <input id="roomName"
                                    className="form-control form-control-md shadow-none"
                                    type="text"
                                    maxLength="20"
                                    placeholder={`Sala de ${player.name}`}
                                    value={roomName}
                                    onChange={(e) => { setRoomName(e.target.value) }}
                                    autoComplete="off" />
                            </div>
                            <div className="form-group">
                                <small htmlFor="roomPass">Senha</small>
                                <input
                                    className="form-control form-control-md shadow-none"

                                    type="password"
                                    maxLength="12"
                                    autoComplete="off"
                                    value={roomPass}
                                    onChange={(e) => { setRoomPass(e.target.value) }} />
                            </div>

                            <div className="row justify-content-around py-2" >
                                <button type="button" className="btn btn-secondary " data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => handleCreateRoom()}>Confirmar</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        {/* -----v------ Modal Alert palavrão     */}
        <div className={`modal fade ${alert ? 'show d-block' : 'invisible'}`} id="alert" >
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content p-1" style={{ backgroundColor: '#f5bbbbe0' }}>
                    <div className="modal-body mx-auto p-2"><strong>Tenha bons modos! Evite palavrões!</strong></div>
                    <div className="row justify-content-center py-1">
                        <button type="button" className="btn btn-sm btn-secondary shadow-none" data-dismiss="modal" onClick={() => setAlert(false)}>Fechar</button>
                    </div>
                </div>
            </div>
        </div>

    </>
    );
};

export default NavLeft;


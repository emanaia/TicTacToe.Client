import React, { useContext } from 'react';

import { GameContext } from '../contexts/GameContext';
import { deslogar } from '../helpers/socketEmit';

const Navbar = () => {

    const { player } = useContext(GameContext);

    return (
        <>
            <div className="navbar col-12 bg-info text-dark p-0 m-0 px-3">

                <h6 className="p-0 m-0 ">Olá, {player.name}</h6>

                <button type="button" className="btn btn-sm btn-outline-dark shadow-none" data-toggle="modal" data-target="#logout">Deslogar</button>

            </div >

            {/* -----v------ Modal de LeaveMatch     */}

            <div className="modal fade" id="logout" >
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content p-2">

                        <div className="modal-body mx-auto">Quer realmente deslogar do jogo?</div>

                        <div className="row justify-content-around py-3">
                            <button type="button" className="btn btn-secondary shadow-none" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger shadow-none" data-dismiss="modal" onClick={() => deslogar()}>Deslogar</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;






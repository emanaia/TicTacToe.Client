import React, { useContext, useEffect } from 'react';

import { GameContext } from '../contexts/GameContext';
import { marcarCampo, startMatch, startMatchRobo, LeaveMatch } from '../helpers/socketEmit';

import { PlayerXisTurn, PlayerBolaTurn, PlayerXisWait, PlayerBolaWait } from '../icons/PlayerInGame';


const Game = () => {
    const { room, match, player } = useContext(GameContext);

    const jogador = (match.P1 === player.socketId) ? 'player1' : 'player2';

    useEffect(() => {

        for (let i = 0; i < 9; i++) {

            if (match.vez !== jogador) document.getElementById("board").children[i].style.cursor = "no-drop";

            else document.getElementById("board").children[i].style.cursor = "pointer";

            if (match.tabuleiro[i]) document.getElementById("board").children[i].style.cursor = "no-drop";
        }

        if (match.winner) {
            for (let k = 0; k < 3; k++) {
                if (jogador === match.winner) document.getElementById("board").children[match.trilha[k]].style.color = "green";
                else document.getElementById("board").children[match.trilha[k]].style.color = "darkred";
            }
        }

        if (!match.winner && match.jogada === 1) {
            for (let k = 0; k < 9; k++) {
                document.getElementById("board").children[k].style.color = "black";
            }
        }

    }, [match, jogador]);


    const handleClick = (index) => {

        if (!match.tabuleiro[index] && match.vez === jogador) {

            const value = (match.P1 === player.socketId) ? "X" : "O"
            marcarCampo({ index, value })
        }

        console.log(room);
    }

    return (
        <>
            {room ?
                !match.endGame ?
                    match.P1 === player.socketId ?
                        (match.vez === "player1") ?
                            <div className="navbar tgreen bg-dark text-success font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span>Sua vez de jogar</span> </div>
                            :
                            <div className="navbar tred bg-dark text-danger font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span>Aguarde o oponente jogar</span></div>

                        : (match.vez === "player2") ?
                            <div className="navbar tgreen bg-dark text-success font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span>Sua vez de jogar</span></div>
                            :
                            <div className="navbar tred bg-dark text-danger font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span>Aguarde o oponente jogar</span></div>

                    : match.winner ?

                        (match.P1 === player.socketId) ? match.winner === 'player1' ?
                            <div className="navbar tgreen bg-dark text-success font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span> Voce venceu!</span></div>
                            :
                            <div className="navbar tred bg-dark text-danger font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span> Você perdeu!</span></div>

                            : match.winner === 'player2' ?
                                <div className="navbar tgreen bg-dark text-success font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span> Voce venceu!</span></div>
                                :
                                <div className="navbar tred bg-dark text-danger font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span> Você perdeu!</span></div>

                        : <div className="navbar bg-dark text-warning font-weight-bolder py-2 justify-content-center shadow shadow-lg"> Empate</div>

                : <div className="navbar tred bg-dark text-danger font-weight-bolder py-2 justify-content-center shadow shadow-lg"><span> O outro jogador abandonou a partida</span></div>
            }



            <div className="container mh-100 p-0 " style={{ marginTop: '5%' }}>

                {room &&
                    <div className='row  justify-content-center align-items-center p-0  mb-3 mx-0 '>

                        <div className='col-4 px-0 m-0  text-right ' >
                            <span className='text-h5 text-monospace font-weight-bolder p-0 m-0'>{room && room.player1 && room.nameP1}</span>
                        </div>

                        <div className='col-auto p-0 my-0 mx-1 mx-sm-2 '>

                            {match.vez === 'player1' ? <PlayerXisTurn /> : <PlayerXisWait />}
                            <small className='text-info font-weight-bold text-monospace'>VS</small>
                            {match.vez === 'player2' ? <PlayerBolaTurn /> : <PlayerBolaWait />}
                        </div>

                        <div className='col-4 px-0 m-0 ml-sm-1 text-left '>
                            <span className='text-h5 text-monospace font-weight-bolder p-0 m-0'>{room && room.player2 && room.nameP2}</span>
                        </div>
                    </div>}


                <div id='board' className="row row-cols-3 col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 mx-auto p-0 bg-info rounded shadow shadow-lg">

                    {/* <!-- Linha 1 --> */}

                    <div className="d-flex justify-content-center " onClick={() => handleClick(0)} >{match.tabuleiro[0]}</div>

                    <div className="d-flex justify-content-center border-right border-left" onClick={() => handleClick(1)} > {match.tabuleiro[1]} </div>

                    <div className="d-flex justify-content-center" onClick={() => handleClick(2)} > {match.tabuleiro[2]} </div>

                    {/* <!-- Linha 2 --> */}

                    <div className="d-flex justify-content-center border-top border-bottom" onClick={() => handleClick(3)}> {match.tabuleiro[3]} </div>

                    <div className="d-flex justify-content-center border " onClick={() => handleClick(4)} > {match.tabuleiro[4]} </div>

                    <div className="d-flex justify-content-center border-top border-bottom" onClick={() => handleClick(5)} > {match.tabuleiro[5]} </div>

                    {/* <!-- Linha 3 --> */}

                    <div className="d-flex justify-content-center shadow shadow-lg" onClick={() => handleClick(6)} > {match.tabuleiro[6]} </div>

                    <div className="d-flex justify-content-center border-right border-left shadow shadow-lg" onClick={() => handleClick(7)} > {match.tabuleiro[7]} </div>

                    <div className="d-flex justify-content-center shadow shadow-lg" onClick={() => handleClick(8)} > {match.tabuleiro[8]} </div>

                </div>

                <div className='row justify-content-around align-items-center p-0 mt-4 col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 mx-auto'>

                    {room ?
                        <button type="button" className="btn btn-outline-danger shadow shadow-lg" data-toggle="modal" data-target="#sair"> Sair da Partida </button>
                        :
                        <button type="button" className="btn btn-outline-danger shadow shadow-lg" onClick={() => { LeaveMatch() }}>Sair da Partida</button>
                    }

                    {room && match.endGame ?
                        match.P2 === 'robo' ?
                            <button className='btn btn-outline-success shadow shadow-lg' onClick={() => { startMatchRobo() }}>Jogar Novamente</button>
                            :
                            <button className='btn btn-outline-success shadow shadow-lg' onClick={() => { startMatch() }}>Jogar Novamente</button>
                        : null
                    }

                </div>
            </div>


            {/* -----v------ Modal de LeaveMatch     */}

            <div className="modal fade" id="sair" >
                <div className="modal-dialog modal-dialog-centered  modal-sm">
                    <div className="modal-content p-2">

                        <div className="modal-body mx-auto">Quer realmente abandonar o jogo?</div>

                        <div className="row justify-content-around py-3">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { LeaveMatch() }}>Abandonar</button>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default Game;

import React, { useState, useEffect, useContext } from 'react';

import autosize from 'autosize';

import { GameContext } from '../contexts/GameContext';
import { sendMessage } from '../helpers/socketEmit';
import blackList from '../helpers/validacao'

const Chat = () => {

    const { messages, player } = useContext(GameContext);
    const [messageToSend, setMessageToSend] = useState('');
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        const elem = document.getElementById('chat-content');
        if (elem) elem.scrollTop = elem.scrollHeight;
    }, [messages]);

    const handleInput = (e) => {
        setMessageToSend(e.target.value);
        let ta = e.target;
        autosize(ta);
    }

    const sendMsg = () => {

        // let now = new Date().toLocaleString('pt-BR');
        const msg = messageToSend.trim();
        if (blackList(msg)) {
            sendMessage(msg);
            setMessageToSend('');
            autosize.destroy(document.querySelector('textarea'));

        } else setAlert(true)
    };


    return (<>

        <div id='chat-content' className='chat-content d-flex px-2 pt-1' style={{ flexDirection: 'column', flexBasis: '100%', overflowX: "hidden", overflowY: 'auto' }}>
            {messages.map((m, index) => (

                <div key={index} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '75%' }}
                    className={`px-2 py-0 my-1 mx-0 rounded  ${m.id === player.socketId ? 'msg-mine ml-auto' : 'bg-white mr-auto'} `}>
                    <small className='font-weight-bolder p-0 m-0'>{m.player + '\n'}</small>
                    {m.msg + '\n'}
                </div>
            ))}
        </div>

        <div className='d-flex justify-content-between align-items-center p-3'>

            <textarea
                id="chat-id-2-input"
                className="form-control bg-light border-0 mr-2 shadow"
                placeholder="Digite uma mensagem..."
                rows="1" data-emoji-input=""
                data-autosize="true"
                style={{ overflow: 'hidden', overflowWrap: 'break-word', resize: 'none', maxHeight: '200px' }}
                value={messageToSend}
                onChange={(e) => handleInput(e)}
                maxLength="1000"
            />

            <input className="btn btn-info border-0 "
                type="submit"
                onClick={messageToSend.trim() ? sendMsg : (e) => { e.preventDefault() }}
                value="Enviar"
            />
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
export default Chat;

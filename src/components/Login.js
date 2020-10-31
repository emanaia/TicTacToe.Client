import React, { useState, useContext } from 'react';
import { login } from '../helpers/socketEmit';
import AlertError from './AlertError';
import blackList from '../helpers/validacao'
import { GameContext } from '../contexts/GameContext';

const Login = () => {
  const { showError } = useContext(GameContext);
  const [name, setName] = useState('');
  const [ErrorFront, setErrorFront] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    const nameToSend = name.trim();

    if (blackList(nameToSend)) login(nameToSend);

    else {
      setErrorFront('Nome inadequado!');
      setTimeout(() => { setErrorFront(false); }, 4000);
    }

  };

  // onClick={name.trim() ? onLogin : null} 

  return (<>

    <div className="container container-login">

      <div className="col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto shadow shadow-lg bg-light border rounded rounded-lg p-4">

        <h3 className="text-center mb-3 text-info"><strong>Jogo da Velha Online</strong></h3>

        <form >

          <div className="form-inline px-0 py-3 d-flex justify-content-center">

            <input className="form-control shadow-none border-dark "
              type="text"
              maxLength="10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Informe seu nome"
              autoComplete="off"
              required autoFocus />

            <button className="mt-4 mt-md-0  ml-0 ml-md-3 btn btn-outline-secondary btn-info text-light border-0 "
              type="submit" onClick={name.trim() ? onLogin : (e) => { e.preventDefault() }}  >Entrar</button>

          </div>

        </form>
      </div>


    </div>

    {showError && <AlertError msg={showError} />}

    {ErrorFront && <AlertError msg={ErrorFront} />}
  </>


  );
};

export default Login
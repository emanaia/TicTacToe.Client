import React, { useContext, useState } from 'react';

import { GameContext } from '../contexts/GameContext';
import AlertError from './AlertError';

import NavLeft from './NavLeft';
import Game from './Game';
import Chat from './Chat';
import Login from './Login';
import Navbar from './Navbar';
import Footer from './Footer';


const Home2 = () => {
  const { isConnected, match, player, showError, displayLarge } = useContext(GameContext);
  const [time, setTime] = useState(false);

  setTimeout(() => {
    setTime(true);
  }, 1000);

  if (!isConnected) return <div id="preloader"></div>    //colocar uma animação de carregamento

  if (match && match.start) {
    return <Game />
  }

  if (Object.keys(player).length !== 0 && player.socketId) {



    return (

      <div className="container-fluid h-100 p-0 m-0" >

        <Navbar />

        <div className="row p-0 py-3 px-sm-3 m-0 ">

          <div className='col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 border border-top-0 p-0 m-0 mr-sm-1 mr-md-3 content ' >

            <NavLeft />

          </div>

          {displayLarge > 576 &&

            <div className="col-sm col-md col-lg col-xl border border-top-0 p-0 m-0 flex-column content d-flex" >
              <div className='m-0 p-0 mb-2'>

                <div className='row justify-content-between align-items-center px-2 py-2 m-0 bg-dark text-light shadow menu' >
                  <h6 className='m-0 mx-2 p-0'>Chat</h6>
                </div>
              </div>
              <Chat />
            </div>
          }


        </div>

        <Footer />

        {showError && <AlertError msg={showError} />}

      </div >
    );
  }

  return (<>

    {time ? <Login /> : <div id="preloader"></div>}
  </>
  )

};

export default Home2;

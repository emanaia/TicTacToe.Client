import React from 'react';

export const OpenRoom = () => {
    return (
        <div className="col-3 col-sm-3 col-md-3 col-xl-2 progress bg-dark align-items-center m-0 p-0" >


            <div className="progress-bar w-100 h-100 font-weight-bold bg-dark" role="progressbar"
                aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
            > <small>1 / 2</small> </div>


        </div >
    );
}

export const FullRoom = () => {
    return (
        <div className="col-3 col-sm-3 col-md-3  progress bg-dark align-items-center m-0 p-0 " >

            <div className="progress-bar w-100 h-100 font-weight-bold bg-dark" role="progressbar"
                aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
            > <small>F U L L</small> </div>


        </div >
    );
}

export const GameInProgress = () => {
    return (
        <div className="col-3 col-sm-3 col-md-3  progress bg-dark align-items-center m-0 p-0" >

            <div className="progress-bar w-100 h-100 font-weight-bold bg-dark text-bold" role="progressbar"
                aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
            > <small>EM JOGO</small> </div>


        </div >
    );
}


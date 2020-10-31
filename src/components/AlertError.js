import React from 'react';

const AlertError = (props) => {
    return (
        <div className="col-12 text-center bg-danger text-dark fixed-bottom py-3 alert-senha">
            <h5 className='m-0 p-0'>{props.msg}</h5>
        </div>
    );
}

export default AlertError;

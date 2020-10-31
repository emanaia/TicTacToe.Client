import React from 'react';

const PlayerList = (props) => {

    return (
        <>
            {/* {[...new Array(5)]
                .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
                                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')} */}

            {
                Object.keys(props.players)
                    .map((key) => (
                        <div key={key} className='mx-3 my-2 text-capitalize'>{props.players[key].name}</div>
                    ))
            }
        </>
    );
};

export default PlayerList;

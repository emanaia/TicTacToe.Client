import React from 'react';

import { Facebook, Instagram, Linkedin } from '../icons/SocialIcons'

const Footer = () => {
    return (

        <div className="row col-12 justify-content-between align-items-center bg-info text-dark m-0 p-0 px-3 footer" >

            <div className="col col-sm text-left social-icons m-0 p-0" style={{ whiteSpace: 'nowrap' }} >
                <a href="https://www.facebook.com/eduardo.goncalves.5832/" target="_blank" rel="noopener noreferrer" className="mx-1">
                    <Facebook />
                </a>
                <a href="https://www.instagram.com/manaiadudu/" target="_blank" rel="noopener noreferrer" className="mx-1 ">
                    <Instagram />
                </a>
                <a href="https://www.linkedin.com/in/eduardo-manaia-b6059a145/" target="_blank" rel="noopener noreferrer" className="mx-1">
                    <Linkedin />
                </a>
            </div>

            <div className="col-12 col-sm-8 text-center p-0 m-0">
                <h6 className="p-0 m-0">Desenvolvido por Eduardo Manaia</h6>
                <small className="p-0 m-0">Todos os direitos reservados ao autor</small>
            </div>

            <div className="col text-right font-weight-bold version p-0 m-0">
                <h6 className="p-0 m-0">vs 1.0.1</h6>
            </div>

        </div>

    );
}

export default Footer;









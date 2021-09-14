import React from 'react';
import style from './About.module.css'
import { DiReact, DiPostgresql, DiCss3, DiNodejsSmall, DiJavascript1  } from "react-icons/di";

function About() {
    return (
        <div className={style.main}>
        <div className={style.container}>
            <div className={style.text}>
                <p>GourNet is an application developed as a practice for the SoyHenry bootcamp. </p>
                <p>The backend consumes the Spooncolar API and creates a database where the new recipes will be saved. </p>
                <p>For its part, the frontend is in charge of controlling the dynamism and the UI of the website. </p>
                <p>The technologies implemented were React.js, Redux, Node.js, Sequelize, PostgreSQL. For the styles, pure CSS was used through modules.  </p>
                <p>We hope you liked the development and implementation. Thanks for visiting us.  </p>
            </div>
            
            <div className={style.iconos}>
                <span className={style.js}><DiJavascript1/></span>
                <span className={style.react}><DiReact/></span>
                <span className={style.node}><DiNodejsSmall/></span>
                <span className={style.postgre}><DiPostgresql/></span>
                <span className={style.css}><DiCss3/></span>
            </div>
        </div>
        </div>
    )
}

export default About

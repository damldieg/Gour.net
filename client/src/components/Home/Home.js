import React from 'react'
import {Link} from 'react-router-dom';
import style from './Home.module.css'

export const Home = () => {

  

    return (
        <div className={style.container} >
            <div className={style.title}>
                <h1 className={style.focus}>GourNet</h1>
            </div>
            <div className={style.containerButton}>
                <Link to="/home" className={style.btn}>Become a Chef</Link>
            </div>

        </div>
    )
}





export default Home


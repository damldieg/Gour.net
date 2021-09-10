import React from 'react'
import {Link} from 'react-router-dom';

export const Home = () => {

  

    return (
        <div>
            <div>
                <h1>GourNet</h1>
            </div>
            <div>
                <Link to="/home"><button>Entry</button></Link>
            </div>
        </div>
    )
}





export default Home


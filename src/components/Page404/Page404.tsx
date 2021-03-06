import React from 'react';
import SadSmile from '../../assets/sadsmile.svg';
import './Page404.scss';

const Page404 = (): React.ReactElement => {
    return (
        <div className="container-page404">
            <img src={SadSmile} alt="sad smile" className="container-page404__img" />
            <h1>404</h1>
            <h2>page not found</h2>
        </div>
    );
};

export default Page404;

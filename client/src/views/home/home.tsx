import React from 'react';
import { RouteComponentProps } from "@reach/router";

const Home = (_:RouteComponentProps) => {
    return (
        <div id="home" className="home-base">
            <h2>Welcome to MAL personal instance</h2>

            <div>
                <div className="summary-anime-list"></div>
                <div className="summary-download-list"></div>
            </div>
        </div>
    );
}

export default Home;
import React from 'react';

export interface SummaryBarProps {
    name?: string;
    linkToImage?: string;
    description?: string;
    releaseDate?: string;
}

export const SummaryBox = ( {name, linkToImage, description, releaseDate } : SummaryBarProps ) => {
    return (
        <div className="summary-box">
            <h2 className="summary-header">{name}</h2>
            <img className="summary-image" src={linkToImage}/>
            <span className="summary-release-date">{releaseDate}</span>
            <span className="summary-description">{description}</span>
        </div>
    );
}
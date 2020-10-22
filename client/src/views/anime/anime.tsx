import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from "@reach/router";
import { List, ListObjectInterface } from "../../components/list/list";
import { SummaryBox } from "../../components/summary-box/summary-box";

interface AnimeProps extends RouteComponentProps {
    animeID?: string;
  }

interface AnimeInterface {
    name?: string;
    downloaded?: string;
    favourite?: string;
    imageLink?: string;
}

const Anime = ( {animeID} :AnimeProps) => {
    const [anime, setAnime] = useState<AnimeInterface>()
    const [episodes, setEpisodes] = useState<ListObjectInterface[]>([])

    const tableHeaders = [
        "Name",
        "Episode",
        "Release Date"
    ]

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
          const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/anime/${animeID}`);
          const json = await response.json();
          setAnime(json.anime)
          setEpisodes(json.episodes)    
        }
        fetchData();    
      }, []);

    async function favourite() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/anime/${animeID}/favourite`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({'favourite': true})
        });
        const json = await response.json();
        setAnime(json.anime)
    }

    async function unfavourite() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/anime/${animeID}/favourite`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({'favourite': false})
        });
        const json = await response.json();
        setAnime(json.anime)
    }

    async function download() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/anime/${animeID}/download`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({'download': true})
        });
        const json = await response.json();
        setAnime(json.anime)
    }

    async function removeDownload() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/anime/${animeID}/download`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({'download': false})
        });
        const json = await response.json();
        setAnime(json.anime)
    }

    return (
        <div id="anime" className="anime-base">
            {anime &&
            <div>
                <h2 className="anime-header">Anime : {anime.name}</h2>
                <img className="anime-image" src={anime.imageLink}></img>
                <div className="anime-button-bar">
                    { anime.downloaded == "downloadable" &&
                        <button className="anime-button" onClick={download}>Download</button>
                    }
                    { anime.downloaded == "downloading" &&
                        <button className="anime-button button-inactive">Delete Download</button>
                    }
                    { anime.downloaded == "downloaded" &&
                        <button className="anime-button" onClick={removeDownload}>Delete Download</button>
                    }
                    { anime.favourite == "true" ? 
                        <button className="anime-button" onClick={favourite}>Favourite</button> : 
                        <button className="anime-button" onClick={unfavourite}>Unfavourite</button>
                    }
                </div>
                <SummaryBox name={anime.name} linkToImage={anime.imageLink} />
                {episodes &&
                    <List tableHeaders={tableHeaders} listObjects={episodes}/>
                }
                {!episodes &&
                    <div>Episodes information is not available.</div>
                }
            </div>
            }
            {!anime &&
                <h2>Anime not found</h2>
            }
        </div>
    );
}

export default Anime;
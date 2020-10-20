import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from "@reach/router";
import { List, ListObjectInterface } from "../../components/list/list";


interface AnimeProps extends RouteComponentProps {
    animeID?: string;
  }

interface AnimeInterface {
    name?: string;
    downloaded?: boolean;
}

const Anime = ( {animeID} :AnimeProps) => {
    const [anime, setAnime] = useState<AnimeInterface>()
    const [epsiodes, setEpisodes] = useState<ListObjectInterface[]>([])

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

    return (
        <div id="anime" className="anime-base">
            {anime &&
                <h2>Anime {anime.name}</h2>
            }
            {!anime &&
                <h2>Anime not found</h2>
            }
            <List tableHeaders={tableHeaders} listObjects={epsiodes}/>
        </div>
    );
}

export default Anime;
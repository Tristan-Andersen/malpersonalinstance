import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from "@reach/router";
import { List, ListObjectInterface } from "../../components/list/list";


const AnimeList = (_:RouteComponentProps) => {
    const [animes, setAnimes] = useState<ListObjectInterface[]>([])
    const tableHeaders = [
        "Name",
        "Release date"
    ]

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
          const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/animelist`);
          const json = await response.json();
          setAnimes(json)    
        }
        fetchData();    
      }, []);

    return (
        <div id="animelist" className="animelist-base">
            <h2>Anime List</h2>
            <List tableHeaders={tableHeaders} listObjects={animes}/>
        </div>
    );
}

export default AnimeList;
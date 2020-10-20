import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from "@reach/router";
import { List, ListObjectInterface } from "../../components/list/list";


const Downloads = (_:RouteComponentProps) => {
    const [downloads, setDownloads] = useState<ListObjectInterface[]>([])
    const tableHeaders = [
        "Name",
        "Release date",
        "Storage size"
    ]

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
          const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/downloads`);
          const json = await response.json();
          setDownloads(json)    
        }
        fetchData();    
      }, []);

    return (
        <div id="downloads" className="downloads-base">
            <h2>Welcome to MAL personal instance</h2>
            <List tableHeaders={tableHeaders} listObjects={downloads}/>
        </div>
    );
}

export default Downloads;
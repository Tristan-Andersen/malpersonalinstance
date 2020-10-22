import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from "@reach/router";
import { ListObjectInterface, List } from "../../components/list/list"

interface AnimeJSONProp {
    name: string;
    releaseDate: string;
}


const Home = (_:RouteComponentProps) => {

    const [animeSummary, setAnimeSummary] = useState<ListObjectInterface[]>()
    const [downloadSummary, setDownloadSummary] = useState<ListObjectInterface[]>()

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/anime/summary`);
            const json = await response.json().then(data => data as AnimeJSONProp[]);
            const generalisedAnimeSummary: ListObjectInterface[] = [];
            json.forEach((animeInformation) => {
                const animeJSONObj = {values: [] as string[]} as ListObjectInterface
                Object.entries(animeInformation).forEach(item => {
                    animeJSONObj.values.push(item[1])
                });
                generalisedAnimeSummary.push(animeJSONObj)
            });
            setAnimeSummary(generalisedAnimeSummary);
            
            const responseDownload = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/download/summary`);
            const jsonDownload = await responseDownload.json().then(data => data as AnimeJSONProp[]);

            const generalisedDownloadSummary: ListObjectInterface[] = [];
            jsonDownload.forEach((downloadInformation) => {
                const downloadJSONObj = {values: [] as string[]} as ListObjectInterface
                Object.entries(downloadInformation).forEach(item => {
                    downloadJSONObj.values.push(item[1])
                });
                generalisedDownloadSummary.push(downloadJSONObj)
            });
            setDownloadSummary(generalisedDownloadSummary) 
          }
          fetchData(); 
    }, [])

    return (
        <div id="home" className="home-base">
            <h2>Welcome to MAL personal instance</h2>

            <div>
                {animeSummary &&
                <div className="summary-anime-list">
                    <List header="Anime Summary"  tableHeaders={["name", "releaseDate"]} listObjects={animeSummary}/>
                </div>
                }
                {downloadSummary &&
                <div className="summary-download-list">
                    <List header="Download Summary"  tableHeaders={["name", "releaseDate"]} listObjects={downloadSummary}/>
                </div>
                }
            </div>
        </div>
    );
}

export default Home;
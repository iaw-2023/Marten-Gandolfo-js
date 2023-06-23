import { useEffect } from "react";
import { useState } from "react";
import ErrorMessage from "../../../ErrorMessage";
import LoadingSpinner from "../../../LoadingSpinner";
import GameInfo from "./GameInfo";
import GameSearchBar from "./GameSearchBar";
import GamesList from "./GamesList";

export default function GameSearch(){
    const [allGames, setAllGames] = useState([]);
    const [featuredGames, setFeaturedGames] = useState([]);
    const [specificGames, setSpecificGames] = useState([]);
    const [gameInfo, setGameInfo] = useState(null);
    const [isLoadingAllGames, setIsLoadingAllGames] = useState(true);
    const [isLoadingFeaturedGames, setIsLoadingFeaturedGames] = useState(true);
    const [isLoadingSpecificGames, setIsLoadingSpecificGames] = useState(false);
    const [isLoadingGameInfo, setIsLoadingGameInfo] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filterAllGames = (games) => {
        const forbiddenWords = ['dlc', 'soundtrack', 'pack', 'entitlements', 'costume', 'suit', 'challenge', 'kit', 'content', 'key', 'character', 'demo', 'tool', 'expansion', 'addon', 'trial', 'beta', 'test', 'mod', 'video', 'movie', 'film', 'sdk', 'guide','walkthrough', 'trailer', 'upgrade', 'intro', 'season'];
        return games.filter(game => game.name != '' && !forbiddenWords.some(substring => game.name.toLowerCase().includes(substring)));
    };

    const fetchAllGames = () => {
        const fetchGamePage = (url) => {
          return fetch(url)
            .then(response => {
              if (!response.ok) throw new Error('Error al cargar juegos');
              return response.json();
            });
        };
      
        Promise.all([fetchGamePage(process.env.REACT_APP_API_URL + '_api/steam/games/page/0'), fetchGamePage(process.env.REACT_APP_API_URL + '_api/steam/games/page/1')])
          .then(([data1, data2]) => {
            const combinedData = [...data1, ...data2];
            setAllGames(filterAllGames(combinedData));
            setIsLoadingAllGames(false);
          })
          .catch(error => {
            setErrorMessage(error.message)
            setIsLoadingAllGames(false);
          });
      };

    const fetchFeaturedGames = () => {
        fetch(process.env.REACT_APP_API_URL + '_api/steam/games/featured')
            .then(response => {
                if(!response.ok) throw new Error('Error al cargar juegos');
                return response.json();
            })
            .then(data => {
                setFeaturedGames(data.featured_win);
                setSpecificGames(data.featured_win);
                setIsLoadingFeaturedGames(false);
            })
            .catch(error => {
                setErrorMessage(error.message)
                setIsLoadingFeaturedGames(false);
            });
    }

    useEffect(() => {
        fetchAllGames();
        fetchFeaturedGames();
    }, []);

    const handleSearchTermChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if(searchTerm && !isLoadingAllGames){
            setGameInfo(null);
            setIsLoadingSpecificGames(true);
            const filteredGames = allGames.filter(game =>
                    game.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
                .slice(0, 100);
            setSpecificGames(filteredGames);
            setIsLoadingSpecificGames(false);
        }
    }

    const handleClearSearch = () => {
        /* setGameInfo(null);
        setSpecificGames(featuredGames);
        setSearchTerm(''); */
        if(gameInfo){
            setGameInfo(null);
        }
        else if(searchTerm) {
            setSpecificGames(featuredGames);
            setSearchTerm('');
        }
    }

    const fetchGameInfo = (id) => {
        setIsLoadingGameInfo(true);
        fetch(process.env.REACT_APP_API_URL + '_api/steam/games/' + id)
            .then(response => {
                if(!response.ok) throw new Error('Error al cargar juegos');
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                setGameInfo(data[id].data);
                setIsLoadingGameInfo(false);
            })
            .catch(error => {
                setErrorMessage(error.message);
                setIsLoadingGameInfo(false);
            });
    }

    /* console.log(games);
    if(games)
        console.log(games.applist.apps.filter(app => app.name == 'Slay the Spire')); */
    if(gameInfo) console.log(gameInfo.pc_requirements);

    return (
        <div class='card p-2'>
            {errorMessage ?
                    <ErrorMessage message={errorMessage} />
                :                
                    <>
                        <h2 class='m-1' >Buscador de juegos</h2>
                        <GameSearchBar handleClearSearch={handleClearSearch} searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} handleSearch={handleSearch} />
                        {isLoadingAllGames || isLoadingFeaturedGames || isLoadingSpecificGames || isLoadingGameInfo ?
                            <div>
                                <h4 class="text-center">Cargando juegos, esto puede demorar unos segundos...</h4>
                                <LoadingSpinner />
                            </div>
                        :
                            specificGames &&
                                gameInfo ?
                                    <GameInfo gameInfo={gameInfo} />
                                :
                                    <GamesList specificGames={specificGames} fetchGameInfo={fetchGameInfo} />
                        }
                    </>
            }
        </div>
    );
}
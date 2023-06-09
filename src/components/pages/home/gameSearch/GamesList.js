import '../../../../App.css';

export default function GamesList({ specificGames, fetchGameInfo }){
    const removeDuplicates = (array) => {
        return Object.values(
            array.reduce((acc, item) => {
                acc[item.id || item.appid] = item;
                return acc;
            }, {})
        );
    }

    return (
        <ul class='games-list p-2 m-0'>
            {removeDuplicates(specificGames).map(game => <li class='game-item' key={game.appid || game.id} onClick={() => fetchGameInfo(game.appid || game.id)}>{game.name}</li>)}
        </ul>
    );
}
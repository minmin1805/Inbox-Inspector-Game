import axios from 'axios';

const PLAYER_API_URL = '/api/players';

const createPlayer = async (username) => {
    const response = await axios.post(PLAYER_API_URL, {username});
    
    if(response.status === 201){
        return response.data;
    }
    else {
        throw new Error('Failed to create player');
    }
}

const updatePlayer = async (playerId, data) => {
    const response = await axios.patch(`${PLAYER_API_URL}/${playerId}`, data);
    if(response.status === 200){
        return response.data;
    }
    else {
        throw new Error("cannot update the player");
    }
}


const getLeaderboard = async (limit = 4) => {
    const response = await axios.get(`${PLAYER_API_URL}/leaderboard`, {
        params: { limit },
    });
    if (response.status === 200) {
        return response.data;
    }
    else {
        throw new Error("cannot get the leaderboard data");
    }
}


export { createPlayer, updatePlayer, getLeaderboard };
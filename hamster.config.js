const hamsterConfig = {
    // duration of race with maximum time and minimum time in seconds
    duration: {
        max: 20,
        min: 10,
    },
    racers:{
        winner: '',
        loser: ''
    },
    // race track features i.e color
    raceTrack:{
     color:'#F8A441'
    }    
};


module.exports = ({hamsterConfig})
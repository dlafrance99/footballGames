const NFLTeamList = [
    {
        Team: '49ers',
        Location: 'San Francisco',
        Logo: '49ers.png',
        Conference: 'NFC',
        Division: 'WEST',
        WinRecord23: 12,
        ProjectedWinRecord24: 12,
        OddToWinSuperBowl: 600
    },
    {
        Team: 'Bears',
        Location: 'Chicago',
        Logo: 'Bears.png',
        Conference: 'NFC',
        Division: 'NORTH',
        WinRecord23: 7,
        ProjectedWinRecord24: 9,
        OddToWinSuperBowl: 3500
    },
    {
        Team: 'Bengals',
        Location: 'Cincinatti',
        Logo: 'Bengals.png',
        Conference: 'AFC',
        Division: 'NORTH',
        WinRecord23: 9,
        ProjectedWinRecord24: 11,
        OddToWinSuperBowl: 1300
    },
    {
        Team: 'Bills',
        Location: 'Buffalo',
        Logo: 'Bills.png',
        Conference: 'AFC',
        Division: 'EAST',
        WinRecord23: 11,
        ProjectedWinRecord24: 11,
        OddToWinSuperBowl: 1500
    },
    {
        Team: 'Broncos',
        Location: 'Denver',
        Logo: 'Broncos.png',
        Conference: 'AFC',
        Division: 'WEST',
        WinRecord23: 8,
        ProjectedWinRecord24: 6,
        OddToWinSuperBowl: 30000
    },
    {
        Team: 'Browns',
        Location: 'Cleveland',
        Logo: 'Browns.png',
        Conference: 'AFC',
        Division: 'NORTH',
        WinRecord23: 11,
        ProjectedWinRecord24: 9,
        OddToWinSuperBowl: 4000
    },
    {
        Team: 'Buccaneers',
        Location: 'Tampa Bay',
        Logo: 'Buccaneers.png',
        Conference: 'NFC',
        Division: 'SOUTH',
        WinRecord23: 9,
        ProjectedWinRecord24: 8,
        OddToWinSuperBowl: 8000
    },
    {
        Team: 'Cardinals',
        Location: 'Arizona',
        Logo: 'Cardinals.png',
        Conference: 'NFC',
        Division: 'WEST',
        WinRecord23: 4,
        ProjectedWinRecord24: 7,
        OddToWinSuperBowl: 10000
    },
    {
        Team: 'Chargers',
        Location: 'Los Angeles',
        Logo: 'Chargers.png',
        Conference: 'AFC',
        Division: 'WEST',
        WinRecord23: 5,
        ProjectedWinRecord24: 9,
        OddToWinSuperBowl: 4500
    },
    {
        Team: 'Chiefs',
        Location: 'Kansas City',
        Logo: 'Chiefs.png',
        Conference: 'AFC',
        Division: 'WEST',
        WinRecord23: 11,
        ProjectedWinRecord24: 12,
        OddToWinSuperBowl: 500
    },
    {
        Team: 'Colts',
        Location: 'Indianapolis',
        Logo: 'Colts.png',
        Conference: 'AFC',
        Division: 'SOUTH',
        WinRecord23: 9,
        ProjectedWinRecord24: 9,
        OddToWinSuperBowl: 6500
    },
    {
        Team: 'Commanders',
        Location: 'Washington',
        Logo: 'FootballTeam.png',
        Conference: 'NFC',
        Division: 'EAST',
        WinRecord23: 4,
        ProjectedWinRecord24: 7,
        OddToWinSuperBowl: 12000
    },
    {
        Team: 'Cowboys',
        Location: 'Dallas',
        Logo: 'Cowboys.png',
        Conference: 'NFC',
        Division: 'EAST',
        WinRecord23: 12,
        ProjectedWinRecord24: 11,
        OddToWinSuperBowl: 1900
    },
    {
        Team: 'Dolphins',
        Location: 'Miami',
        Logo: 'Dolphins.png',
        Conference: 'AFC',
        Division: 'EAST',
        WinRecord23: 11,
        ProjectedWinRecord24: 10,
        OddToWinSuperBowl: 2200
    },
    {
        Team: 'Eagles',
        Location: 'Philadelphia',
        Logo: 'Eagles.png',
        Conference: 'NFC',
        Division: 'EAST',
        WinRecord23: 11,
        ProjectedWinRecord24: 11,
        OddToWinSuperBowl: 1500
    },
    {
        Team: 'Falcons',
        Location: 'Atlanta',
        Logo: 'Falcons.png',
        Conference: 'NFC',
        Division: 'SOUTH',
        WinRecord23: 7,
        ProjectedWinRecord24: 10,
        OddToWinSuperBowl: 3000
    },
    {
        Team: 'Giants',
        Location: 'New York',
        Logo: 'Giants.png',
        Conference: 'NFC',
        Division: 'NFC',
        WinRecord23: 6,
        ProjectedWinRecord24: 7,
        OddToWinSuperBowl: 1500
    },
    {
        Team: 'Jaguars',
        Location: 'Jacksonville',
        Logo: 'Jaguars.png',
        Conference: 'AFC',
        Division: 'SOUTH',
        WinRecord23: 9,
        ProjectedWinRecord24: 9,
        OddToWinSuperBowl: 5000
    },
    {
        Team: 'Jets',
        Location: 'New York',
        Logo: 'Jets.png',
        Conference: 'AFC',
        Division: 'EAST',
        WinRecord23: 7,
        ProjectedWinRecord24: 10,
        OddToWinSuperBowl: 2000
    },
    {
        Team: 'Lions',
        Location: 'Detroit',
        Logo: 'Lions.png',
        Conference: 'NFC',
        Division: 'NORTH',
        WinRecord23: 12,
        ProjectedWinRecord24: 11,
        OddToWinSuperBowl: 1200
    },
    {
        Team: 'Packers',
        Location: 'Green Bay',
        Logo: 'Packers.png',
        Conference: 'NFC',
        Division: 'NORTH',
        WinRecord23: 9,
        ProjectedWinRecord24: 10,
        OddToWinSuperBowl: 1900
    },
    {
        Team: 'Panthers',
        Location: 'Carolina',
        Logo: 'Panthers.png',
        Conference: 'NFC',
        Division: 'SOUTH',
        WinRecord23: 2,
        ProjectedWinRecord24: 6,
        OddToWinSuperBowl: 25000
    },
    {
        Team: 'Patriots',
        Location: 'New England',
        Logo: 'Patriots.png',
        Conference: 'AFC',
        Division: 'EAST',
        WinRecord23: 4,
        ProjectedWinRecord24: 5,
        OddToWinSuperBowl: 18000
    },
    {
        Team: 'Raiders',
        Location: 'Las Vegas',
        Logo: 'Raiders.png',
        Conference: 'AFC',
        Division: 'WEST',
        WinRecord23: 8,
        ProjectedWinRecord24: 7,
        OddToWinSuperBowl: 10000
    },
    {
        Team: 'Rams',
        Location: 'Los Angeles',
        Logo: 'Rams.png',
        Conference: 'NFC',
        Division: 'WEST',
        WinRecord23: 10,
        ProjectedWinRecord24: 9,
        OddToWinSuperBowl: 3000
    },
    {
        Team: 'Ravens',
        Location: 'Baltimore',
        Logo: 'Ravens.png',
        Conference: 'AFC',
        Division: 'NORTH',
        WinRecord23: 13,
        ProjectedWinRecord24: 11,
        OddToWinSuperBowl: 1000
    },
    {
        Team: 'Saints',
        Location: 'New Orleans',
        Logo: 'Saints.png',
        Conference: 'NFC',
        Division: 'SOUTH',
        WinRecord23: 9,
        ProjectedWinRecord24: 8,
        OddToWinSuperBowl: 10000
    },
    {
        Team: 'Seahawks',
        Location: 'Seattle',
        Logo: 'Seahawks.png',
        Conference: 'NFC',
        Division: 'WEST',
        WinRecord23: 9,
        ProjectedWinRecord24: 8,
        OddToWinSuperBowl: 6500
    },
    {
        Team: 'Steelers',
        Location: 'Pittsburgh',
        Logo: 'Steelers.png',
        Conference: 'AFC',
        Division: 'NORTH',
        WinRecord23: 10,
        ProjectedWinRecord24: 9,
        OddToWinSuperBowl: 5000
    },
    {
        Team: 'Texans',
        Location: 'Houston',
        Logo: 'Texans.png',
        Conference: 'AFC',
        Division: 'SOUTH',
        WinRecord23: 10,
        ProjectedWinRecord24: 10,
        OddToWinSuperBowl: 1600
    },
    {
        Team: 'Titans',
        Location: 'Tenneessee',
        Logo: 'Titans.png',
        Conference: 'AFC',
        Division: 'SOUTH',
        WinRecord23: 6,
        ProjectedWinRecord24: 7,
        OddToWinSuperBowl: 1500
    },
    {
        Team: 'Vikings',
        Location: 'Minnesota',
        Logo: 'Vikings.png',
        Conference: 'NFC',
        Division: 'NORTH',
        WinRecord23: 7,
        ProjectedWinRecord24: 7,
        OddToWinSuperBowl: 8000
    },
]

export default NFLTeamList;


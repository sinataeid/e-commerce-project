export default class Game {
    constructor(title, description, price, platform, developer, img) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.platform = platform;
        this.developer = developer;
        this.img = img
    }
}

const actionGames = [
    new Game(
        'Metal Gear Solid 5: The Phantom Pain',
        'A pinnacle of stealth action, set in a dynamic open world where espionage and infiltration are key. The game offers interconnected systems that constantly evolve.',
        100000000.99,
        ['PC', 'PS4', 'Xbox One'],
        'Kojima Productions',
        'metal-gear-5.jpeg'
    ),
    new Game(
        'Elden Ring',
        'A grand adventure with deep RPG elements. Customize your character\'s fighting style and engage in epic battles, including challenging boss fights.',
        22.5,
        ['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X'],
        'FromSoftware',
        'elden-ring.webp'
    ),
    new Game(
        'Resident Evil 2',
        'A survival horror action game that immerses players in a zombie-infested world. Solve puzzles, fight enemies, and uncover the mysteries of Raccoon City.',
        40,
        null, // You can add specific platforms here if needed
        'Capcom',
        'resident-evil-2.jpg'
    )
];

// Additional games:
const shooterGames = [
    new Game(
        'Doom Eternal',
        'A fast-paced first-person shooter where players battle demons from Hell. Intense combat, epic weapons, and a metal soundtrack await.',
        49.99,
        ['PC', 'PS4', 'Xbox One'],
        'id Software',
        'doom.jpeg'
    ),
    new Game(
        'Destiny 2',
        'A shared-world shooter with cooperative and competitive gameplay. Explore planets, fight aliens, and collect powerful gear.',
        0, // Free-to-play (with optional expansions)
        ['PC', 'PS4', 'Xbox One'],
        'Bungie',
        'destiny-2.jpeg'
    )
];

const adventureGames = [
    new Game(
        'The Legend of Zelda: Breath of the Wild',
        'An open-world adventure set in Hyrule. Explore, solve puzzles, and uncover the secrets of the kingdom.',
        59.99,
        ['Nintendo Switch'],
        'Nintendo',
        'zelda.jpeg'
    ),
    new Game(
        'Uncharted 4: A Thief\'s End',
        'Follow Nathan Drake\'s final adventure as he seeks hidden treasures across exotic locations. Cinematic storytelling and thrilling action.',
        19.99,
        ['PS4'],
        'Naughty Dog',
        'uncharted-4.jpg'
    )
];

const rpgGames = [
    new Game(
        'The Witcher 3: Wild Hunt',
        'An expansive RPG with a rich narrative, monster hunting, and a vast open world. Play as Geralt of Rivia, a monster slayer.',
        29.99,
        ['PC', 'PS4', 'Xbox One'],
        'CD Projekt',
        'the-witcher.jpeg'
    ),
    new Game(
        'Dark Souls III',
        'A challenging action RPG with intricate level design, tough enemies, and deep lore. Prepare to die, but also to triumph.',
        19.99,
        ['PC', 'PS4', 'Xbox One'],
        'FromSoftware',
        'dark-souls.webp'
    )
];


export {actionGames, adventureGames, shooterGames, rpgGames}
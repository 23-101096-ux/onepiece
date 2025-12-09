
// Select character function (can be called inline)
function selectCharacter(characterId) {
    const character = characters.find(function(c) {
        return c.id === characterId;
    });
    
    if (character) {
        console.log('Selecting character:', character.name);
        try {
            localStorage.setItem('selectedCharacter', JSON.stringify(character));
            console.log('Saved to localStorage successfully');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
        window.location.href = 'charecter.html';
    } else {
        alert('Character not found: ' + characterId);
    }
}

// Random facts
const facts = [
    'One Piece has over 1100 episodes!',
    'Luffy\'s bounty is 3 billion berries!',
    'The Straw Hat was given to Luffy by Shanks',
    'Zoro can use three swords at once!',
    'One Piece started in 1997 as a manga',
    'Oda plans the story years in advance'
];

// Show random fact
function showRandomFact() {
    const factElement = document.getElementById('factText');
    if (factElement) {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        factElement.textContent = randomFact;
    }
}

function closeFact() {
    const factBox = document.getElementById('randomFact');
    if (factBox) {
        factBox.style.display = 'none';
    }
}

// Go back to home function
function goHome() {
    // Clear localStorage when going home
    try {
        localStorage.removeItem('selectedCharacter');
    } catch (e) {
        console.log('localStorage not available');
    }
    window.location.href = 'index.html';
}

// Load character data on character page
function loadCharacter() {
    try {
        const characterDataStored = localStorage.getItem('selectedCharacter');
        
        if (!characterDataStored) {
            window.location.href = 'index.html';
            return;
        }

        const character = JSON.parse(characterDataStored);

        // Set hero background class for gradient
        const heroElement = document.getElementById('characterHero');
        if (heroElement) {
            heroElement.classList.add(character.id);
        }

        // Set character image
        const imgElement = document.getElementById('characterImg');
        if (imgElement) {
            imgElement.src = character.image;
            imgElement.alt = character.name;
        }

        // Set character info
        const nameElement = document.getElementById('characterName');
        if (nameElement) nameElement.textContent = character.name;

        const roleElement = document.getElementById('characterRole');
        if (roleElement) roleElement.textContent = character.role;

        const descElement = document.getElementById('characterDescription');
        if (descElement) descElement.textContent = character.description;
        
        const actorElement = document.getElementById('characterActor');
        if (actorElement) actorElement.textContent = character.actor;

        const aboutNameElement = document.getElementById('aboutName');
        if (aboutNameElement) aboutNameElement.textContent = character.name;

        const aboutTextElement = document.getElementById('aboutText');
        if (aboutTextElement) aboutTextElement.textContent = character.bio;

        const fightingStyleElement = document.getElementById('fightingStyle');
        if (fightingStyleElement) fightingStyleElement.textContent = character.fightingStyle;

        const dreamElement = document.getElementById('dream');
        if (dreamElement) dreamElement.textContent = character.dream;

        document.title = `${character.name} - ONE PIECE`;

    } catch (error) {
        console.error('Error loading character:', error);
        window.location.href = 'index.html';
    }
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Character click handler for home page
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const characterId = this.getAttribute('data-character');
            
            const character = characters.find(function(c) {
                return c.id === characterId;
            });
            
            if (character) {
                console.log('Character clicked:', character.name);
                try {
                    localStorage.setItem('selectedCharacter', JSON.stringify(character));
                    console.log('Character data saved to localStorage');
                } catch (error) {
                    console.error('localStorage error:', error);
                }
                
                // Navigate to character page
                setTimeout(function() {
                    window.location.href = 'character.html';
                }, 100);
            } else {
                console.error('Character not found:', characterId);
            }
        });
    });

    // Initialize random fact if on home page
    if (document.getElementById('randomFact')) {
        showRandomFact();
    }

    // Load character if on character page
    if (document.getElementById('characterHero')) {
        loadCharacter();
    }
});
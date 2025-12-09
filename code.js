// ---------------- CHARACTER SELECTION ----------------
function selectCharacter(characterId) {
    const character = characters.find(c => c.id === characterId);

    if (character) {
        try {
            localStorage.setItem('selectedCharacter', JSON.stringify(character));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
        window.location.href = 'charecter.html';
    } else {
        alert('Character not found: ' + characterId);
    }
}

// ---------------- RANDOM FACTS ----------------
const facts = [
    'One Piece has over 1100 episodes!',
    'Luffy\'s bounty is 3 billion berries!',
    'The Straw Hat was given to Luffy by Shanks',
    'Zoro can use three swords at once!',
    'One Piece started in 1997 as a manga',
    'Oda plans the story years in advance'
];

function showRandomFact() {
    const factElement = document.getElementById('factText');
    if (factElement) {
        factElement.textContent = facts[Math.floor(Math.random() * facts.length)];
    }
}

function closeFact() {
    const factBox = document.getElementById('randomFact');
    if (factBox) factBox.style.display = 'none';
}

// ---------------- GO HOME ----------------
function goHome() {
    localStorage.removeItem('selectedCharacter');
    window.location.href = 'index.html';
}

// ---------------- LOAD CHARACTER PAGE ----------------
function loadCharacter() {
    try {
        const stored = localStorage.getItem('selectedCharacter');
        if (!stored) {
            window.location.href = 'index.html';
            return;
        }

        const character = JSON.parse(stored);

        document.getElementById('characterHero')?.classList.add(character.id);
        document.getElementById('characterImg').src = character.image;
        document.getElementById('characterImg').alt = character.name;
        document.getElementById('characterName').textContent = character.name;
        document.getElementById('characterRole').textContent = character.role;
        document.getElementById('characterDescription').textContent = character.description;
        document.getElementById('characterActor').textContent = character.actor;
        document.getElementById('aboutName').textContent = character.name;
        document.getElementById('aboutText').textContent = character.bio;
        document.getElementById('fightingStyle').textContent = character.fightingStyle;
        document.getElementById('dream').textContent = character.dream;

        document.title = `${character.name} - ONE PIECE`;

    } catch (error) {
        console.error('Error loading character:', error);
        window.location.href = 'index.html';
    }
}

// ---------------- PAGE INITIALIZATION ----------------
window.addEventListener('load', function() {

    // Smooth scroll
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Character click events (home page)
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();

            const characterId = this.getAttribute('data-character');
            const character = characters.find(c => c.id === characterId);

            if (character) {
                localStorage.setItem('selectedCharacter', JSON.stringify(character));
                setTimeout(() => window.location.href = 'character.html', 100);
            }
        });
    });

    // Show random fact only on home page
    if (document.getElementById('randomFact')) {
        showRandomFact();
    }

    // Load character page
    if (document.getElementById('characterHero')) {
        loadCharacter();
    }

    // PRELOADER ONLY HIDES (NO REDIRECT)
    setTimeout(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) preloader.style.display = "none";
    }, 3000);
});

// ---------------- CART ----------------
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    const cart = getCart();
    cart.push(id);
    saveCart(cart);
}

function removeFromCart(id) {
    let cart = getCart().filter(item => item !== id);
    saveCart(cart);
    if (cart.length === 0) alert("Cart is empty");
}

document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", e => {
        addToCart(e.target.parentElement.dataset.id);
    });
});

// ---------------- LOGIN ----------------
function login(email, password) {
    const error = document.getElementById("loginError");

    if (email === "student@eui.edu.eg" && password === "123456") {
        localStorage.setItem("user", JSON.stringify({
            name: "Student",
            email
        }));
        window.location.href = "index.html"; // << YOU ASKED FOR THIS
    } else {
        error.textContent = "Invalid email or password";
    }
}

const form = document.getElementById("loginForm");
if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        login(
            document.getElementById("email").value,
            document.getElementById("password").value
        );
    });
}

// ---------------- PROFILE ----------------
if (window.location.pathname.includes("profile.html")) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileEmail").textContent = user.email;
    }
}

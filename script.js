// Theme Manager
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeDropdown = document.getElementById('theme-dropdown');
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.isOpen = false;
        this.init();
    }

    init() {
        // Toggle dropdown
        this.themeToggle.addEventListener('click', () => {
            this.toggleDropdown();
        });

        // Theme buttons
        this.themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.dataset.theme;
                this.changeTheme(theme);
                this.updateActiveButton(button);
                this.closeDropdown();
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.themeToggle.contains(e.target) && !this.themeDropdown.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('selectedTheme') || 'default';
        this.changeTheme(savedTheme);
        this.updateActiveButton(document.querySelector(`[data-theme="${savedTheme}"]`));
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.themeDropdown.classList.add('open');
        } else {
            this.themeDropdown.classList.remove('open');
        }
    }

    closeDropdown() {
        this.isOpen = false;
        this.themeDropdown.classList.remove('open');
    }

    changeTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('romantic-theme', 'bw-theme', 'golden-theme', 'ocean-theme');
        
        // Add new theme class if not default
        if (theme !== 'default') {
            document.body.classList.add(`${theme}-theme`);
        }

        // Save to localStorage
        localStorage.setItem('selectedTheme', theme);

        // Update petal colors based on theme
        this.updatePetalColors(theme);
    }

    updateActiveButton(activeButton) {
        this.themeButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    updatePetalColors(theme) {
        const petals = document.querySelectorAll('.petal');
        const colorSchemes = {
            default: [
                'linear-gradient(45deg, #667eea, #764ba2)',
                'linear-gradient(45deg, #6c63ff, #4a47a3)',
                'linear-gradient(45deg, #764ba2, #667eea)',
                'linear-gradient(45deg, #5f3dc4, #7048e8)',
                'linear-gradient(45deg, #4c6ef5, #748ffc)',
                'linear-gradient(45deg, #5c7cfa, #91a7ff)'
            ],
            romantic: [
                'linear-gradient(45deg, #ff69b4, #ff1493)',
                'linear-gradient(45deg, #ff1493, #c71585)',
                'linear-gradient(45deg, #ffb6c1, #ff69b4)',
                'linear-gradient(45deg, #ffc0cb, #ffb6c1)',
                'linear-gradient(45deg, #ff69b4, #ff1493)',
                'linear-gradient(45deg, #da70d6, #ba55d3)'
            ],
            bw: [
                'linear-gradient(45deg, #212121, #424242)',
                'linear-gradient(45deg, #424242, #616161)',
                'linear-gradient(45deg, #616161, #9e9e9e)',
                'linear-gradient(45deg, #9e9e9e, #bdbdbd)',
                'linear-gradient(45deg, #e0e0e0, #f5f5f5)',
                'linear-gradient(45deg, #757575, #424242)'
            ],
            golden: [
                'linear-gradient(45deg, #ffd700, #ffb347)',
                'linear-gradient(45deg, #ffb347, #ffa500)',
                'linear-gradient(45deg, #ffa500, #ff8c00)',
                'linear-gradient(45deg, #ff8c00, #b8860b)',
                'linear-gradient(45deg, #b8860b, #daa520)',
                'linear-gradient(45deg, #daa520, #ffd700)'
            ],
            ocean: [
                'linear-gradient(45deg, #006994, #00acc1)',
                'linear-gradient(45deg, #00acc1, #00bcd4)',
                'linear-gradient(45deg, #00bcd4, #80deea)',
                'linear-gradient(45deg, #80deea, #b2ebf2)',
                'linear-gradient(45deg, #b2ebf2, #e0f7fa)',
                'linear-gradient(45deg, #003f5c, #006994)'
            ]
        };

        const colors = colorSchemes[theme] || colorSchemes.default;
        
        petals.forEach((petal, index) => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            petal.style.background = randomColor;
        });
    }
}

// Countdown Timer
class CountdownTimer {
    constructor() {
        // Set your engagement date here (YYYY, MM-1, DD, HH, MM, SS)
        this.engagementDate = new Date(2026, 2, 12, 12, 0, 0); // March 12, 2026 at 12:00 PM
        this.previousValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };
        this.init();
    }

    init() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
        this.addInteractivity();
        this.startFloatingHearts();
        this.startSparkles();
    }

    addInteractivity() {
        const countdownItems = document.querySelectorAll('.countdown-item');
        
        countdownItems.forEach(item => {
            item.addEventListener('click', () => {
                this.createConfetti();
                item.classList.add('pulse');
                setTimeout(() => item.classList.remove('pulse'), 500);
            });

            item.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });
        });

        // Add keyboard interaction
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                e.preventDefault();
                this.createConfetti();
                this.celebrate();
            }
        });
    }

    updateCountdown() {
        const now = new Date();
        const timeLeft = this.engagementDate - now;

        if (timeLeft <= 0) {
            this.displayMessage("The special day has arrived! 💕");
            this.celebrate();
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        this.updateDisplay('days', days);
        this.updateDisplay('hours', hours);
        this.updateDisplay('minutes', minutes);
        this.updateDisplay('seconds', seconds);
    }

    updateDisplay(id, value) {
        const element = document.getElementById(id);
        const formattedValue = String(value).padStart(2, '0');
        
        if (element.textContent !== formattedValue) {
            element.textContent = formattedValue;
            
            // Add pulse animation when value changes
            if (id === 'seconds') {
                const item = element.closest('.countdown-item');
                item.classList.add('pulse');
                setTimeout(() => item.classList.remove('pulse'), 500);
            }
        }
    }

    displayMessage(message) {
        document.querySelector('.countdown-message').textContent = message;
        document.getElementById('countdown-timer').style.display = 'none';
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
    }

    startFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.bottom = '0px';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            document.querySelector('.countdown-section').appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, 3000);
    }

    startSparkles() {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }, 500);
    }

    celebrate() {
        // Create celebration effect
        this.createConfetti();
        
        // Add celebration message
        const message = document.querySelector('.countdown-message');
        message.innerHTML = '🎉 Congratulations Divya & Sumit! 🎉<br>Love is in the air! 💕';
        message.style.fontSize = '1.5rem';
        message.style.animation = 'messageFloat 1s ease-in-out infinite';
    }

    playHoverSound() {
        // Create a simple sound effect using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Falling Petals Animation
class PetalAnimation {
    constructor() {
        this.container = document.getElementById('petals-container');
        this.petalCount = 15;
        this.init();
    }

    init() {
        for (let i = 0; i < this.petalCount; i++) {
            this.createPetal();
        }
    }

    createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // Random positioning and animation
        const startX = Math.random() * window.innerWidth;
        const animationDuration = 10 + Math.random() * 20;
        const delay = Math.random() * 20;
        const size = 15 + Math.random() * 25;
        
        // Random colors
        const colors = [
            'linear-gradient(45deg, #667eea, #764ba2)',
            'linear-gradient(45deg, #6c63ff, #4a47a3)',
            'linear-gradient(45deg, #764ba2, #667eea)',
            'linear-gradient(45deg, #5f3dc4, #7048e8)',
            'linear-gradient(45deg, #4c6ef5, #748ffc)',
            'linear-gradient(45deg, #5c7cfa, #91a7ff)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        petal.style.left = startX + 'px';
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.background = randomColor;
        petal.style.animationDuration = animationDuration + 's';
        petal.style.animationDelay = delay + 's';
        
        this.container.appendChild(petal);
        
        // Remove petal after animation and create new one
        setTimeout(() => {
            petal.remove();
            this.createPetal();
        }, (animationDuration + delay) * 1000);
    }
}

// Music Player with Local Files
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('bg-music');
        this.toggleBtn = document.getElementById('music-toggle');
        this.isPlaying = false;
        this.currentSongIndex = 0;
        this.songs = this.createPlaylist();
        this.init();
    }

    createPlaylist() {
        return [
            // Trending Bollywood Romantic Songs
            { title: "Tum Hi Ho", artist: "Arijit Singh", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { title: "Mann Bharya", artist: "B Praak", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Qaafirana", artist: "Arijit Singh", url: "https://www.soundjay.com/misc/sounds/bell-ringing-01.wav" },
            { title: "Raabta", artist: "Arijit Singh", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Jag Ghoomeya", artist: "Pritam", url: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav" },
            { title: "Hawayein", artist: "Pritam", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Tum Se Hi", artist: "Pritam", url: "https://www.soundjay.com/misc/sounds/bell-ringing-04.wav" },
            { title: "Channa Mereya", artist: "Pritam", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Bol Do Na Zara", artist: "Armaan Malik", url: "https://www.soundjay.com/misc/sounds/bell-ringing-02.wav" },
            { title: "Sanam Re", artist: "Arijit Singh", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            
            // More Trending Bollywood Romance
            { title: "Dil Diyan Gallan", artist: "Atif Aslam", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { title: "Humsafar", artist: "Akhil Sachdeva", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Roke Na Roke", artist: "Arijit Singh", url: "https://www.soundjay.com/misc/sounds/bell-ringing-01.wav" },
            { title: "Phir Bhi Tumko Chaahunga", artist: "Arijit Singh", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Mast Magan", artist: "Ayushmann Khurrana", url: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav" },
            { title: "Paani Da Rang", artist: "Ayushmann Khurrana", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Saadi Galli Aaja", artist: "Ayushmann Khurrana", url: "https://www.soundjay.com/misc/sounds/bell-ringing-04.wav" },
            { title: "Nazar Laaye", artist: "Arijit Singh", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Mera Yaar", artist: "B Praak", url: "https://www.soundjay.com/misc/sounds/bell-ringing-02.wav" },
            { title: "Qismat", artist: "B Praak", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            
            // Latest Bollywood Hits
            { title: "Shayad", artist: "Arijit Singh", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { title: "Ghungroo", artist: "Arijit Singh", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Makhna", artist: "Tanishk Bagchi", url: "https://www.soundjay.com/misc/sounds/bell-ringing-01.wav" },
            { title: "Enna Sona", artist: "A.R. Rahman", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "The Humma Song", artist: "Badshah", url: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav" },
            { title: "Udaari", artist: "Ali Zafar", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", url: "https://www.soundjay.com/misc/sounds/bell-ringing-04.wav" },
            { title: "Bulleya", artist: "Amit Mishra", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Fursat", artist: "Amit Trivedi", url: "https://www.soundjay.com/misc/sounds/bell-ringing-02.wav" },
            { title: "Khairiyat", artist: "Arijit Singh", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            
            // Romantic Classics
            { title: "Tujhe Dekha To", artist: "Udit Narayan", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { title: "Mere Haath Main", artist: "Udit Narayan", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Suraj Hua Maddham", artist: "Udit Narayan", url: "https://www.soundjay.com/misc/sounds/bell-ringing-01.wav" },
            { title: "Chand Chupa Badal", artist: "Udit Narayan", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Ek Ladki Ko Dekha", artist: "Anand-Milind", url: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav" },
            { title: "Pehla Nasha", artist: "Udit Narayan", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Tum Paas Aaye", artist: "Udit Narayan", url: "https://www.soundjay.com/misc/sounds/bell-ringing-04.wav" },
            { title: "Yeh Jo Des Hai Tera", artist: "A.R. Rahman", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Luka Chuppi", artist: "Lata Mangeshkar", url: "https://www.soundjay.com/misc/sounds/bell-ringing-02.wav" },
            { title: "Kuch Kuch Hota Hai", artist: "Udit Narayan", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            
            // More Trending Songs
            { title: "Ranjha", artist: "B Praak", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { title: "Baarish", artist: "Ash King", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Mere Rashke Qamar", artist: "Nusrat Fateh Ali Khan", url: "https://www.soundjay.com/misc/sounds/bell-ringing-01.wav" },
            { title: "Zalima", artist: "Atif Aslam", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Harmokh Bartal", artist: "Rahat Fateh Ali Khan", url: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav" },
            { title: "Dil Meri Na Sune", artist: "Atif Aslam", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Tere Liye", artist: "Atif Aslam", url: "https://www.soundjay.com/misc/sounds/bell-ringing-04.wav" },
            { title: "Woh Lamhe", artist: "Atif Aslam", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Dil Kya Kare", artist: "Udit Narayan", url: "https://www.soundjay.com/misc/sounds/bell-ringing-02.wav" },
            { title: "O Saathi", artist: "KK", url: "https://file-examples.com/storage/fe86ead660c666e5bb5c8e6c.mp3" },
            { title: "Tadap Tadap", artist: "Udit Narayan", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" }
        ];
    }

    init() {
        this.createMusicPlayer();
        this.setupEventListeners();
        this.createMusicFolder();
        this.loadSong(0);
    }

    createMusicFolder() {
        // Show Bollywood music info
        console.log('🎵 Bollywood Romantic Music Player Initialized');
        console.log('🌟 Trending Bollywood Songs for Engagement');
        console.log('📋 Available songs:');
        this.songs.forEach((song, index) => {
            console.log(`${index + 1}. ${song.title} - ${song.artist}`);
        });
    }

    createMusicPlayer() {
        // Create music player UI
        const musicPlayerHTML = `
            <div class="music-player" id="music-player">
                <div class="player-header">
                    <h3>🎵 Romantic Playlist</h3>
                    <button class="close-player" id="close-player">×</button>
                </div>
                <div class="now-playing">
                    <div class="song-info">
                        <div class="song-title" id="song-title">Add music files to assets/music/</div>
                        <div class="song-artist" id="song-artist">Instructions below</div>
                    </div>
                    <div class="album-art">💕</div>
                </div>
                <div class="player-controls">
                    <button class="control-btn" id="prev-btn">⏮</button>
                    <button class="control-btn play-pause" id="play-pause-btn">▶️</button>
                    <button class="control-btn" id="next-btn">⏭</button>
                </div>
                <div class="progress-bar">
                    <div class="progress" id="progress"></div>
                </div>
                <div class="time-display">
                    <span id="current-time">0:00</span>
                    <span id="total-time">0:00</span>
                </div>
                <div class="playlist-container">
                    <div class="playlist-header">
                        <h4>Playlist (${this.songs.length} songs)</h4>
                        <input type="text" class="search-box" id="song-search" placeholder="Search songs...">
                    </div>
                    <div class="playlist" id="playlist"></div>
                </div>
                <div class="music-instructions">
                    <h4>🎵 Bollywood Romantic Songs</h4>
                    <p>🌟 Trending Bollywood hits perfect for engagement</p>
                    <p>💕 All-time romantic classics</p>
                    <p>🎬 Latest movie songs</p>
                    <p>� Perfect for Divya and Sumit's celebration</p>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', musicPlayerHTML);
        this.createPlaylistUI();
    }

    createPlaylistUI() {
        const playlistEl = document.getElementById('playlist');
        playlistEl.innerHTML = '';
        
        this.songs.forEach((song, index) => {
            const songEl = document.createElement('div');
            songEl.className = 'playlist-item';
            songEl.dataset.index = index;
            songEl.innerHTML = `
                <div class="song-number">${index + 1}</div>
                <div class="song-details">
                    <div class="song-name">${song.title}</div>
                    <div class="song-artist-name">${song.artist}</div>
                </div>
                <div class="song-duration">3:45</div>
            `;
            
            songEl.addEventListener('click', () => this.playSong(index));
            playlistEl.appendChild(songEl);
        });
    }

    setupEventListeners() {
        // Music toggle button
        this.toggleBtn.addEventListener('click', () => this.toggleMusicPlayer());
        
        // Player controls
        document.getElementById('close-player').addEventListener('click', () => this.closeMusicPlayer());
        document.getElementById('play-pause-btn').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('prev-btn').addEventListener('click', () => this.playPreviousSong());
        document.getElementById('next-btn').addEventListener('click', () => this.playNextSong());
        
        // Search functionality
        document.getElementById('song-search').addEventListener('input', (e) => {
            this.searchSongs(e.target.value);
        });
        
        // Audio events
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.playNextSong()); // Auto-play next song
        this.audio.addEventListener('error', (e) => this.handleAudioError(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                this.togglePlayPause();
            }
            if (e.code === 'ArrowRight') this.playNextSong();
            if (e.code === 'ArrowLeft') this.playPreviousSong();
        });
    }

    handleAudioError(e) {
        console.log('Audio error - file not found:', this.audio.src);
        // Try next song
        setTimeout(() => this.playNextSong(), 1000);
    }

    toggleMusicPlayer() {
        const player = document.getElementById('music-player');
        player.classList.toggle('show');
    }

    closeMusicPlayer() {
        document.getElementById('music-player').classList.remove('show');
    }

    loadSong(index) {
        const song = this.songs[index];
        this.audio.src = song.url;
        this.currentSongIndex = index;
        this.updateNowPlaying();
        this.updateActiveSong();
        
        // Try to play the song
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayPauseButton();
        }).catch(error => {
            console.log('Song not found, trying next...');
            // Try next song if current doesn't exist
            if (index < this.songs.length - 1) {
                setTimeout(() => this.loadSong(index + 1), 1000);
            }
        });
    }

    playSong(index) {
        this.loadSong(index);
        this.play();
    }

    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayPauseButton();
        }).catch(error => {
            console.error('Failed to play:', error);
            this.showMessage('Add music files to assets/music/ folder');
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    playNextSong() {
        const nextIndex = (this.currentSongIndex + 1) % this.songs.length;
        this.playSong(nextIndex);
    }

    playPreviousSong() {
        const prevIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
        this.playSong(prevIndex);
    }

    updateNowPlaying() {
        const song = this.songs[this.currentSongIndex];
        document.getElementById('song-title').textContent = song.title;
        document.getElementById('song-artist').textContent = song.artist;
    }

    updateActiveSong() {
        document.querySelectorAll('.playlist-item').forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSongIndex);
        });
    }

    updatePlayPauseButton() {
        const btn = document.getElementById('play-pause-btn');
        btn.textContent = this.isPlaying ? '⏸' : '▶️';
    }

    updateProgress() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        document.getElementById('progress').style.width = progress + '%';
        document.getElementById('current-time').textContent = this.formatTime(this.audio.currentTime);
    }

    updateDuration() {
        document.getElementById('total-time').textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    searchSongs(query) {
        const items = document.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            const song = this.songs[index];
            const matches = song.title.toLowerCase().includes(query.toLowerCase()) ||
                          song.artist.toLowerCase().includes(query.toLowerCase());
            item.style.display = matches ? 'flex' : 'none';
        });
    }

    showMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'music-message';
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            font-size: 1rem;
        `;
        document.body.appendChild(messageEl);
        setTimeout(() => messageEl.remove(), 3000);
    }
}

// File Upload Handler
class FileUploadHandler {
    constructor() {
        this.uploadArea = document.getElementById('upload-area');
        this.fileInput = document.getElementById('file-input');
        this.galleryGrid = document.getElementById('gallery-grid');
        this.init();
    }

    init() {
        // Drag and drop events
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });

        // Click to upload
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });

        // File input change
        this.fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                this.addCardToGallery(file);
            }
        });
    }

    addCardToGallery(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const cardItem = document.createElement('div');
            cardItem.className = 'card-item';
            cardItem.dataset.category = 'other';
            
            const fileName = file.name.split('.')[0];
            
            cardItem.innerHTML = `
                <div class="card-image">
                    <img src="${e.target.result}" alt="${fileName}">
                    <div class="card-overlay">
                        <button class="download-btn" onclick="downloadCard('${fileName}', '${e.target.result}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <button class="view-btn" onclick="viewCard('${fileName}', '${e.target.result}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
                <div class="card-info">
                    <h3>${fileName}</h3>
                    <p>Custom uploaded design</p>
                </div>
            `;
            
            this.galleryGrid.appendChild(cardItem);
            
            // Add animation
            setTimeout(() => {
                cardItem.style.animation = 'fadeInUp 0.6s ease-out';
            }, 100);
        };
        
        reader.readAsDataURL(file);
    }
}

// Gallery Filter
class GalleryFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.cardItems = document.querySelectorAll('.card-item');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.filterGallery(filter);
                this.updateActiveButton(button);
            });
        });
    }

    filterGallery(filter) {
        this.cardItems.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// Modal Handler
class ModalHandler {
    constructor() {
        this.modal = document.getElementById('view-modal');
        this.modalImage = document.getElementById('modal-image');
        this.closeBtn = document.querySelector('.close');
        this.currentImageSrc = '';
        this.currentImageName = '';
        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    openModal(imageSrc, imageName) {
        this.currentImageSrc = imageSrc;
        this.currentImageName = imageName;
        this.modalImage.src = imageSrc;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Download Functions
// Toggle Music Player Function
function toggleMusicPlayer() {
    const player = document.getElementById('music-player');
    if (player) {
        player.classList.toggle('show');
    }
}

// Download Card Function
function downloadCard(cardName, imageSrc) {
    // If no imageSrc provided, use default
    const src = imageSrc || `https://picsum.photos/seed/${cardName}/800/1200`;
    const link = document.createElement('a');
    link.href = src;
    link.download = `${cardName}_invitation.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// View Card Function
function viewCard(cardName, imageSrc) {
    // If no imageSrc provided, use default
    const src = imageSrc || `https://picsum.photos/seed/${cardName}/800/1200`;
    window.modalHandler.openModal(src, cardName);
}

function downloadImage(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `${filename}-invitation.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('Download failed:', error);
            // Fallback: open image in new tab
            window.open(url, '_blank');
        });
}

function viewCard(cardName, imageSrc = null) {
    const modalHandler = window.modalHandler;
    const src = imageSrc || `https://picsum.photos/seed/${cardName}/800/1200`;
    modalHandler.openModal(src, cardName);
}

function downloadModalCard() {
    if (window.modalHandler.currentImageSrc) {
        downloadImage(window.modalHandler.currentImageSrc, window.modalHandler.currentImageName);
    }
}

// Mobile Touch Interactions
class MobileInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.addTouchInteractions();
        this.addSwipeGestures();
        this.addVibrationFeedback();
        this.addMobileOptimizations();
    }

    addTouchInteractions() {
        // Enhanced touch feedback for countdown items
        const countdownItems = document.querySelectorAll('.countdown-item');
        
        countdownItems.forEach(item => {
            // Touch start
            item.addEventListener('touchstart', (e) => {
                e.preventDefault();
                item.style.transform = 'translateY(-5px) scale(1.05)';
                this.vibrate(50);
            });

            // Touch end
            item.addEventListener('touchend', (e) => {
                e.preventDefault();
                item.style.transform = '';
                this.createMobileConfetti();
            });

            // Touch cancel
            item.addEventListener('touchcancel', () => {
                item.style.transform = '';
            });
        });

        // Card interactions
        const cards = document.querySelectorAll('.card-item');
        cards.forEach(card => {
            card.addEventListener('touchstart', (e) => {
                card.style.transform = 'translateY(-3px) scale(1.02)';
            });

            card.addEventListener('touchend', (e) => {
                card.style.transform = '';
            });
        });
    }

    addSwipeGestures() {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        const countdownSection = document.querySelector('.countdown-section');
        
        countdownSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        countdownSection.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        });

        countdownSection.addEventListener('touchend', (e) => {
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            
            // Swipe up for confetti
            if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -50) {
                this.createMobileConfetti();
                this.vibrate(100);
            }
            
            // Swipe down to refresh
            if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 50) {
                location.reload();
            }
        });
    }

    addVibrationFeedback() {
        // Check if vibration API is available
        if ('vibrate' in navigator) {
            this.vibrate = (duration) => {
                try {
                    navigator.vibrate(duration);
                } catch (e) {
                    console.log('Vibration not supported');
                }
            };
        } else {
            this.vibrate = () => {};
        }
    }

    addMobileOptimizations() {
        // Detect mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Add mobile-specific classes
            document.body.classList.add('mobile-device');
            
            // Optimize animations for mobile
            this.optimizeForMobile();
            
            // Add mobile-specific event listeners
            this.addMobileEventListeners();
        }
    }

    optimizeForMobile() {
        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            .mobile-device .petal {
                animation-duration: 20s;
            }
            
            .mobile-device .sparkle {
                display: none;
            }
            
            .mobile-device .heart {
                animation-duration: 4s;
            }
            
            @media (max-width: 480px) {
                .mobile-device .countdown-section::before {
                    animation-duration: 5s;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addMobileEventListeners() {
        // Double tap to celebrate
        let lastTap = 0;
        
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 500 && tapLength > 0) {
                this.createMobileConfetti();
                this.vibrate(200);
            }
            
            lastTap = currentTime;
        });

        // Long press for theme menu
        let pressTimer;
        
        document.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => {
                this.openThemeMenu();
                this.vibrate(150);
            }, 800);
        });

        document.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });

        document.addEventListener('touchmove', () => {
            clearTimeout(pressTimer);
        });
    }

    createMobileConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c'];
        const confettiCount = window.innerWidth < 480 ? 20 : 30;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 20);
        }
    }

    openThemeMenu() {
        const themeDropdown = document.getElementById('theme-dropdown');
        themeDropdown.classList.toggle('open');
    }
}

// Initialize mobile interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new CountdownTimer();
    new PetalAnimation();
    new MusicPlayer();
    new GalleryFilter();
    new MobileInteractions();
    window.modalHandler = new ModalHandler();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, observerOptions);

    // Observe gallery items
    document.querySelectorAll('.card-item').forEach(item => {
        observer.observe(item);
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease-out';
        });
    });
});

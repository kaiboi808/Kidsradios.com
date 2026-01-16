// Kids Radio - Weather & Scanner Station Player

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

const audioPlayer = document.getElementById('audioPlayer');
const nowPlayingSection = document.getElementById('nowPlaying');
const currentStationDisplay = document.getElementById('currentStation');
const statusLabel = document.getElementById('statusLabel');
const freqDisplay = document.getElementById('freqDisplay');
const stopBtn = document.getElementById('stopBtn');
const visualizer = document.getElementById('visualizer');

let currentlyPlayingCard = null;
let isPlaying = false;

// Play a radio station
function playStation(streamUrl, stationName, frequency) {
    // Remove playing class from previous card
    if (currentlyPlayingCard) {
        currentlyPlayingCard.classList.remove('playing');
    }

    // Find the clicked card by matching the station name in onclick
    const cards = document.querySelectorAll('.radio-card');
    cards.forEach(card => {
        const btn = card.querySelector('.tune-btn');
        if (btn && btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(stationName)) {
            card.classList.add('playing');
            currentlyPlayingCard = card;
        }
    });

    // Update displays
    currentStationDisplay.textContent = stationName;
    statusLabel.textContent = 'CONNECTING...';
    statusLabel.classList.remove('live');
    freqDisplay.textContent = frequency + ' MHz';

    // Update signal bars
    updateSignalStrength(3);

    // Start visualizer
    visualizer.classList.remove('active');

    // Play the stream
    audioPlayer.src = streamUrl;
    audioPlayer.play().then(() => {
        isPlaying = true;
        statusLabel.textContent = 'LIVE';
        statusLabel.classList.add('live');
        visualizer.classList.add('active');
        updateSignalStrength(5);
    }).catch(error => {
        console.log('Playback failed:', error);
        statusLabel.textContent = 'ERROR';
        statusLabel.classList.remove('live');
        currentStationDisplay.textContent = 'CONNECTION FAILED';
        updateSignalStrength(0);

        if (currentlyPlayingCard) {
            currentlyPlayingCard.classList.remove('playing');
            currentlyPlayingCard = null;
        }
    });

    // Scroll to now playing section smoothly
    nowPlayingSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Update signal strength bars
function updateSignalStrength(level) {
    const bars = document.querySelectorAll('.signal-bar');
    bars.forEach((bar, index) => {
        if (index < level) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
}

// Stop playback
function stopPlayback() {
    audioPlayer.pause();
    audioPlayer.src = '';
    isPlaying = false;

    currentStationDisplay.textContent = 'SELECT STATION';
    statusLabel.textContent = 'STANDBY';
    statusLabel.classList.remove('live');
    freqDisplay.textContent = '--- MHz';

    visualizer.classList.remove('active');
    updateSignalStrength(0);

    if (currentlyPlayingCard) {
        currentlyPlayingCard.classList.remove('playing');
        currentlyPlayingCard = null;
    }
}

// Stop button click handler
stopBtn.addEventListener('click', stopPlayback);

// Handle audio errors
audioPlayer.addEventListener('error', () => {
    statusLabel.textContent = 'NO SIGNAL';
    statusLabel.classList.remove('live');
    currentStationDisplay.textContent = 'TRY ANOTHER STATION';
    visualizer.classList.remove('active');
    updateSignalStrength(1);
    isPlaying = false;

    if (currentlyPlayingCard) {
        currentlyPlayingCard.classList.remove('playing');
        currentlyPlayingCard = null;
    }
});

// Handle audio playing
audioPlayer.addEventListener('playing', () => {
    isPlaying = true;
    statusLabel.textContent = 'LIVE';
    statusLabel.classList.add('live');
    visualizer.classList.add('active');
    updateSignalStrength(5);
});

// Handle audio waiting/buffering
audioPlayer.addEventListener('waiting', () => {
    statusLabel.textContent = 'BUFFERING...';
    statusLabel.classList.remove('live');
    updateSignalStrength(2);
});

// Handle audio pause
audioPlayer.addEventListener('pause', () => {
    if (!audioPlayer.src) {
        visualizer.classList.remove('active');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateSignalStrength(0);

    // Add loading state to buttons
    const tuneButtons = document.querySelectorAll('.tune-btn');
    tuneButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove loading from all buttons
            tuneButtons.forEach(b => b.classList.remove('loading'));
            // Add loading to clicked button
            this.classList.add('loading');
        });
    });

    // Remove loading state when audio starts or errors
    audioPlayer.addEventListener('playing', () => {
        tuneButtons.forEach(btn => btn.classList.remove('loading'));
    });

    audioPlayer.addEventListener('error', () => {
        tuneButtons.forEach(btn => btn.classList.remove('loading'));
    });

    // Add keyboard support for accessibility
    tuneButtons.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Volume knob rotation (visual only for now)
    const volumeKnob = document.querySelector('.volume-knob');
    if (volumeKnob) {
        let rotation = 0;
        volumeKnob.addEventListener('click', () => {
            rotation += 30;
            volumeKnob.querySelector('.knob-marker').style.transform =
                `translateX(-50%) rotate(${rotation}deg)`;
        });
    }

    // Console message
    console.log('%c📡 KIDS RADIOS - TUNED IN', 'font-size: 20px; color: #00ff88; font-weight: bold; background: #1a1a2e; padding: 10px;');
    console.log('%cListening to real weather and emergency broadcasts!', 'font-size: 14px; color: #888;');
});

// Simulate random signal strength fluctuations when playing
setInterval(() => {
    if (isPlaying) {
        const randomStrength = Math.floor(Math.random() * 2) + 4; // 4 or 5 bars
        updateSignalStrength(randomStrength);
    }
}, 3000);

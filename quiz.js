// Badge System for KidsRadios.com
// Tracks progress in localStorage

const badges = {
    weather: {
        name: 'Weather Watcher',
        icon: '🌦️',
        description: 'Completed the Weather Basics quiz',
        key: 'badge_weather'
    },
    frequency: {
        name: 'Frequency Master',
        icon: '📡',
        description: 'Mastered all 7 NOAA frequencies',
        key: 'badge_frequency'
    },
    alert: {
        name: 'Alert Expert',
        icon: '🔔',
        description: 'Can identify all alert tones',
        key: 'badge_alert'
    },
    zone: {
        name: 'Zone Navigator',
        icon: '🗺️',
        description: 'Understands FIPS codes and zones',
        key: 'badge_zone'
    },
    safety: {
        name: 'Safety Scout',
        icon: '🏕️',
        description: 'Knows wilderness weather safety',
        key: 'badge_safety'
    }
};

// Check if a badge has been earned
function hasBadge(badgeId) {
    return localStorage.getItem(badges[badgeId].key) === 'true';
}

// Save a badge
function saveBadge(badgeId) {
    if (badges[badgeId]) {
        localStorage.setItem(badges[badgeId].key, 'true');
        return true;
    }
    return false;
}

// Get all earned badges
function getEarnedBadges() {
    return Object.keys(badges).filter(id => hasBadge(id));
}

// Get badge count
function getBadgeCount() {
    return getEarnedBadges().length;
}

// Get total badge count
function getTotalBadges() {
    return Object.keys(badges).length;
}

// Clear all badges (for testing)
function clearAllBadges() {
    Object.values(badges).forEach(badge => {
        localStorage.removeItem(badge.key);
    });
}

// Render badges to a container
function renderBadges(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    Object.keys(badges).forEach(id => {
        const badge = badges[id];
        const earned = hasBadge(id);

        const badgeEl = document.createElement('div');
        badgeEl.className = 'badge-item' + (earned ? ' earned' : '');
        badgeEl.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
        `;
        badgeEl.title = badge.description;

        container.appendChild(badgeEl);
    });
}

// Create confetti celebration
function createConfetti() {
    const colors = ['#f0b429', '#7ed321', '#ff6b6b', '#4ecdc4', '#ffe066', '#ff9f43'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = confetti.style.width;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3500);
    }
}

// Show badge earned notification
function showBadgeNotification(badgeId) {
    const badge = badges[badgeId];
    if (!badge) return;

    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(145deg, #1a3009, #2d5016);
        border: 4px solid #f0b429;
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        animation: badgePopIn 0.5s ease;
    `;

    notification.innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 1rem;">${badge.icon}</div>
        <h2 style="color: #f0b429; margin-bottom: 0.5rem;">Badge Earned!</h2>
        <p style="color: #7ed321; font-size: 1.2rem; margin-bottom: 0.5rem;">${badge.name}</p>
        <p style="color: #c8e6a0;">${badge.description}</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 1rem;
            padding: 0.8rem 2rem;
            background: linear-gradient(135deg, #f0b429 0%, #d4940c 100%);
            border: 2px solid #ffe066;
            border-radius: 10px;
            color: #1a3009;
            font-weight: 700;
            cursor: pointer;
            font-family: 'Outfit', sans-serif;
        ">Awesome!</button>
    `;

    // Add animation keyframes
    if (!document.getElementById('badgeAnimStyle')) {
        const style = document.createElement('style');
        style.id = 'badgeAnimStyle';
        style.textContent = `
            @keyframes badgePopIn {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);
    createConfetti();

    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 10000);
}

// Initialize badges display on page load
document.addEventListener('DOMContentLoaded', () => {
    // If there's a badges container, render badges
    const badgesContainer = document.getElementById('badgesGrid');
    if (badgesContainer) {
        renderBadges('badgesGrid');
    }

    // Update badge count if element exists
    const countEl = document.getElementById('badgeCount');
    if (countEl) {
        countEl.textContent = `${getBadgeCount()} / ${getTotalBadges()}`;
    }
});

// Weather Alert Tone Generator using Web Audio API
// KidsRadios.com - Educational Tool

class AlertToneGenerator {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.currentOscillators = [];
    }

    // Initialize audio context (must be called after user interaction)
    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Stop all currently playing tones
    stop() {
        this.currentOscillators.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {}
        });
        this.currentOscillators = [];
        this.isPlaying = false;
    }

    // Play a simple tone at a specific frequency
    playTone(frequency, duration, callback) {
        this.init();
        this.stop();
        this.isPlaying = true;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        // Fade in and out to avoid clicks
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + duration - 0.05);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);

        this.currentOscillators.push(oscillator);

        oscillator.onended = () => {
            this.isPlaying = false;
            if (callback) callback();
        };
    }

    // 1050 Hz Attention Signal - The main weather alert tone
    // This tone plays for 8-10 seconds before important alerts
    playAttentionSignal(duration = 3, callback) {
        this.init();
        this.stop();
        this.isPlaying = true;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 1050;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.4, this.audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.4, this.audioContext.currentTime + duration - 0.1);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);

        this.currentOscillators.push(oscillator);

        oscillator.onended = () => {
            this.isPlaying = false;
            if (callback) callback();
        };
    }

    // SAME (Specific Area Message Encoding) Tone
    // This is the digital data burst that activates weather radios
    // It uses two alternating frequencies: 2083.3 Hz and 1562.5 Hz (FSK)
    playSAMETone(duration = 3, callback) {
        this.init();
        this.stop();
        this.isPlaying = true;

        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gainNode1 = this.audioContext.createGain();
        const gainNode2 = this.audioContext.createGain();

        osc1.connect(gainNode1);
        osc2.connect(gainNode2);
        gainNode1.connect(this.audioContext.destination);
        gainNode2.connect(this.audioContext.destination);

        // SAME uses frequency shift keying between these two tones
        osc1.frequency.value = 2083.3; // Mark frequency
        osc2.frequency.value = 1562.5; // Space frequency
        osc1.type = 'square';
        osc2.type = 'square';

        // Create rapid alternating pattern to simulate FSK
        const now = this.audioContext.currentTime;
        const switchInterval = 0.05; // 50ms switches for demo

        for (let t = 0; t < duration; t += switchInterval * 2) {
            gainNode1.gain.setValueAtTime(0.15, now + t);
            gainNode2.gain.setValueAtTime(0, now + t);
            gainNode1.gain.setValueAtTime(0, now + t + switchInterval);
            gainNode2.gain.setValueAtTime(0.15, now + t + switchInterval);
        }

        // Fade out at end
        gainNode1.gain.setValueAtTime(0, now + duration);
        gainNode2.gain.setValueAtTime(0, now + duration);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);

        this.currentOscillators.push(osc1, osc2);

        osc2.onended = () => {
            this.isPlaying = false;
            if (callback) callback();
        };
    }

    // End of Message (EOM) tone - three 1 second bursts
    playEOMTone(callback) {
        this.init();
        this.stop();
        this.isPlaying = true;

        let burstCount = 0;
        const playBurst = () => {
            if (burstCount >= 3) {
                this.isPlaying = false;
                if (callback) callback();
                return;
            }

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 853; // EOM uses 853 Hz
            oscillator.type = 'sine';

            const now = this.audioContext.currentTime;
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.8);
            gainNode.gain.linearRampToValueAtTime(0, now + 1);

            oscillator.start(now);
            oscillator.stop(now + 1);

            this.currentOscillators.push(oscillator);

            burstCount++;
            oscillator.onended = () => {
                setTimeout(playBurst, 200); // Gap between bursts
            };
        };

        playBurst();
    }

    // Warning siren pattern (ascending/descending)
    playWarningSiren(duration = 4, callback) {
        this.init();
        this.stop();
        this.isPlaying = true;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';

        // Create ascending/descending siren effect
        const now = this.audioContext.currentTime;
        const cycleTime = duration / 4;

        for (let i = 0; i < 4; i++) {
            const startTime = now + (i * cycleTime);
            if (i % 2 === 0) {
                // Ascending
                oscillator.frequency.setValueAtTime(400, startTime);
                oscillator.frequency.linearRampToValueAtTime(800, startTime + cycleTime);
            } else {
                // Descending
                oscillator.frequency.setValueAtTime(800, startTime);
                oscillator.frequency.linearRampToValueAtTime(400, startTime + cycleTime);
            }
        }

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.4, now + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.4, now + duration - 0.1);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);

        oscillator.start(now);
        oscillator.stop(now + duration);

        this.currentOscillators.push(oscillator);

        oscillator.onended = () => {
            this.isPlaying = false;
            if (callback) callback();
        };
    }

    // Get a random tone type for the listening game
    getRandomToneType() {
        const tones = ['attention', 'same', 'eom', 'siren'];
        return tones[Math.floor(Math.random() * tones.length)];
    }

    // Play a tone by type name
    playByType(type, callback) {
        switch(type) {
            case 'attention':
                this.playAttentionSignal(3, callback);
                break;
            case 'same':
                this.playSAMETone(3, callback);
                break;
            case 'eom':
                this.playEOMTone(callback);
                break;
            case 'siren':
                this.playWarningSiren(4, callback);
                break;
            default:
                this.playAttentionSignal(3, callback);
        }
    }

    // Get human-readable name for tone type
    getToneName(type) {
        const names = {
            'attention': '1050 Hz Attention Signal',
            'same': 'SAME Digital Burst',
            'eom': 'End of Message (EOM)',
            'siren': 'Warning Siren'
        };
        return names[type] || 'Unknown Tone';
    }
}

// Create global instance
const toneGenerator = new AlertToneGenerator();

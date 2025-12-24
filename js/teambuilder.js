

class TeamBuilder {
    constructor() {
        this.selectedPals = [];
        this.maxTeamSize = 5;
        this.init();
    }
    
    init() {
        this.palOptions = document.querySelectorAll('.pal-option');
        this.teamSlots = document.querySelectorAll('.team-slot');
        this.resetButton = document.getElementById('reset-team');
        
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        this.palOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectPal(option);
            });
        });
        
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => {
                this.resetTeam();
            });
        }
    }
    
    selectPal(option) {
        const palData = {
            name: option.dataset.pal,
            power: parseInt(option.dataset.power),
            type: option.dataset.type,
            icon: option.querySelector('i').className,
            displayName: option.querySelector('h4').textContent
        };
        

        if (this.selectedPals.length >= this.maxTeamSize) {
            this.showMessage('Team is full! Remove a Pal first.', 'warning');
            return;
        }
   
        if (this.selectedPals.some(p => p.name === palData.name)) {
            this.showMessage('This Pal is already in your team!', 'warning');
            return;
        }
        
      
        this.selectedPals.push(palData);
        this.updateTeamDisplay();
        this.updateTeamStats();
        this.playSelectAnimation(option);
        this.showMessage(`${palData.displayName} joined your team!`, 'success');
        
   
        if (typeof playSound === 'function') {
            playSound('click');
        }
    }
    
    removePal(index) {
        const removed = this.selectedPals.splice(index, 1)[0];
        this.updateTeamDisplay();
        this.updateTeamStats();
        this.showMessage(`${removed.displayName} left your team.`, 'info');
    }
    
    updateTeamDisplay() {
        const teamSlots = document.querySelectorAll('.team-slot');
        const teamCount = document.getElementById('team-count');
        
        teamSlots.forEach((slot, index) => {
            slot.innerHTML = '';
            slot.classList.remove('filled');
            
            if (this.selectedPals[index]) {
                const pal = this.selectedPals[index];
                slot.classList.add('filled');
                slot.innerHTML = `
                    <i class="${pal.icon}"></i>
                    <span class="pal-mini-name">${pal.displayName}</span>
                    <button class="remove-pal" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                const removeBtn = slot.querySelector('.remove-pal');
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.removePal(index);
                });
            } else {
                slot.classList.add('empty');
                slot.innerHTML = '+';
            }
        });
        
        teamCount.textContent = `(${this.selectedPals.length}/${this.maxTeamSize})`;
    }
    
    updateTeamStats() {
        const totalPower = this.selectedPals.reduce((sum, pal) => sum + pal.power, 0);
        const avgPower = this.selectedPals.length > 0 ? (totalPower / this.selectedPals.length).toFixed(1) : 0;
        
        document.getElementById('total-power').textContent = totalPower;
        document.getElementById('avg-power').textContent = avgPower;
        
        
        const balance = this.calculateBalance();
        document.getElementById('team-balance').textContent = balance;
    }
    
    calculateBalance() {
        if (this.selectedPals.length === 0) return '-';
        
        const types = this.selectedPals.map(p => p.type);
        const uniqueTypes = [...new Set(types)];
        
        if (uniqueTypes.length === 1) {
            return 'Mono-Type 🔥';
        } else if (uniqueTypes.length === this.selectedPals.length) {
            return 'Perfect Balance ⚖️';
        } else if (uniqueTypes.length >= 3) {
            return 'Well Balanced ✨';
        } else {
            return 'Dual Type 🌟';
        }
    }
    
    playSelectAnimation(option) {
        option.style.transform = 'scale(1.1)';
        setTimeout(() => {
            option.style.transform = 'scale(1)';
        }, 200);
    }
    
    resetTeam() {
        this.selectedPals = [];
        this.updateTeamDisplay();
        this.updateTeamStats();
        this.showMessage('Team reset! Select new Pals.', 'info');
        
        if (typeof playSound === 'function') {
            playSound('click');
        }
    }
    
    showMessage(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `team-message team-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            background: ${this.getMessageColor(type)};
            color: white;
            border-radius: 50px;
            font-weight: 600;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            animation: messageSlide 0.3s ease-out;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'messageSlideOut 0.3s ease-out';
            setTimeout(() => messageEl.remove(), 300);
        }, 2500);
    }
    
    getMessageColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #00FF88, #00CCFF)',
            warning: 'linear-gradient(135deg, #FF9A4D, #FFC44D)',
            error: 'linear-gradient(135deg, #FF4E4E, #FF9A4D)',
            info: 'linear-gradient(135deg, #9A4DFF, #FF4EDB)'
        };
        return colors[type] || colors.info;
    }
}


const style = document.createElement('style');
style.textContent = `
    .team-slot {
        position: relative;
        width: 100px;
        height: 100px;
        background: rgba(26, 26, 46, 0.6);
        border: 2px solid rgba(154, 77, 255, 0.3);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: rgba(154, 77, 255, 0.5);
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .team-slot.empty {
        border-style: dashed;
    }
    
    .team-slot.filled {
        background: linear-gradient(135deg, rgba(154, 77, 255, 0.2), rgba(255, 78, 219, 0.2));
        border-color: rgba(154, 77, 255, 0.6);
        animation: slotFill 0.5s ease-out;
    }
    
    .team-slot.filled i {
        font-size: 36px;
        background: linear-gradient(135deg, #9A4DFF, #FF4EDB);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 5px;
    }
    
    .pal-mini-name {
        font-size: 10px;
        font-weight: 600;
        color: white;
        text-align: center;
    }
    
    .remove-pal {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 24px;
        height: 24px;
        background: #FF4E4E;
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease;
    }
    
    .remove-pal i {
        font-size: 10px;
        color: white;
        background: none !important;
        -webkit-text-fill-color: white !important;
    }
    
    .team-slot.filled:hover .remove-pal {
        opacity: 1;
    }
    
    .remove-pal:hover {
        transform: scale(1.2);
    }
    
    @keyframes slotFill {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes messageSlide {
        from {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes messageSlideOut {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
        }
    }
    
    .pal-option {
        cursor: pointer;
        padding: 20px;
        background: rgba(26, 26, 46, 0.6);
        border: 2px solid rgba(154, 77, 255, 0.2);
        border-radius: 15px;
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .pal-option:hover {
        transform: translateY(-5px);
        border-color: rgba(154, 77, 255, 0.6);
        background: rgba(154, 77, 255, 0.1);
        box-shadow: 0 8px 32px rgba(154, 77, 255, 0.3);
    }
    
    .pal-option i {
        font-size: 40px;
        background: linear-gradient(135deg, #9A4DFF, #FF4EDB);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 10px;
    }
    
    .pal-option h4 {
        font-size: 16px;
        margin: 10px 0 5px;
    }
    
    .pal-type {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .team-builder-section {
        padding: 100px 0;
        background: rgba(26, 26, 46, 0.3);
    }
    
    .team-builder-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 40px;
        margin-top: 40px;
    }
    
    .pal-selection-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 20px;
    }
    
    .team-display {
        background: rgba(26, 26, 46, 0.6);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(154, 77, 255, 0.3);
        border-radius: 20px;
        padding: 30px;
        position: sticky;
        top: 100px;
    }
    
    .team-display h3 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
    }
    
    .selected-team {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
        margin-bottom: 30px;
    }
    
    .team-stats {
        background: rgba(9, 11, 25, 0.6);
        border: 1px solid rgba(154, 77, 255, 0.2);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
    }
    
    .stat-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .stat-row:last-child {
        border-bottom: none;
    }
    
    .stat-value {
        font-weight: 700;
        background: linear-gradient(135deg, #9A4DFF, #FF4EDB);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    @media (max-width: 968px) {
        .team-builder-content {
            grid-template-columns: 1fr;
        }
        
        .team-display {
            position: relative;
            top: 0;
        }
    }
`;
document.head.appendChild(style);


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.team-builder-section')) {
            new TeamBuilder();
            console.log('🎮 Team Builder Initialized!');
        }
    });
} else {
    if (document.querySelector('.team-builder-section')) {
        new TeamBuilder();
        console.log('🎮 Team Builder Initialized!');
    }
}

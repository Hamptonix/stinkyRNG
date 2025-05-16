class weightedRNG {
    constructor() {
        this.items = [];
    }

    addItem(item, weight, color) {
        this.items.push({ item, weight, color });
    }
    
    roll() {
        const totalWeight = this.items.reduce((sum, item) => sum + item.weight, 0);
        const rand = Math.random() * totalWeight;

        let acc = 0;
        for (const item of this.items) {
            acc += item.weight;
            if (rand < acc) return item.item;
        }

        return null;
    }

    getPercentByName(name) {
        const item = this.items.find(item => item.item === name);
        if (item) {
            // return item.weight;
            return Math.round(item.weight * 100) / 100;
        } else {
            return null;
        }
    }

    getColorByName(name) {
        const item = this.items.find(item => item.item === name);
        if (item) {
            return item.color;
        } else {
            return null;
        }
    }

    getTable() {
        return this.items.map(({item, weight}) => `${item} (${weight})`).join(', ');
    }
}

// has to add up to 100
const rng = new weightedRNG();
rng.addItem('Common', 50, 'gray');
rng.addItem('Uncommon', 25, 'green');
rng.addItem('Rare', 12.5, 'blue');
rng.addItem('Epic', 6.25, 'purple');  
rng.addItem('Legendary', 3.125, 'orange');  
rng.addItem('Mythic', 1.5625, 'red');
rng.addItem('Stinky', 0.78125, 'black');

const button = document.getElementById('gen')
const resultElement = document.getElementById('result')
const soundfx = new Audio('sounds/click.mp3');

button.addEventListener('click', () => {
    soundfx.currentTime = 0;
    soundfx.play();
    const rollResult = rng.roll();
    const percent = rng.getPercentByName(rollResult);
    resultElement.textContent = `${rollResult} (${percent}%)`;
    resultElement.style.color = rng.getColorByName(rollResult);
});
const faker = require('faker');

const random = (rangeStart, rangeEnd) => {
    return faker.random.number({
        min: rangeStart, max: rangeEnd
    });
};

function Api() {
    this.getRandomOEE = (req, res) => {
        const performance = random(50, 100);
        const availability = random(50, 100);
        const quality = random(50, 100);
        const oee = parseFloat(((performance * availability * quality) / 10000).toFixed(2));
        const active_line = random(5, 100);
        const down_line = random(5, 100);
        res.status(200).send({
            performance,
            availability,
            quality,
            oee,
            active_line,
            down_line
        });
    }
}

module.exports = new Api();
const faker = require('faker');

let counter1 = 0;
let counter2 = 0;
let q1 = 17281;
let q2 = 18363;
let q3 = 16482;
let q4 = 18472;
let temp1 = [];
let temp2 = [];

const random = (rangeStart, rangeEnd) => {
    return faker.random.number({
        min: rangeStart, max: rangeEnd
    });

};

const shuffle = array => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

const runtimeData = callback => {
    if (temp1.length < 10) {
        counter1++;
    } else {
        counter1 = 1;
    }
    const runtime = random(0, 60);
    const planned = random(0, 60 - runtime);
    const unplanned = 60 - (runtime + planned);
    const dataShuffle = shuffle([runtime, planned, unplanned]);
    const data = {
        id: counter1,
        runtime: dataShuffle[0],
        planned: dataShuffle[1],
        unplanned: dataShuffle[2]
    };
    callback(data);
};

const downtimeData = callback => {
    if (temp2.length < 10) {
        counter2++;
    } else {
        counter2 = 1;
    }
    const cuc = random(0, 60);
    const cho = random(0, 60 - cuc);
    const pre = random(0, 60 - (cuc + cho));
    const set = random(0, 60 - (cuc + cho + pre));
    const het = random(0, 60 - (cuc + cho + pre + set));
    const dot = 60 - (cuc + cho + pre + set + het);
    const dataShuffle = shuffle([cuc, cho, pre, set, het, dot]);
    const data = {
        id: counter2,
        cuc: dataShuffle[0],
        cho: dataShuffle[1],
        pre: dataShuffle[2],
        set: dataShuffle[3],
        het: dataShuffle[4],
        dot: dataShuffle[5]
    };
    callback(data);
};

const incrementQuality = callback => {
    if (q1 < 50000 && q2 < 50000 && q3 < 50000 && q4 < 50000) {
        q1++;
        q2++;
        q3++;
        q4++;
    } else {
        q1 = 17281;
        q2 = 18363;
        q3 = 16482;
        q4 = 18472;
    }
    callback(q1, q2, q3, q4);
};

const incrementRuntime = callback => {
    if (temp1.length < 10) {
        runtimeData(data => {
            temp1.push(data);
        });
    } else {
        runtimeData(data => {
            temp1 = [];
            temp1.push(data);
        });
    }
    callback(temp1);
};

const incrementDowntime = callback => {
    if (temp2.length < 10) {
        downtimeData(data => {
            temp2.push(data);
        });
    } else {
        downtimeData(data => {
            temp2 = [];
            temp2.push(data);
        });
    }
    callback(temp2);
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
    };

    this.getRandomQuality = (req, res) => {
        incrementQuality((q1, q2, q3, q4) => {
            res.status(200).send({
                q1, q2, q3, q4
            });
        });
    };

    this.getRandomRuntime = (req, res) => {
        incrementRuntime(data => {
            res.status(200).send(data);
        });
    };

    this.getRandomDowntime = (req, res) => {
        incrementDowntime(data => {
            res.status(200).send(data);
        });
    };
}

module.exports = new Api();
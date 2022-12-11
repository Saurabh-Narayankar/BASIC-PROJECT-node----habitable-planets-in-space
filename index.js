const { parse } = require('csv-parse')
const { createReadStream } = require('fs')

const habitablePlanets = []

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED' && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
    && planet["koi_prad"] < 1.6;
}

createReadStream('kepler_data.csv').pipe(parse({
    comment: '#',
    columns: true
}))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);    
        }
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('end', () => {
        habitablePlanets.map((planet) => {
            return console.log(planet['kepler_name']);
        })
        console.log(`${habitablePlanets.length} habitable planets found`);
    })


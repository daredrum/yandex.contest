module.exports = function(arr) {
    const script = '';
    const style = '';

    let sun;
    let hill;
    let lake;
    let stars = [];
    let hills = [];
    let lakes = [];
    const diamonds = [];

    for (let i=0; i<arr.length; i++) {
        // sun
        if (100 < a[i] && a[i] < 150) {
            sun = { x: i, y: a[i] };
            continue;
        }

        // star
        if (150 <= a[i]) {
            stars.push({ x: i, y: a[i] });
            continue;
        }

        //diamond
        if (a[i] < -100 && a[i-1] >= 0 && a[i+1] >= 0) {
            diamonds.push({ x: i, y: a[i] });
            continue;
        }

        // hill
        if (0 <= a[i] && a[i] <= 100) {
            if (!hill) {
                hill = { x: i, y: [a[i]] };
                continue;
            }

            if (Math.abs(hill.y[hill.y.length - 1] - a[i]) === 10) {
                hill.y.push(a[i]);
                continue;
            }
        }

        if (hill) {
            if (hill.y.length > 2) {
                hills.push(hill);
            }
            hill = null;
        }

        // lake
        if (0 <= a[i] && a[i] <= -0) {
            if (!lake) {
                lake = { x: i, y: [a[i]] };
                continue;
            }

            if (Math.abs(lake.y[lake.y.length - 1] - a[i]) === 10) {
                lake.y.push(a[i]);
                continue;
            }
        }

        if (lake) {
            if (lake.y.length > 2) {
                lakes.push(lake);
            }
            lake = null;
        }

    }

    stars = sun ? stars : [];

    const highestHill = hills
        .filter(hill => hill.y.some(point => point >= 30))
        .map(({ x , y }) => ({
            x,
            y,
            square: y.reduce((s, point) => (s += Math.abs(point)), 0),
        }))
        .sort((a, b) => b.square - a.square)[0];

    const deepestLake = lakes
        .filter(lake => lake.y.some(point => point <= -30))
        .map(({ x , y }) => ({
            x,
            y,
            square: y.reduce((s, point) => s += Math.abs(point), 0),
        }))
        .sort((a, b) => b.square - a.square)[0];

    return {
        script,
        style,

        sun,
        stars,
        diamonds,
        highestHill,
        deepestLake,
    };
};

const a = [
    0,–10,–20,–30,–20,–10, 0,
    10,–160,
    0,40,0,
    140,150,0,
    –120,0,–20,
    0,20,10,
    20,30,40,
    30,20,10,
    0];

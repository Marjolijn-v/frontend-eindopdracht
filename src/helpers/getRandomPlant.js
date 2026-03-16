function getRandomPlant(plants, count = 5) {

    if (!plants || plants.length === 0) {
        return [];
    }

    if (plants.length <= count) {
        return plants;
    }

    const randomPlants = [...plants].sort(() => Math.random() - 0.5);
    return randomPlants.slice(0,count);
}

export default getRandomPlant;

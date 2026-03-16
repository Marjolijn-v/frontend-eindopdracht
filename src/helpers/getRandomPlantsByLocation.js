function getRandomPlantsByLocation(plants, userLocation, count = 5) {
    if (!plants || plants.length === 0) {
        return { plants:[], message: ''};
    }

    if (!userLocation) {
        const randomPlants = [...plants].sort(() => Math.random() -0.5);
        return {
            plants: randomPlants.slice(0, count),
            message: '',
        };
    }

    const plantsSameLocation = plants.filter(
        plant => plant.location?.toLowerCase() === userLocation.toLowerCase()
    );

    if (plantsSameLocation.length > 0) {
        const randomPlants = [...plantsSameLocation].sort(() => Math.random() - 0.5);
        return {
            plants: randomPlants.slice(0,count);
            message: `No plants found in ${userLocation}, but here are some plants from other locations!`
        }
    }

}

export default getRandomPlantsByLocation;
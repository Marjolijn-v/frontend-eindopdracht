import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const SavedPlantsContext = createContext();

export function SavedPlantsProvider({ children }) {
    const [savedPlantId, setSavedPlantId] = useState([]);
    const [savedPlants, setSavedPlants] = useState([]);
    const [savedPlantRecordMap, setSavedPlantRecordMap] = useState({});
    const [error, setError] = useState('');

    const fetchSavedPlants = useCallback(async (userId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}/savedPlants`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                        'Accept': 'application/json',
                    }
                }
            );

            const savedPlantIds = response.data.map(sp => sp.plantId);

            const recordMap = {};
            response.data.forEach(sp => {
                recordMap[sp.plantId] = sp.id;
            });

            setSavedPlantId(savedPlantIds);
            setSavedPlantRecordMap(recordMap);

            return response.data;
        } catch (e) {
            console.error(e);
            setError('Failed to fetch saved plants');
            return [];
        }
    }, []);

    const toggleSavePlant = useCallback(async (plantId, userId, plants = []) => {
        const token = localStorage.getItem("token");
        const isSaved = savedPlantId.includes(plantId);

        try {
            if (isSaved) {
                // Delete
                const savedPlantRecordId = savedPlantRecordMap[plantId];
                await axios.delete(
                    `https://novi-backend-api-wgsgz.ondigitalocean.app/api/savedPlants/${savedPlantRecordId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    }
                );

                setSavedPlantId(prev => prev.filter(id => id !== plantId));
                setSavedPlants(prev => prev.filter(plant => plant.id !== plantId));

                const newMap = { ...savedPlantRecordMap };
                delete newMap[plantId];
                setSavedPlantRecordMap(newMap);
            } else {
                // Save
                const response = await axios.post(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/savedPlants`,
                    {
                        "userId": userId,
                        "plantId": plantId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    }
                );

                setSavedPlantId(prev => [...prev, plantId]);
                setSavedPlantRecordMap(prev => ({ ...prev, [plantId]: response.data.id }));

                // Add to savedPlants if plant data is provided
                const plantToSave = plants.find(p => p.id === plantId);
                if (plantToSave) {
                    setSavedPlants(prev => [...prev, plantToSave]);
                }
            }
        } catch (e) {
            console.error(e);
            setError('Failed to update saved plants');
            throw e;
        }
    }, [savedPlantId, savedPlantRecordMap]);

    const isSaved = useCallback((plantId) => {
        return savedPlantId.includes(plantId);
    }, [savedPlantId]);

    return (
        <SavedPlantsContext.Provider value={{
            savedPlantId,
            savedPlants,
            savedPlantRecordMap,
            error,
            fetchSavedPlants,
            toggleSavePlant,
            isSaved,
            setSavedPlants,
            setSavedPlantId,
            setSavedPlantRecordMap,
        }}>
            {children}
        </SavedPlantsContext.Provider>
    );
}

export default SavedPlantsProvider;


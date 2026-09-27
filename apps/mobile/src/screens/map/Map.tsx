import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import MapView, { Marker, Region } from 'react-native-maps';//desde mobile ejecutar: expo install react-native-maps
import { styles } from "./Map.styles";

interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    description: string;
}

export const MapScreen:React.FC = () => {
    const [region, setRegion] = useState<Region>({ //Region importado desde 'react-native-maps'
        latitude: -33.4489,
        longitude: -70.6693,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        fecthNearbyLocations();
        getUserLocation();
    }, []);

    const fecthNearbyLocations = async () => {
        try {
            const mockLocations: Location[] = [
                {
                id: 1,
                name: 'Lugar 1',
                latitude: -33.4489,
                longitude: -70.6693,
                description: 'Descripción del lugar 1'
                },
                {
                id: 2,
                name: 'Lugar 2',
                latitude: -33.4520,
                longitude: -70.6700,
                description: 'Descripción del lugar 2'
                },
                {
                id: 3,
                name: 'Lugar 3',
                latitude: -33.4450,
                longitude: -70.6650,
                description: 'Descripción del lugar 3'
                }
            ];
            setLocations(mockLocations);
            setLoading(false)

        } catch (error) {
            console.error('Error locaciones: ', error);
            setLoading(false);
        }
    };

    const getUserLocation = () => {
        setUserLocation({
            latitude: -33.4489,
            longitude: -70.6693
        });
    };

    const handleLocation = (location: Location) => {
        setSelectedLocation(location);
        setModalVisible(true);
    }

    const onRegionChangeComplete = (newRegion: Region) => {
        setRegion(newRegion);
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="0000ff"/>
                <Text>Cargando ubicaciones...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <MapView
                
                style={styles.map}
                region={region}
                onRegionChangeComplete={onRegionChangeComplete}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="Tu ubicación"
                        pinColor="blue"
                    />
                )}
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={location.name}
                        description={location.description}
                        onPress={() => handleLocation(location)}
                    />
                ))}
            </MapView>
        </View>
    )
}
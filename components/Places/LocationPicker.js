import { useNavigation } from '@react-navigation/native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function LocationPicker() {
    const navigation = useNavigation()
    const [pickedLocation, setPickedLocation] = useState()
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    async function verifyPermissions() {
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED ||
            locationPermissionInformation.status === PermissionStatus.DENIED
        ) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
         if(locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            )
            return false
        } 
        return true  
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions()
        if(!hasPermission) {
            return
        }
        const location = await getCurrentPositionAsync()
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    function pickOnMapHandler() {
        navigation.navigate('Map')
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation) {
        locationPreview = <Text>The map had to be here, but it not free service. Sorry!</Text>
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width:'100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})
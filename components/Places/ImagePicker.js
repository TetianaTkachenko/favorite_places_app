import { View, Alert, Image, Text, StyleSheet } from 'react-native';
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { useState } from 'react';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';

function ImagePicker() {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    const [pickedImage, setPickedImage] = useState()

    async function verifyPermissions() {
        if (
            cameraPermissionInformation.status ===
                PermissionStatus.UNDETERMINED ||
            cameraPermissionInformation.status === PermissionStatus.DENIED
        ) {
            const permissionResponse = await requestPermission()
 
            return permissionResponse.granted
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant camera permissions to use this app.'
            )
            return false
        }
        return true
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions()

        if(!hasPermission) {
            return
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        })
        setPickedImage(image.assets[0].uri)
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if(pickedImage) {
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />
    }
    return (
        <View>
            <View style={styles.imageContainer}>
                {imagePreview}
            </View>
            <OutlinedButton icon='camera' onPress={takeImageHandler}>Take a photo</OutlinedButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imageContainer: {
        width:'100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})
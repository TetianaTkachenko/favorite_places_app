import { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';

function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState('')

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.lebel}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle}
                />
            </View>
            <ImagePicker />
        </ScrollView>
    )
}
export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    lebel: {
        fontWeight: 'bold',
        color: Colors.primary500
    },
    input: {
        backgroundColor: Colors.primary100,
        paddingHorizontal: 4,
        paddingVertical: 8,
        marginVertical: 8,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        fontSize: 16
    }
})
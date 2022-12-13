import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

function PlaceList({ places }) {

    if (!places || places.length === 0) {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>
                No places added yet - start adding some!
            </Text>
        </View>
    }

    return (
        <FlatList
            data={places} k
            eyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceItem place={item} />}
        />
    )
}

export default PlaceList;

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})
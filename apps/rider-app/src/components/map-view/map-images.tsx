import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Mapbox from '@rnmapbox/maps';
import { View } from 'react-native';
import styles from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';

const MapImages = () => {
  return (
    <Mapbox.Images>
      <Mapbox.Image name="me">
        <View style={styles.iconContainer}>
          <MaterialIcons name="navigation" size={30} color="#00AACC" />
        </View>
      </Mapbox.Image>
      <Mapbox.Image name="pickupIcon">
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={30} color="#FF5555" />
        </View>
      </Mapbox.Image>
      <Mapbox.Image name="dropoffIcon">
        <View style={styles.iconContainer}>
          <MaterialIcons name="location-pin" size={30} color="#5588FF" />
        </View>
      </Mapbox.Image>
      <Mapbox.Image name="carIcon">
        <View style={styles.iconContainer}>
          <Ionicons name="car" size={30} color="#5588FF" />
        </View>
      </Mapbox.Image>
    </Mapbox.Images>
  );
};


export default MapImages;
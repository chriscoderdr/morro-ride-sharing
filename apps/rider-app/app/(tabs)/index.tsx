import RideRequestForm from '@/components/ride-request-form';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  LoginForm,
  ScrollableFormContainer
} from 'react-native-morro-taxi-rn-components';

export default function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <ScrollableFormContainer>
        <LoginForm />
      </ScrollableFormContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
});

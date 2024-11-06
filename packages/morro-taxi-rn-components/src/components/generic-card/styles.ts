import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IGenericCardStyles {
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  primaryButton: ViewStyle;
  secondaryButton: ViewStyle;
}

export const styles = StyleSheet.create<IGenericCardStyles>({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center'
  },
  primaryButton: {
    backgroundColor: '#007AFF'
  },
  secondaryButton: {
    backgroundColor: '#CC0000'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

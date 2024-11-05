import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  riderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  riderDetails: {
    flex: 1,
    marginRight: 10
  },
  riderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  callButtonText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 5
  },
  riderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd'
  },
  infoContainer: {
    marginTop: 10,
    paddingHorizontal: 5
  },
  infoText: {
    fontSize: 14,
    color: '#666'
  },
  locationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginVertical: 3
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  }
});

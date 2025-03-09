import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontFamily: 'Kanit-Bold',
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    paddingBottom: 10
  },
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 35 : 0,
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#fff',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 30
  },
  button: {
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#3180E1',
    height: 50,
    width: '50%',
    borderWidth: 2,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C0C0C0FF'
  },
  linkText: {
    color: '#3180E1',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
    
});

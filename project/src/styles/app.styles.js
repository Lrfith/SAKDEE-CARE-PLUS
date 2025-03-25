import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F58F'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#459bec',
  },
  headerRightText: {
    marginRight: 15,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Kanit-Regular',
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
    borderColor: '#C0C0C0FF',
    fontFamily: 'Kanit-Regular',
  },
  linkText: {
    color: '#3180E1',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: '20%',
  },
  // Symbols
  displayCard: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    minHeight: 100,
    justifyContent: "center",
    marginBottom: 10,
  },
  symbolContainer: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  instructionText: {
    fontSize: 17,
    fontWeight: "500",
  },
  categoryContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10, //
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontFamily: "Kanit-Regular",
    marginBottom: 10,
    marginLeft: 10
  },
  symbolsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  symbolTouchable: {
    width: 80,
    height: 80,
  },
  buttonCategory: {
    alignItems: "center",
    borderRadius: 50,
    height: 35,
    // borderWidth: 2,
    justifyContent: "center",
    width: 100,
  },
  symbolImage: {
    width: 40,
    height: 40,

  },
  selectedSymbolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // paddingVertical: 10,
    paddingHorizontal: 5,
  },
  placeholderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  symbolContainerDisplay: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  confirmButton: {
    width: "90%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: 'absolute',
    bottom: 120,  // ระยะห่างจากด้านล่าง
    left: 80,    // ระยะห่างจากด้านซ้าย
    right: 80,   // ระยะห่างจากด้านขวา
    backgroundColor: '#3180E1',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,  // ให้ปุ่มลอยอยู่ข้างหน้า
  },
  shadowStyle:
  {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
});

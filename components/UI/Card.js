import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../util/colors";
const Card = ({ children }) => {
  return <View style={styles.inputContainer}>{children}</View>;
};
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginHorizontal: 24,
    marginTop: deviceWidth < 380 ? 18 : 36,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,
    alignItems: "center",
  },
});
export default Card;

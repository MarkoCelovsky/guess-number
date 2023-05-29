import { Text, View, Pressable, StyleSheet } from "react-native";
import Colors from "../../util/colors";
const PrimaryButton = ({ children, onPress }) => {
  const pressHandler = () => {
    onPress();
  };
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        onPress={pressHandler}
        style={styles.btnInnerContainer}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  btnOuterContainer: {
    margin: 4,
    borderRadius: 28,
    overflow: "hidden",
  },
  btnInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
});
export default PrimaryButton;

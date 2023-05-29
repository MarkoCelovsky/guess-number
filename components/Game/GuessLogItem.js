import { View, Text, StyleSheet } from "react-native";
import Colors from "../../util/colors";

const GuessLogItem = ({ roundNumber, guess }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemtext}>#{roundNumber}</Text>
      <Text style={styles.itemtext}>Oponent's Guess: {guess}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  listItem: {
    borderWidth: 2,
    borderColor: Colors.primary800,
    borderRadius: 18,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 3,
  },
  itemtext: {
    fontFamily: "open-sans",
  },
});
export default GuessLogItem;

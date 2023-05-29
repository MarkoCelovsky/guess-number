import {
  View,
  StyleSheet,
  Alert,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../components/UI/Title";
import { useState, useEffect } from "react";
import Number from "../components/Game/Number";
import PrimaryButton from "../components/UI/PrimaryButton";
import Card from "../components/UI/Card";
import InstText from "../components/UI/InstText";
import GuessLogItem from "../components/Game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
let minBound = 1;
let maxBound = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const { width, height } = useWindowDimensions();
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBound = 1;
    maxBound = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("You are lying!", "Entered hint must have been falsy.", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBound = currentGuess;
    } else {
      minBound = currentGuess + 1;
    }
    const randNum = generateRandomBetween(minBound, maxBound, currentGuess);
    setCurrentGuess(randNum);
    setGuessRounds((prevGuess) => [randNum, ...prevGuess]);
  };
  const guessRoundsLength = guessRounds.length;
  let content = (
    <>
      <Number>{currentGuess}</Number>
      <Card>
        <InstText style={styles.instText}>Higher or Lower</InstText>
        <View style={styles.btns}>
          <View style={styles.btn}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={20} />
            </PrimaryButton>
          </View>
          <View style={styles.btn}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={20} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
  if (width > 500) {
    content = (
      <>
        <View style={styles.btnsWide}>
          <View style={styles.btn}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={20} />
            </PrimaryButton>
          </View>
          <Number>{currentGuess}</Number>
          <View style={styles.btn}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={20} />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Oponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
        {/* {guessRounds.map((guess) => (
          <Text key={guess}>{guess}</Text>
        ))} */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 48,
    alignItems: "center",
  },
  btnsWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  btns: {
    flexDirection: "row",
  },
  btn: {
    flex: 1,
  },
  instText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    // padding: width > 500 ? 12 : 16,
    padding: 16,
  },
});

export default GameScreen;

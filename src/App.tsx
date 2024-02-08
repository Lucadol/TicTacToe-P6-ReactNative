import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';


function App(): React.JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState<string[]>(new Array(9).fill('empty', 0, 9))

  const reloadGame = () => {
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkWinner = () => {
    if (gameState[0] !== 'empty' && gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
      setGameWinner(`${gameState[0]} won the game !`)
    } else if (gameState[3] !== 'empty' && gameState[3] === gameState[4] && gameState[4] === gameState[5]) {
      setGameWinner(`${gameState[3]} won the game !`)
    } else if (gameState[6] !== 'empty' && gameState[6] === gameState[7] && gameState[7] === gameState[8]) {
      setGameWinner(`${gameState[6]} won the game !`)
    } else if (gameState[0] !== 'empty' && gameState[0] === gameState[3] && gameState[3] === gameState[6]) {
      setGameWinner(`${gameState[0]} won the game !`)
    } else if (gameState[1] !== 'empty' && gameState[1] === gameState[4] && gameState[4] === gameState[7]) {
      setGameWinner(`${gameState[1]} won the game !`)
    } else if (gameState[2] !== 'empty' && gameState[2] === gameState[5] && gameState[5] === gameState[8]) {
      setGameWinner(`${gameState[2]} won the game !`)
    } else if (gameState[0] !== 'empty' && gameState[0] === gameState[4] && gameState[4] === gameState[8]) {
      setGameWinner(`${gameState[0]} won the game !`)
    } else if (gameState[2] !== 'empty' && gameState[2] === gameState[4] && gameState[4] === gameState[6]) {
      setGameWinner(`${gameState[2]} won the game !`)
    } else if (!gameState.includes('empty')) {
      setGameWinner(`Game is drawn !`)
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF'
      })
    }
    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setGameState([...gameState])
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFFFFF'
      })
    }
    checkWinner()
  }

  return (
    <SafeAreaView>
      <StatusBar/>
      {gameWinner ? (
        <View style={[styles.playerInfo, gameWinner === 'Game is drawn !' ? styles.drawInfo : (gameWinner.includes('cross') ? styles.crossWinnerInfo : styles.circleWinnerInfo)]}>
        <Text style={styles.winnerTxt}>{gameWinner}</Text>
      </View>
      ) : (
        <View style={[
          styles.playerInfo,
          isCross ? styles.playerX : styles.playerO
          ]}>
          <Text style={styles.gameTurnTxt}>
            {isCross? 'Cross' : 'Cercle'}'s Turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item, index}) => (
       <Pressable
        key={index}
        style={styles.card}
        onPress={() => onChangeItem(index)}
       >
          <Icons name={item} />
       </Pressable>
      )}
      />
      {/* game action */}
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>Reload Game</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#EAF0F1',
    borderRadius: 2
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  crossWinnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77', // Vert pour la croix
    shadowOpacity: 0.1,
  },
  circleWinnerInfo: {
    borderRadius: 8,
    backgroundColor: '#F7CD2E', // Jaune pour le cercle
    shadowOpacity: 0.1,
  },
  drawInfo: {
    borderRadius: 8,
    backgroundColor: '#25CCF7', // Bleu pour l'égalité
    shadowOpacity: 0.1,
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;

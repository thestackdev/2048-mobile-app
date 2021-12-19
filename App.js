import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNSplashScreen from 'react-native-splash-screen'

const windowWidth = Dimensions.get('window').width - 50

const App = () => {
  const [pieces, setPieces] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(null)

  const pickColor = (num) => {
    switch (num) {
      case 2:
        return '#90A4AE'
      case 4:
        return '#FFCCBC'
      case 8:
        return '#FFAB91'
      case 16:
        return '#FFD54F'
      case 32:
        return '#A5D6A7'
      case 64:
        return '#4FC3F7'
      case 128:
        return '#7986CB'
      case 256:
        return '#EF9A9A'
      case 512:
        return '#B2FF59'
      case 1024:
        return '#F3E5F5'
      case 2048:
        return '#9575CD'
      default:
        break
    }
  }

  const onSwipeUp = () => {
    let newRow = Array(16).fill(0)
    for (let i = 0; i < 4; i++) {
      const array = [
        pieces[i],
        pieces[i + 4 * 1],
        pieces[i + 4 * 2],
        pieces[i + 4 * 3],
      ]
      let filteredRow = array.filter((num) => num)
      let tempRow = filteredRow.concat(Array(4 - filteredRow.length).fill(0))

      for (let i = 0; i < 3; i++) {
        if (tempRow[i] > 0 && tempRow[i] === tempRow[i + 1]) {
          tempRow[i + 1] = 0
          tempRow[i] *= 2
          setScore((prev) => (prev += 1))
        }
      }

      filteredRow = tempRow.filter((num) => num)
      tempRow = filteredRow.concat(Array(4 - filteredRow.length).fill(0))

      newRow[i] = tempRow[0]
      newRow[i + 4 * 1] = tempRow[1]
      newRow[i + 4 * 2] = tempRow[2]
      newRow[i + 4 * 3] = tempRow[3]
    }
    let randomPiece = null

    do {
      randomPiece = Math.floor(Math.random() * 16)
      if (newRow[randomPiece] === 0) break
    } while (true)
    newRow[randomPiece] = 2
    setPieces(newRow)
  }

  const onSwipeDown = () => {
    let newRow = Array(16).fill(0)
    for (let i = 0; i < 4; i++) {
      const array = [
        pieces[i],
        pieces[i + 4 * 1],
        pieces[i + 4 * 2],
        pieces[i + 4 * 3],
      ]
      let filteredRow = array.filter((num) => num)
      const tempRow = Array(4 - filteredRow.length)
        .fill(0)
        .concat(filteredRow)

      for (let i = 3; i > 0; i--) {
        if (tempRow[i] > 0 && tempRow[i] === tempRow[i - 1]) {
          tempRow[i - 1] = 0
          tempRow[i] *= 2
          setScore((prev) => (prev += 1))
        }
      }

      filteredRow = tempRow.filter((num) => num)
      tempRow = Array(4 - filteredRow.length)
        .fill(0)
        .concat(filteredRow)

      newRow[i] = tempRow[0]
      newRow[i + 4 * 1] = tempRow[1]
      newRow[i + 4 * 2] = tempRow[2]
      newRow[i + 4 * 3] = tempRow[3]
    }

    let randomPiece = null

    do {
      randomPiece = Math.floor(Math.random() * 16)
      if (newRow[randomPiece] === 0) break
    } while (true)
    newRow[randomPiece] = 2
    setPieces(newRow)
  }

  const onSwipeLeft = () => {
    let newRow = []
    for (let i = 0; i < 16; i += 4) {
      const array = [pieces[i], pieces[i + 1], pieces[i + 2], pieces[i + 3]]

      let filteredRow = array.filter((num) => num)
      const tempRow = filteredRow.concat(Array(4 - filteredRow.length).fill(0))

      for (let i = 0; i < 3; i++) {
        if (tempRow[i] > 0 && tempRow[i] === tempRow[i + 1]) {
          tempRow[i + 1] = 0
          tempRow[i] *= 2
          setScore((prev) => (prev += 1))
        }
      }

      filteredRow = tempRow.filter((num) => num)
      tempRow = filteredRow.concat(Array(4 - filteredRow.length).fill(0))
      tempRow.forEach((_piece) => newRow.push(_piece))
    }
    let randomPiece = null

    do {
      randomPiece = Math.floor(Math.random() * 16)
      if (newRow[randomPiece] === 0) break
    } while (true)
    newRow[randomPiece] = 2
    setPieces(newRow)
  }

  const onSwipeRight = () => {
    let newRow = []
    for (let i = 0; i < 16; i += 4) {
      const row = [pieces[i], pieces[i + 1], pieces[i + 2], pieces[i + 3]]

      let filteredRow = row.filter((num) => num)
      let tempRow = Array(4 - filteredRow.length)
        .fill(0)
        .concat(filteredRow)

      for (let i = 3; i > 0; i--) {
        if (tempRow[i] > 0 && tempRow[i] === tempRow[i - 1]) {
          tempRow[i - 1] = 0
          tempRow[i] *= 2
          setScore((prev) => (prev += 1))
        }
      }

      filteredRow = tempRow.filter((num) => num)
      tempRow = Array(4 - filteredRow.length)
        .fill(0)
        .concat(filteredRow)

      tempRow.forEach((_piece) => newRow.push(_piece))
    }
    let randomPiece = null

    do {
      randomPiece = Math.floor(Math.random() * 16)
      if (newRow[randomPiece] === 0) break
    } while (true)
    newRow[randomPiece] = 2
    setPieces(newRow)
  }

  useEffect(() => {
    const array = Array(16).fill(0)
    const random1 = Math.floor(Math.random() * 8)
    const random2 = Math.floor(Math.random() * 8 + 8)
    array[random1] = 2
    array[random2] = 2
    setPieces(array)
    RNSplashScreen.hide()
  }, [])

  const handleBestScore = async (_score) => {
    await AsyncStorage.setItem('score', JSON.stringify(_score))
    setBestScore(_score)
  }

  const getBestScore = async () => {
    const _bestScore = await AsyncStorage.getItem('score')
    if (_bestScore) setBestScore(JSON.parse(_bestScore))
    else setBestScore(0)
  }

  useEffect(() => {
    if (bestScore === null) getBestScore()
    if (score > bestScore) handleBestScore(score)
  }, [score])

  return (
    <View style={Styles.Container}>
      <View style={Styles.Header}>
        <Text style={Styles.Title}>2048</Text>
        <View style={Styles.Score}>
          <View style={Styles.ScoreBlock}>
            <Text style={Styles.ScorePrimary}>Score</Text>
            <Text style={Styles.ScoreSubbed}>{score}</Text>
          </View>
          <View style={Styles.ScoreBlock}>
            <Text style={Styles.ScorePrimary}>Best</Text>
            <Text style={Styles.ScoreSubbed}>{bestScore}</Text>
          </View>
        </View>
      </View>
      <GestureRecognizer
        style={Styles.GameContainer}
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      >
        {pieces.map((piece, index) => (
          <View
            key={index}
            style={[Styles.Piece, { backgroundColor: pickColor(piece) }]}
          >
            <Text style={[Styles.PieceText]}>{piece === 0 ? '' : piece}</Text>
          </View>
        ))}
      </GestureRecognizer>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Title: {
    color: '#A1887F',
    fontSize: 66,
    fontWeight: '700',
  },
  Score: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScoreBlock: {
    backgroundColor: '#A1887F',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginHorizontal: 5,
    paddingVertical: 9,
    borderRadius: 9,
  },
  ScorePrimary: {
    color: '#fff',
    fontSize: 18,
  },
  ScoreSubbed: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 23,
  },
  GameContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    width: windowWidth,
    height: 400,
  },
  Piece: {
    width: windowWidth / 4,
    height: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PieceText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
  },
})

export default App

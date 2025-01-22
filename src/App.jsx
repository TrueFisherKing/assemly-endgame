import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import './App.css'
import { alphabet, languages, randomWords } from './data.js'

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState(randomWords[Math.floor(Math.random() * randomWords.length)])
  // const currentWord = randomWords[Math.floor(Math.random() * randomWords.length)]
  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const guessCount = languages.length - 1
  const isGameLost = (wrongGuessCount >= guessCount)
  const isGameOver = isGameLost || isGameWon

  function addGuessedLetter(letter) {

    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
    )
  }

  const languageElements = languages.map((language, i) => {
    const { name, backgroundColor, color } = language
    const style = {
      backgroundColor,
      color,
    }
    const isLanguageLost = i < wrongGuessCount

    // const className = clsx("chip", isLanguageLost && "lost")
    return (
      <span
        className={`chip ${isLanguageLost && "lost"}`}
        style={style}
        key={name}
      >
        {name}
      </span>
    )
  })

  const letterElements = currentWord.split("").map((letter, i) => {
    return (
      <span
        className='letter'
        key={`letter-${i}`}
      >
        {guessedLetters.includes(letter) ? letter : ""}
      </span>
    )
  })



  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })


    return (
      <button
        className={className}
        key={`letter-${letter}`}
        onClick={() => { addGuessedLetter(letter) }}
      >
        {letter}
      </button>)
  })
  const gameStatusMessage = isGameWon ? { h2: "You win.", p: "Well done!", className: "game-won" } :
    isGameLost ? { h2: "Game over!", p: "You lose, Better start learning Assembly.", className: "game-lost" } :
      { h2: "", p: "", className: "" }

  function resetGame() {
    setGuessedLetters([])
    setCurrentWord(randomWords[Math.floor(Math.random() * randomWords.length)])
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within {guessCount} attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className={`game-status ${gameStatusMessage.className}`}>
        <h2>{gameStatusMessage.h2}</h2>
        <p>{gameStatusMessage.p}</p>
      </section>

      <section className="language-chips">
        {languageElements}
      </section>
      <section className='word'>
        {letterElements}
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      {isGameOver &&
        <button
          onClick={resetGame}
          className="new-game"
        >
          New Game
        </button>
      }
    </main>
  )
}

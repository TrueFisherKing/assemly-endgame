import { useState } from 'react'
import { clsx } from 'clsx'
import './App.css'
import { languages, alphabet } from './languages.js'

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState('react')
  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  console.log(wrongGuessCount)

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

    // !guessedLetters.includes(letter) && setWrongGuessCount(prevNum => prevNum + 1)
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

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className="game-status">
        <h2>You win.</h2>
        <p>Well done!</p>
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
      <button className="new-game">New Game</button>
    </main>
  )
}

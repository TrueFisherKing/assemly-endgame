import { useState } from 'react'
import './App.css'
import { languages, alphabet } from './languages.js'

function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = useState('Assembly')
  const [attempts, setAttempts] = useState(8)
  const [guessedLetters, setGuessedLetters] = useState([])
  const word = [...currentWord]
  const letterElements = word.map((letter, i) => {
    return (<span className='letter' key={`letter-${i}`}>{letter.toUpperCase()}</span>)
  })

  const chips = languages.map((language) => {
    const { name, backgroundColor, color } = language
    const style = {
      backgroundColor,
      color,
    }
    return <span className='chip' key={name} style={style}>{name}</span>
  })

  function addGuessedLetter(letter) {
    !guessedLetters.includes(letter) && setGuessedLetters(prevGuess => [...guessedLetters, letter])
  }

  const keyBoard = alphabet.map((letter, i) => {
    return <button onClick={() => { addGuessedLetter(letter) }} key={`alphabet-${i}`}>{letter}</button>
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
        {chips}
      </section>
      <section className='word-box'>
        {letterElements}
      </section>
      <section className='keyboard'>
        {keyBoard}
      </section>
      <button className="new-game">New Game</button>
    </main>
  )
}

export default AssemblyEndgame

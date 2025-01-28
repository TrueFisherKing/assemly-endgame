import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import './App.css'
import LanguageChips from './LanguageChips.jsx'
import { alphabet, languages, fareWellData } from './data.js'
import { addGuessedLetter, getFarewellText, getRandomWord } from './gameUtils.js'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  // const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const numGuessesTotal = languages.length - 1
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = (wrongGuessCount >= numGuessesTotal)
  const isGameOver = isGameLost || isGameWon
  const lastGuessedLetter = guessedLetters.at(-1)
  const isLastGuessWrong = !currentWord.includes(lastGuessedLetter)
  let farwellText = ""

  const letterElements = currentWord.split("").map((letter, i) => {
    const revealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
      'letter',
      isGameLost && !guessedLetters.includes(letter) && 'missed-letter'
    )
    return (
      <span
        className={letterClassName}
        key={`letter-${i}`}
      >
        {revealLetter ? letter : ""}
      </span>
    )
  })

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !isCorrect

    if (isGuessed && isLastGuessWrong) {
      farwellText = getFarewellText(languages[wrongGuessCount - 1].name)
    } else {
      // farwellText = ""
    }

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button
        className={className}
        key={`letter-${letter}`}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Guess the letter ${letter}`}
        onClick={() => addGuessedLetter(letter, setGuessedLetters)}
        tabIndex={isGameOver ? -1 : 0}
      >
        {letter}
      </button>)
  })

  const gameStatusMessage = isGameWon
    ? fareWellData.gameWon
    : isGameLost
      ? fareWellData.gameLost
      : farwellText
        ? {
          h2: "",
          p: farwellText,
          className: "farewell-text",
          style: {
            backgroundColor: languages[wrongGuessCount - 1].backgroundColor,
            color: languages[wrongGuessCount - 1].color
          },
        }
        : fareWellData.nothing

  function resetGame() {
    setGuessedLetters([])
    setCurrentWord(getRandomWord())
  }

  const {width, height} = useWindowSize()
  return (
    <main>
      {isGameWon && 
        <Confetti
        width={width - 1}
        height={height -1 }
      />
      }
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within {numGuessesTotal} attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section
        aria-live="polite"
        role="status"
        style={gameStatusMessage.style}
        className={`game-status ${gameStatusMessage.className}`}
      >
        <h2>{gameStatusMessage.h2}</h2>
        <p>{gameStatusMessage.p}</p>
      </section>

      <section className="language-chips">
        <LanguageChips
          wrongGuessCount={wrongGuessCount}
        />
      </section>
      <section className='word'>
        {letterElements}
      </section>
      <section
        className='sr-only'
        aria-live='polite'
        role='status'
      >
        <p>
          {currentWord.includes(lastGuessedLetter) ?
            `Correct! The letter ${lastGuessedLetter}` :
            `Sorry, the letter ${lastGuessedLetter} is not in the word.`
          }
        </p>
        <p>
          {`You have ${numGuessesTotal - wrongGuessCount} attempts left.`}
        </p>
        <p>
          Current word: {currentWord.split("").map(letter =>
            guessedLetters.includes(letter) ? letter + "." : "blank").join(" ")}
        </p>
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>

      {(isGameLost || isGameWon) && (
        <button
          onClick={resetGame}
          className="new-game"
          aria-label="Start a new game"
        >
          New Game
        </button>
      )}
    </main>
  )
}

import { useState, useEffect } from 'react'

function App() {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('')
  const [score, setScore] = useState({ user: 0, computer: 0 })

  const choices = ['rock', 'paper', 'scissors']

  const handleClick = (choice) => {
    setUserChoice(choice)
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  useEffect(() => {
    const checkWinner = () => {
      if (!userChoice || !computerChoice) return

      if (userChoice === computerChoice) {
        setResult('draw')
        return
      }

      if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
      ) {
        setResult('win')
        setScore(prev => ({ ...prev, user: prev.user + 1 }))
      } else {
        setResult('lose')
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }))
      }
    }

    checkWinner()
  }, [userChoice, computerChoice])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Rock Paper Scissors</h1>
      
      <div className="mb-8 text-xl bg-gray-700 px-6 py-3 rounded-lg">
        <span className="text-green-400">You: {score.user}</span>
        <span className="mx-4">vs</span>
        <span className="text-red-400">Computer: {score.computer}</span>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleClick(choice)}
            className="px-6 py-3 bg-blue-600 rounded-lg uppercase font-bold hover:bg-blue-700 transition-colors transform hover:scale-105 active:scale-95"
          >
            {choice}
          </button>
        ))}
      </div>

      {userChoice && computerChoice && (
        <div className="text-center bg-gray-700 p-6 rounded-lg max-w-md w-full">
          <div className="flex justify-around mb-4">
            <div>
              <p className="text-sm mb-2">Your choice</p>
              <p className="text-xl font-bold text-green-400">{userChoice}</p>
            </div>
            <div>
              <p className="text-sm mb-2">Computer's choice</p>
              <p className="text-xl font-bold text-red-400">{computerChoice}</p>
            </div>
          </div>
          <p className="text-2xl font-bold mt-4">
            {result === 'win' && "You win! 🎉"}
            {result === 'lose' && "You lose! 😢"}
            {result === 'draw' && "It's a draw! 🤝"}
          </p>
        </div>
      )}
    </div>
  )
}

export default App 
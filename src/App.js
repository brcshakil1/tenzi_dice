import { useEffect, useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [tenzies, setTenzies] = useState(false);

  const generateNewDice = () => {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    let newDice = [];
    for(let i = 0; i < 10; i ++) {
      // let diceObj = {isHeld: false}
      // diceObj.value = Math.ceil(Math.random() * 6); 
      // newDice.push(diceObj)
      newDice.push(generateNewDice())
    }
    return newDice;
  }
  
  const [dice, setDice] = useState(allNewDice())

  useEffect(()=> {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  const rollDice = () => {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
                die :
                generateNewDice()
      }))
    } else {
      setTenzies(false);
      setDice(allNewDice())
    }
  }

  const holdDice = (id) => {
    setDice(oldDice =>  oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} 
      : die
    })
    )
  }

  const dieElements = dice.map(die =>
       <Die 
          key={die.id}
          value={die.value} 
          isHeld={die.isHeld}
          holdDice={()=> holdDice(die.id)}
        />
        
     )


  return (
    <main>
      {tenzies && <Confetti width="1600px"/>}
      <h1 className='title'>Tenzies</h1>
      <p className="instruction">
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className='dice-container'>
        {dieElements}
      </div>
      <button className='roll' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;

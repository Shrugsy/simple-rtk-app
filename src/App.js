import { useState } from 'react';
import './App.css';
import DebouncedInput from './components/DebouncedInput';
import PokemonItem from './features/pokemon/PokemonItem';

function App() {
  const [name, setName] = useState("bulbasaur");

  console.log('[App]')

  return (
    <div className="App">
      <header className="App-header">
        <DebouncedInput value={name} onChange={setName} />
        <PokemonItem name={name} />
      </header>
    </div>
  );
}

export default App;

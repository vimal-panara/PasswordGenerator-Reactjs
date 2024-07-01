
import { useState, useCallback, useEffect, useRef } from 'react'
import CheckBoxButton from './components/CheckBoxButton';

function App() {

  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [specialCharsAllowed, setSpecialCharsAllowed] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numbersAllowed) {
      str += "0123456789";
    }

    if (specialCharsAllowed) {
      str += "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
    }

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndex)
    }

    setPassword(pass);
    setCopyButtonText('Copy');
    console.log(pass);
  }, [length, numbersAllowed, specialCharsAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, specialCharsAllowed])

  //useRef hook
  const passwordRef = useRef<HTMLInputElement>(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopyButtonText('Copied!')
  }, [password])

  return (
    <>
      <div className='w-full max-w-xl px-4 py-3 mx-auto my-8 text-orange-700 bg-gray-800 rounded-lg shadow-md'>
        <h1 className='my-4 text-3xl text-center text-white'>Password Generator</h1>
        <div className='flex my-4 overflow-hidden rounded-lg shadow'>
          <input 
            type="text" 
            value={password}
            className='w-full px-3 py-1 outline-none'
            placeholder='Password'
            id="generatedPassword"
            ref={passwordRef}
            readOnly
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' id="passwordCopyButton">
            {copyButtonText}
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(Number(e.target.value))}}
              id="password"
            />
            <label htmlFor="password">Length: {length}</label>
          </div>
          {/* <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={numbersAllowed}
              id="numberInput"
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Number Included</label>
          </div> */}
          <CheckBoxButton buttonLabel="Include Number" buttonKey="numbersAllowed" checked={numbersAllowed} setChecked={setNumbersAllowed} />
          {/* <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={specialCharsAllowed}
              id="charsAllowedInput"
              onChange={() => setSpecialCharsAllowed((prev) => !prev)}
            />
            <label htmlFor="charsAllowedInput">Special Characters Included</label>
          </div> */}
          <CheckBoxButton buttonLabel="Include Special Characters" buttonKey="specialCharsAllowed" checked={specialCharsAllowed} setChecked={setSpecialCharsAllowed} />
        </div>
      </div>
    </>
  )
}

export default App

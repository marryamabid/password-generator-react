import React, { useEffect, useRef } from "react";
import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowedNumber, setAllowedNumber] = useState(false);
  const [allowedCharacter, setAllowedCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef=useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowedNumber) str += "0123456789";
    if (allowedCharacter) str += "@#$%^&*()_+{}[]|:;<>,.?/~";
    // let numberValues=
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str[char];
    }
    setPassword(pass);
  }, [length, allowedNumber, allowedCharacter, setPassword]);

  const copytoclipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, allowedNumber, allowedCharacter,passwordGenerator])

  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 bg-gray-800 text-white">
        <h1 className="text-2xl font-semibold text-center mb-4">Password Generator</h1>
        <div
          className="flex items-center shadow-md rounded-lg overflow-hidden mb-6 bg-amber-100">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-l-lg focus:ring-2 focus:ring-blue-500"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copytoclipboard}
            className="bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-all hover:bg-blue-600">
            Copy
          </button>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-x-2">
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label  className="text-gray-300" >Length: {length}</label>
      </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={allowedNumber}
              id="numberInput"
              
              onChange={() => {
                setAllowedNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-gray-300">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={allowedCharacter}
              id="characterInput"
              onChange={() => {
                setAllowedCharacter((prev) => !prev);
              }}
              
            />
           <label htmlFor="characterInput" className="text-gray-300">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

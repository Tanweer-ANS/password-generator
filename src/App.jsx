import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20) //for mobile devices

    window.navigator.clipboard.writeText(password)
    alert('Password copied to clipboard!')
  }, [password])

  //password generator function
  const passwordGenerator = useCallback(() => {
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    if(numAllowed) str+='0123456789'
    if(charAllowed) str+='!@#$%^&*_+:;?><,./-='

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length + 1)
      pass +=str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
   <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-amber-100"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:border-zinc-50 hover:bg-blue-950 transition duration-100 outline-1 active:bg-indigo-600'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={4}
              max={36}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1' >
            <input 
              type="checkbox" 
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
          
        </div>
      </div>
   </>
  )

}

export default App

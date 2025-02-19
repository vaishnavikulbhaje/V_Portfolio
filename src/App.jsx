import { useState } from 'react'
import './index.css'
import './App.css'
import Home1  from './Home1'
import Home2  from './Home2'

import Home3  from './Home3'
import Home4 from './Home4'

import Home6 from './Home6'


import Serve from './Serve'
import Mhome from './Mhome'

function App() {
  const [count, setCount] = useState(0) 

  return (
    <>
    
    <div><Home1/></div>
      
      <Home2/>
      <Serve/>
    
      <Home3/>
      <Home4/>
      <Mhome/>
     
    
      <Home6/>

     
    

    </>
  )
}

export default App

import './App.css'
import Landing from './components/landing'
import Navbar from './components/navbar'
import Signin from './components/signin';





function App() {
  return (
    <>
      <div className='min-h-screen overflow-hidden relative flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-pink-400 to-pink-950'>
        <Navbar />
        <Landing/>
        <Signin />
      </div>
    </>
  )
}

export default App

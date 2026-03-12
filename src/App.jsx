import './App.css'
import RewardsCard from './components/common/RewardsCard'
import ScrollToTop from './components/common/ScrollToTop'
import WhatsAppButton from './components/common/WhatsAppButton'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
    
     
          <AppRoutes />
          <WhatsAppButton />
         <RewardsCard/>
      <ScrollToTop/>
    </>
  )
}

export default App

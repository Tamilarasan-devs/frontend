import './App.css'
import ScrollToTop from './components/common/ScrollToTop'
import WhatsAppButton from './components/common/WhatsAppButton'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
    
     
          <AppRoutes />
          <WhatsAppButton />
        
      <ScrollToTop/>
    </>
  )
}

export default App

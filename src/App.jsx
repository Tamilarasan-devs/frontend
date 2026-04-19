import './App.css'
import RewardsCard from './components/common/RewardsCard'
import ScrollToTop from './components/common/ScrollToTop'
import WhatsAppButton from './components/common/WhatsAppButton'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <AppRoutes />
      <WhatsAppButton />
      <RewardsCard/>
      <ScrollToTop/>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App

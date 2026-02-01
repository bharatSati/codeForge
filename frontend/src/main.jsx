import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RatedDataProvider } from './context/ratedDataContext.jsx'
import { TopicDataProvider } from './context/topicDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <RatedDataProvider>
  
  <TopicDataProvider>
  
        <App />
  
  </TopicDataProvider>
        
  </RatedDataProvider>
    
  
)

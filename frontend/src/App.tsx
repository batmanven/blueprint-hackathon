import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import SchemeMatcherPage from './pages/SchemeMatcherPage';
import SchemeResultPage from './pages/SchemeResultPage';
import BillAnalysisPage from './pages/BillAnalysisPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ChatWidget from './components/chat/ChatWidget';
import MedicineOptimizerPage from './pages/MedicineOptimizerPage';
import MedicineResultPage from './pages/MedicineResultPage';
import ExpensePlannerPage from './pages/ExpensePlannerPage';
import ExpenseResultPage from './pages/ExpenseResultPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmergencyFundPage from './pages/EmergencyFundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { LanguageProvider } from './lib/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/schemes" element={<SchemeMatcherPage />} />
                <Route path="/schemes/result" element={<SchemeResultPage />} />
                <Route path="/bill-analysis" element={<BillAnalysisPage />} />
                <Route path="/medicines" element={<MedicineOptimizerPage />} />
                <Route path="/medicines/result" element={<MedicineResultPage />} />
                <Route path="/expenses" element={<ExpensePlannerPage />} />
                <Route path="/expenses/result" element={<ExpenseResultPage />} />
                <Route path="/emergency" element={<EmergencyFundPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Route>
            </Routes>
          </main>
          <Toaster position="top-center" richColors />
          <ChatWidget />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

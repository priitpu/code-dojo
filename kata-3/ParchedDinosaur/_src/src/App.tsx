import Layout from './components/layout/Layout';
import { FarmContextProvider } from './contexts/farm-context/FarmContext';

function App() {
  return (
    <FarmContextProvider>
      <Layout />
    </FarmContextProvider>
  );
}

export default App;

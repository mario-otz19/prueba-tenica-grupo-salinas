import StoreProvider from './context/store/StoreState';
import Navigation from './routes/Navigation';

function App() {
  return (
    <StoreProvider>
      <Navigation />
    </StoreProvider>
  );
}

export default App;
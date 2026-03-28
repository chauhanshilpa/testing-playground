import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import TestingPlayground from './TestingPlayground';

function App() {

  return (
    <MantineProvider>
     <TestingPlayground/>
    </MantineProvider>
  )
}

export default App

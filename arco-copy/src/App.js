import './App.css';
import { useState } from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import { GlobalContext } from './context';
import { BrowserRouter } from 'react-router-dom';
import RenderRouter from './routers/index';
import './index.css';
import './styles/common.scss';
import './styles/reset.css';

function App() {
  const [lang, setLang] = useState('zh-CN');
  const [theme, setTheme] = useState('light');
  const contextVal = {
    lang,
    setLang,
    theme,
    setTheme,
  };
  return (
    <div className="app-container">
      <ConfigProvider>
        <GlobalContext.Provider value={contextVal}>
          <BrowserRouter basename="/">
            <RenderRouter />
          </BrowserRouter>{' '}
        </GlobalContext.Provider>{' '}
      </ConfigProvider>{' '}
    </div>
  );
}

export default App;

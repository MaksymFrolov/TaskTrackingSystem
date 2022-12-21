import React, { FC, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './components/AppRouter';
import { useActions } from './hooks/useActions';
import { AuthActionCreators } from './store/reduce/auth/action-creators';
import { useTypedSelector } from './hooks/useTypedSelector';

const App: FC = () => {
  const {isLoading, isAuth} = useTypedSelector(t=>t.auth)
  const { auth } = useActions(AuthActionCreators)
  useEffect(() => {
    auth()
  }, [])
  return (<>
    {!isLoading&&
  <AppRouter/>
    }
    </>
  )
}

export default App;

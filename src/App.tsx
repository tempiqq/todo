import { useEffect } from 'react';

import { MainContainer } from './ui/MainContainer';
import { Container } from './ui/Container';

import { TodoMainBlock } from './components/TodoMainBlock';
import { Header } from './components/Header/Header';
import { ErrorNotification } from './components/ErrorNotification';

import { useTodoStore } from './store/useTodoStore';

export const App = () => {
  const { loadTodos } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <MainContainer>
      <Container>
        <Header />
        <TodoMainBlock />
      </Container>

      <ErrorNotification />
    </MainContainer>
  );
};

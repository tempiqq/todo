import { MainContainer } from './ui/MainContainer';
import { Container } from './ui/Container';

import { TodoMainBlock } from './components/TodoMainBlock';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';

export const App = () => {
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

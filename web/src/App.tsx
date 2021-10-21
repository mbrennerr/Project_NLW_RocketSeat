import { useContext } from 'react';
import styles from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/auth';


export function App() {
  const { user } = useContext(AuthContext)

  return (
    // VERIFICA LOGIN E ADICIONA UM PLANO DE FUNDO PARA QAUNDO O USUÁRIO ESTEJA LOGADO;
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList/>
      {/* SE O USUÁRIO NÃO FOR NULO EXIBE O FORMULÁRIO DE MENSAGEM SE FOR NULO EXIBE O LOGINBOX */}
      { !!user ? <SendMessageForm/> : <LoginBox/>}
    </main>
  )
}



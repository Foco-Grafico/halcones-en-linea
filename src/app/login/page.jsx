import { LoginForm } from './components/login-button'
import styles from './styles.module.css'

export default function Login () {
  return (
    <main
      className={`w-screen h-screen flex flex-col p-10  gap-4 overflow-hidden ${styles['main-container']}`}
    >
      <div className='w-full h-24 flex flex-row justify-between gap-2 items-center p-4 '>
        <img src='/img/logo-itesus.png' className=' h-24' alt='Itesus Logo' />
      </div>
      <section className='flex flex-col text-white justify-center text-2xl items-center py-48 '>
        <LoginForm />
      </section>
    </main>
  )
}

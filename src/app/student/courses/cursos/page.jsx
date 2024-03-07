import Modal from '../../components/students/modal'
import { ModalButton } from './open-modal-button'

export default function Cursos () {
  return (
    <main className='flex flex-col w-full  h-full overflow-hidden gap-5'>
      <div className='flex flex-row justify-between px-10 items-center'>
        <div className='text-white'>
          <p className='underline text-xl'>Fecha de inicio</p>
          <p className='px-5'>15 de Octubre</p>
        </div>
        <ModalButton
          modalNumber={1}
        >
          Inscribirse
        </ModalButton>
      </div>
      <div className='bg-white h-[0.05rem] px-20 flex flex-col rounded-xl' />
      <div className='gap-5 flex flex-col p-10 h-full'>
        <div className='text-white'>
          <p className='underline text-xl'>Diplomado en Marketing de Contenidos: Impulsa tu Estrategia Digital</p>
          <p className=''>Párrafo descriptivo</p>
        </div>
      </div>
      <div className='bg-white h-[0.05rem] px-20 flex flex-col rounded-xl' />

      <Modal modalNumber={1}>
        <div className='bg-white rounded-lg py-5 gap-10 w-1/3'>
          <h2 className='flex flex-col w-full bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white text-center'><p>¿Seguro que deseas inscribirte al curso?</p></h2>
          <div className='flex flex-row justify-around gap-5 py-3'>
            <ModalButton modalNumber={2} className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg'>SI</ModalButton>
            <ModalButton actionType='close' className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg'>NO</ModalButton>
          </div>
        </div>
      </Modal>
      <Modal modalNumber={2}>

        <div className='bg-white rounded-lg py-5 gap-10 w-1/3'>
          <h2 className='flex flex-col w-full bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white text-center'> <p>Gracias por inscribirte, sigue los pasos que se te enviaron por correo.</p></h2>
          <div className='flex flex-row justify-around gap-5 py-3'>
            <ModalButton
              actionType='close'
              className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg'
            >Aceptar
            </ModalButton>
          </div>
        </div>

      </Modal>
    </main>
  )
}
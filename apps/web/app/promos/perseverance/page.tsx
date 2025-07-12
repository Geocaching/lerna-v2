export const dynamic = 'force-static'

export const PerseverancePromo = () => (
  <div
    className={
      'flex flex-col items-center justify-start min-h-screen bg-white w-full'
    }
  >
    <div
      data-testid={'rover-explorer'}
      id={'rover-explorer'}
      className='flex justify-center bg-size-[400px] w-full max-w-full'
    >
      Hello, world!
    </div>
  </div>
)

export default PerseverancePromo

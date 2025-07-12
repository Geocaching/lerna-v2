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
      className="flex justify-center bg-[url('https://gs-strapi.s3.us-east-1.amazonaws.com/Topographic_Pattern_Tiling_op35_d47c7e78ef.png')] bg-size-[400px] w-full max-w-[85vw] sm:max-w-full"
    >
      Hello, world!
    </div>
  </div>
)

export default PerseverancePromo

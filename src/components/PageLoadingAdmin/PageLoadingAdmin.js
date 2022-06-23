import StarFall from '../StarFall/StarFall'
import ContainerLayout from '../Container/ContainerLayout'

const PageLoadingAdmin = () => {
  return (
    <ContainerLayout>
      <StarFall />
      <div className="flex h-screen items-center justify-center bg-black-2">
        <div className="animate-pulse">
          <p className="py-4 text-center text-4xl font-bold uppercase tracking-wider text-primary">
            Blockchain Global Day
          </p>
        </div>
      </div>
    </ContainerLayout>
  )
}

export default PageLoadingAdmin

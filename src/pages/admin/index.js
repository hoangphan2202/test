import { listItemHomeAdmin } from 'constants/index'
import AdminCard from 'modules/admin/components/AdminCard'

const Admin = () => {
  return (
    <div className="px-3">
      <h1 className="text-2xl font-bold">Admin</h1>

      <div className="mt-10 grid max-w-xl grid-cols-2 gap-5">
        {listItemHomeAdmin.map((item, index) => (
          <AdminCard
            title={item.title}
            hrefTitle={item.hrefTitle}
            subTitle={item.subTitle}
            hrefSubTitle={item.hrefSubTitle}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Admin

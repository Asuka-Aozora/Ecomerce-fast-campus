import React from 'react'
import { Button } from '../ui/button'
import { IoAdd, IoCart, IoPerson, IoPricetag } from 'react-icons/io5'
import { AdminPage } from '../guard/AdminPage';

const SidebarItem = (props) => {
  const { children } = props;

  return (
    <Button
     variant="ghost"
     size="lg"
     className="w-full rounded-none justify-start"
    >
      {children}
    </Button>
  )
}

const AdminLayout = (props) => {
  const {title, description, rightSection, children} = props;
  return (
    <AdminPage>
      <div className='flex'>
        <aside className='w-72 border-r h-screen'>
          <div className='h-16 flex-col flex items-center justify-center border-b'>
              <h1 className='font-semibold text-3xl'>Admin Dashboard</h1>
          </div>

          <div className='flex flex-col space-u-0 py-4'>
            <SidebarItem>
              <IoPricetag className='h-6 w-6 mr-4'/>
              Product Management
            </SidebarItem>
            <SidebarItem>
              <IoCart className='h-6 w-6 mr-4'/>
              Orders Management
            </SidebarItem>
          </div>
        </aside>

        <div className='flex-1'>
          <header className='h-16 border-b w-full flex justify-end items-center px-8'>
            <Button className="rounded-full" size="icon">
              <IoPerson className='h-6 w-6'/>
            </Button>
          </header>

          <main className='flex flex-col p-4'>
            <div className='flex justify-between items-center pb-4 border-b mb-8'>
              <div>
                <h1 className='font-bold text-4xl'>{title}</h1>
                <p className='text-muted-foreground'>{description}</p>
              </div>

              {rightSection}
            </div>
            
            {children}
          </main>
        </div>
      </div>
    </AdminPage>
  )
}

export default AdminLayout

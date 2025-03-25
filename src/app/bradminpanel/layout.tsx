import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { DashSidebar } from './_components/dash-sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashSidebar />
      <SidebarInset>
        <div className='p-5'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

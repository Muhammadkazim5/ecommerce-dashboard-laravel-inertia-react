import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

const stats= [
    {
        label: 'Categories',
        value: '0',
        helper: 'Ready For category CRUD',
    },
    {
        label: 'Products',
        value: '0',
        helper: 'Total products in inventory',
    },
    {
        label: 'Orders',
        value: '0',
        helper: 'Coming later',
    }
]
export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
               <section>
                 <p className='text-sm font-medium text-muted-foreground'>Admin Panel</p>
                 <h1 className='mt-1 text-2xl font-semibold tracking-tight'>Ecommerce Dashboard</h1>
                 <p className='mt-2 max-w-2xl text-sm text-muted-foreground'>Manage categories , products and store activity from one authenticated dashboard.</p>
                </section>
                <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                 {
                     stats.map((stat) => (
                         <div key={stat.label} className="rounded-lg border bg-card p-4">
                             <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                             <h2 className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</h2>
                             <p className="mt-2 text-sm text-muted-foreground">{stat.helper}</p>
                         </div>
                     ))
                 }
                </section>
                <section className='rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border'>
                 <h2 className="text-lg font-semibold">Next admin modules</h2>
                 <div className='mt-4 grid gap-4 md:grid-cols-2'>
                     <div className='rounded-lg border border-sidebar-border/70 bg-muted p-4 dark:border-sidebar-border'> 
                         <h3 className='font-medium'>Category management</h3>
                         <p className="mt-1 text-sm text-muted-foreground">CRUD operations for product categories, including name, description, and image management.</p>
                     </div>
                     <div className='rounded-lg border border-sidebar-border/70 bg-muted p-4 dark:border-sidebar-border'>
                         <h3 className='font-medium'>Product management</h3>
                         <p className="mt-1 text-sm text-muted-foreground">CRUD operations for products, including name, description, price, stock, and category assignment.</p>
                     </div>
                 </div>
                </section>
             </div>
         </>
     );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

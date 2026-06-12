import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Stat = {
    label: string;
    value: number | string;
    helper: string;
};

type Category = {
    id: number;
    name: string;
};

type RecentProduct = {
    id: number;
    name: string;
    slug: string;
    price: string;
    stock: string;
    image_url: string | null;
    category: Category | null;
    status: boolean;
};

type PageProps = {
    stats: Stat[];
    recentProducts: RecentProduct[];
};

export default function Dashboard() {
    const { stats, recentProducts } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <section>
                    <p className="text-sm font-medium text-muted-foreground">Admin Panel</p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">Ecommerce Dashboard</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Manage categories, products and store activity from one authenticated dashboard.
                    </p>
                </section>

                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border bg-card p-4">
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{stat.helper}</p>
                        </div>
                    ))}
                </section>

                <section className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Recent Products</h2>
                    {recentProducts.length === 0 ? (
                        <p className="mt-4 text-sm text-muted-foreground">No products yet.</p>
                    ) : (
                        <div className="mt-4 overflow-hidden rounded-lg border">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Image</th>
                                        <th className="px-4 py-3 font-medium">Name</th>
                                        <th className="px-4 py-3 font-medium">Category</th>
                                        <th className="px-4 py-3 font-medium">Price</th>
                                        <th className="px-4 py-3 font-medium">Stock</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {recentProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-4 py-3">
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="h-10 w-10 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                                                        N/A
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium">{product.name}</div>
                                                {product.slug && (
                                                    <div className="mt-1 text-xs text-muted-foreground">{product.slug}</div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {product.category?.name ?? 'No category'}
                                            </td>
                                            <td className="px-4 py-3">${product.price}</td>
                                            <td className="px-4 py-3">{product.stock}</td>
                                            <td className="px-4 py-3">
                                                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                                                    {product.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Next admin modules</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-sidebar-border/70 bg-muted p-4 dark:border-sidebar-border">
                            <h3 className="font-medium">Category management</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                CRUD operations for product categories, including name, description, and image management.
                            </p>
                        </div>
                        <div className="rounded-lg border border-sidebar-border/70 bg-muted p-4 dark:border-sidebar-border">
                            <h3 className="font-medium">Product management</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                CRUD operations for products, including name, description, price, stock, and category assignment.
                            </p>
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

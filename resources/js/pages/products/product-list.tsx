import { Button } from "@/components/ui/button";
type Category = {
  id: number,
  name: string
}
type Product={
    id:number;
    name:string;
    slug:string;
    status:boolean;
    stock:string
    description:string | null;
    price:string;
    image_url:string | null;
    category:Category | null;
    category_id:number
 }
type Props={
    products:Product[];
    onEdit:(product:Product)=>void;
    onDelete:(product:Product)=>void;
}
const ProductList = ({ products, onEdit, onDelete }: Props) => {
  return (
    <section className="rounded-xl border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
<h2 className="text-lg font-semibold">Category List</h2>
<div className="mt-5 overflow-hidden rounded-lg border">
{
    products.length === 0 ? (
        <p className="p-4 text-center text-sm text-gray-500">No categories found.</p>
):(
    <table className="w-full text-left text-sm">
        <thead className="bg-muted text-muted-foreground">
            <tr>
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
        </thead>
        <tbody className="divide-y"> 
            {products.map((product) => (
                <tr key={product.id}>
                    <td className="px-4 py-3">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded object-cover" />
                        ) : (
                            <span className="text-xs text-muted-foreground">No image</span>
                        )}
                    </td>
                    <td className="px-4 py-3">
                        <div className="font-medium">{product.name}</div>
                        {product.slug && <div className="mt-1 text-xs text-muted-foreground">{product.slug}</div>}
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
                    <td className="px-4 py-2">
                        <div className="flex justify-end gap-2">

                        <Button
                        type="button"
                        variant="outline"
                        tabIndex={6 + product.id * 2}
                        data-test={`edit-category-${product.id}`}
                            onClick={() => onEdit(product)}
                        >
                            Edit
                        </Button>
                        <Button
                         type="button"
                         variant="destructive"
                         tabIndex={7 + product.id * 2}
                         data-test={`delete-category-${product.id}`}
                            onClick={() => onDelete(product)}
                        >
                            Delete
                        </Button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)
}
</div>
    </section>
  )
}

export default ProductList
import { Button } from "@/components/ui/button";

type Category={
    id:number;
    name:string;
    slug:string;
    status:boolean;
    description:string | null;
    created_at:string | null;
}
type Props={
    categories:Category[];
    onEdit:(category:Category)=>void;
    onDelete:(category:Category)=>void;
}
const CategoryList = ({ categories, onEdit, onDelete }: Props) => {
  return (
    <section className="rounded-xl border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
<h2 className="text-lg font-semibold">Category List</h2>
<div className="mt-5 overflow-hidden rounded-lg border">
{
    categories.length === 0 ? (
        <p className="p-4 text-center text-sm text-gray-500">No categories found.</p>
):(
    <table className="w-full text-left text-sm">
        <thead className="bg-muted text-muted-foreground">
            <tr>
                <th className="px-4 py-3 font-medium ">Name</th>
                <th className="px-4 py-3 font-medium ">Slug</th>
                <th className="px-4 py-3 font-medium ">Status</th>
                <th className="px-4 py-3 font-medium text-right ">Actions</th>
            </tr>
        </thead>
        <tbody className="divide-y">
            {categories.map((category) => (
                <tr key={category.id}>
                    <td className="px-4 py-3">
                        <div className="font-medium">
                        {category.name}
                        </div>
                        <div>

                    {
                        category.description && <td className="mt-1 text-xs text-muted-foreground">{category.description}</td>
                    }
                        </div>
                        </td>
                    <td className="px-4 py-3 text-muted-foreground" >{category.slug}</td>
                    <td className="px-4 py-3">
                            <span className=" rounded-fullbg-muted px-2 py-1 text-xs">
                                {category.status ? 'Active' : 'Inactive'}
                            </span>
                    </td>
                    <td className="px-4 py-2">
                        <div className="flex justify-end gap-2">

                        <Button
                        type="button"
                        variant="outline"
                        tabIndex={6 + category.id * 2}
                        data-test={`edit-category-${category.id}`}
                            onClick={() => onEdit(category)}
                        >
                            Edit
                        </Button>
                        <Button
                         type="button"
                         variant="destructive"
                         tabIndex={7 + category.id * 2}
                         data-test={`delete-category-${category.id}`}
                            onClick={() => onDelete(category)}
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

export default CategoryList
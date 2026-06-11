import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useRef, useState } from 'react';

type Category = {
    id: number;
    name: string;
    slug: string;
    status: boolean;
    description: string;
    created_at: string;
};

type CategoryForm = {
    name: string;
    slug: string;
    status: boolean;
    description: string;
};
type Props = {
    categories: Category[];
    message: string;
};
const emptyForm: CategoryForm = {
    name: '',
    slug: '',
    description: '',
    status: true,
};
const Categories = ({ categories, message }: Props) => {
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null,
    );
    const nameInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, put, processing, errors, reset } =
        useForm<CategoryForm>(emptyForm);
    function resetForm() {
        reset();
        (setEditingCategory(null),
            setTimeout(() => nameInputRef.current?.focus(), 0));
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (editingCategory) {
            put('/categories' + editingCategory.id, {
                onSuccess: resetForm,
            });
            post('/categories', {
                onSuccess: resetForm,
            });
        }
    }
    function handleEdit(category: Category) {
        setEditingCategory(category);
        setData({
            name: category.name,
            slug: category.slug,
            description: category.description ?? '',
            status: category.status,
        });
        setTimeout(() => nameInputRef.current?.focus(), 0);
    }
    function handleDelete(category: Category) {
        if (!confirm('Delete ' + category.name + '?')) {
            return;
        }
        router.delete('/categories/' + category.id);
    }
    return (
        <>
            <Head title="Categories" />
            <div className="flex h-full flex-col gap-6 rounded-xl p-4">
                <section>
                    <p className="text-sm font-medium text-muted-foreground">
                        Catalog
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Category Management
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Create, update, and remove ecommerce categories with
                        Inertia forms.
                    </p>
                    {message && (
                        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {message}
                        </div>
                    )}
                    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
                        <section className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
                            <h2 className="text-lg font-semibold">
                                {editingCategory
                                    ? 'Edit category '
                                    : 'Create Category'}
                            </h2>
                            <form
                                className="mt-5 grid gap-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        ref={nameInputRef}
                                        autoFocus
                                        tabIndex={1}
                                        value={data.name}
                                        onChange={(event) =>
                                            setData('name', event.target.value)
                                        }
                                        placeholder="Laptops"
                                    />
                                    {
                                        errors.name && <p className="text-sm text-red-600">{errors.name}</p>
                                    }
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Slug</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        tabIndex={2}
                                        value={data.slug}
                                        onChange={(event) =>
                                            setData('slug', event.target.value)
                                        }
                                        placeholder="Laptops"
                                    />
                                    {
                                        errors.slug && <p className="text-sm text-red-600">{errors.slug}</p>
                                    }
                                </div>
                            </form>
                        </section>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Categories;

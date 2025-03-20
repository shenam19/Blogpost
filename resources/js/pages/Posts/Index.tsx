import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { DeletePostButton } from '@/components/DeletePostButton';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

// Update the interface to include the auth user
interface PostsProps {
    posts: {
        id: number;
        title: string;
        content: string;
        created_at: string;
        updated_at: string;
        user_id: number; // Add this to identify the owner
    }[];
    auth: {
        user: {
            id: number;
        };
    };
}

export default function Posts({ posts, auth }: PostsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Blog Posts
                    </h1>
                    <Link
                        href='/posts/create'
                        className='btn px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm font-medium'
                    >
                        Create Post
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-left text-gray-600 text-sm uppercase tracking-wider">
                                <th className="px-6 py-3 border-b border-gray-200">ID</th>
                                <th className="px-6 py-3 border-b border-gray-200">Title</th>
                                <th className="px-6 py-3 border-b border-gray-200">Content</th>
                                <th className="px-6 py-3 border-b border-gray-200">Created At</th>
                                <th className="px-6 py-3 border-b border-gray-200">Updated At</th>
                                <th className="px-6 py-3 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{post.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{post.content}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.created_at}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.updated_at}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                                    {auth.user && auth.user.id === post.user_id && (
                                       <>
                                        <Link
                                            href={`/posts/${post.id}/edit`}
                                            className="p-2 rounded text-blue-600 hover:bg-blue-100 transition-colors"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </Link>


                                        <DeletePostButton postId={post.id} /></>
                                    )}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

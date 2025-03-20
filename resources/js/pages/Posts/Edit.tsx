import { useForm } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface EditProps {
  auth: any;
  post: Post;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Posts',
    href: '/posts',
  },
  {
    title: 'Edit Post',
    href: '/posts/{id}/edit',
  },
];

export default function Edit({ auth, post }: EditProps) {
  const { data, setData, put, processing, errors } = useForm({
    title: post.title,
    content: post.content,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('posts.update', post.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Post" />
      <div className="container mx-auto py-8 px-4">
        <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
              <textarea
                id="content"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all min-h-32"
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                rows={6}
              ></textarea>
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>
            <div className="flex justify-between">
              <Link
                href="/posts"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                disabled={processing}
              >
                {processing ? 'Saving...' : 'Update Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

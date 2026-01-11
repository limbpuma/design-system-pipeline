import { Button } from '@limbpuma/design-system';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Design System Example
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Button Sizes
          </h2>
          <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Button States
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button isLoading>Loading...</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Using CSS Variables
          </h2>
          <p className="text-gray-600 mb-4">
            You can also use CSS variables directly from the design system:
          </p>
          <div
            className="p-4 rounded-md"
            style={{
              backgroundColor: 'var(--color-blue-100)',
              color: 'var(--color-blue-800)'
            }}
          >
            This box uses CSS variables from @limbpuma/design-system
          </div>
        </section>
      </div>
    </main>
  );
}

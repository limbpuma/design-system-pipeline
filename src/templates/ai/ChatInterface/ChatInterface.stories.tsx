import type { Meta, StoryObj } from '@storybook/react';
import { ChatInterface } from './ChatInterface';

const meta: Meta<typeof ChatInterface> = {
  title: 'Templates/AI/ChatInterface',
  component: ChatInterface,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ChatInterface>;

const mockSidebar = (
  <nav className="p-4 space-y-4">
    <div className="font-bold text-lg">AI Assistant</div>
    <button type="button" className="w-full px-3 py-2 text-left rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-sm">
      + New Chat
    </button>
    <div className="space-y-1">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Recent</div>
      <button type="button" className="block w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm truncate">
        Help with React hooks
      </button>
      <button type="button" className="block w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm truncate">
        Design system questions
      </button>
      <button type="button" className="block w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm truncate">
        API integration help
      </button>
    </div>
  </nav>
);

const mockMessages = [
  {
    id: '1',
    role: 'user' as const,
    content: 'How do I create a custom hook in React?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '2',
    role: 'assistant' as const,
    content: `To create a custom hook in React, follow these steps:

1. **Create a function** that starts with "use" (this is a convention that React enforces)
2. **Use other hooks** inside your custom hook as needed
3. **Return values** that your components will need

Here's a simple example:

\`\`\`tsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
\`\`\`

You can then use this hook in any component:

\`\`\`tsx
function Counter() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
\`\`\``,
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
  },
  {
    id: '3',
    role: 'user' as const,
    content: 'Can I use async/await in custom hooks?',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: '4',
    role: 'assistant' as const,
    content: `Yes! You can use async/await in custom hooks, but there's a specific pattern to follow since hooks themselves cannot be async.

Here's how to handle async operations:

\`\`\`tsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
\`\`\`

Key points:
- Define the async function **inside** useEffect
- Handle loading and error states
- Include cleanup if needed for race conditions`,
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
  },
];

const mockSuggestions = [
  { id: '1', text: 'How do I handle errors in custom hooks?', category: 'follow-up' },
  { id: '2', text: 'What are the rules of hooks?', category: 'related' },
  { id: '3', text: 'Show me a useLocalStorage hook example', category: 'example' },
];

export const Default: Story = {
  args: {
    messages: mockMessages,
    inputValue: '',
    sidebar: mockSidebar,
    title: 'AI Assistant',
    placeholder: 'Ask me anything about React...',
    suggestions: mockSuggestions,
    onInputChange: () => {},
    onSubmit: () => {},
    onSuggestionSelect: () => {},
  },
};

export const EmptyState: Story = {
  args: {
    messages: [],
    inputValue: '',
    sidebar: mockSidebar,
    title: 'AI Assistant',
    placeholder: 'Start a conversation...',
    suggestions: [
      { id: '1', text: 'Explain React Server Components', category: 'popular' },
      { id: '2', text: 'How do I optimize performance?', category: 'popular' },
      { id: '3', text: 'Best practices for state management', category: 'popular' },
    ],
    onInputChange: () => {},
    onSubmit: () => {},
    onSuggestionSelect: () => {},
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
    showTypingIndicator: true,
  },
};

export const WithContextPanel: Story = {
  args: {
    ...Default.args,
    showContextPanel: true,
    context: {
      id: 'react-docs',
      title: 'React Documentation',
      description: 'Official React documentation and guides',
    },
    contextPanel: (
      <div className="space-y-4">
        <div className="text-sm">
          <h3 className="font-medium mb-2">Related Topics</h3>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li>• useState Hook</li>
            <li>• useEffect Hook</li>
            <li>• Custom Hooks</li>
            <li>• Rules of Hooks</li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="font-medium mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><button type="button" className="text-blue-600 hover:underline">React Docs</button></li>
            <li><button type="button" className="text-blue-600 hover:underline">Hook API Reference</button></li>
          </ul>
        </div>
      </div>
    ),
    onToggleContextPanel: () => {},
  },
};

export const WithVoiceInput: Story = {
  args: {
    ...Default.args,
    showVoice: true,
    isVoiceActive: false,
    onVoiceToggle: () => {},
  },
};

export const VoiceActive: Story = {
  args: {
    ...Default.args,
    showVoice: true,
    isVoiceActive: true,
    onVoiceToggle: () => {},
  },
};

export const WithAttachment: Story = {
  args: {
    ...Default.args,
    showAttachment: true,
    onAttachment: () => {},
  },
};

export const FullFeatures: Story = {
  args: {
    ...Default.args,
    showVoice: true,
    showAttachment: true,
    showContextPanel: true,
    context: {
      id: 'code-review',
      title: 'Code Review',
      description: 'Analyzing your React code',
    },
    contextPanel: (
      <div className="space-y-3">
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm">
          <div className="font-medium text-green-800 dark:text-green-200">Code Quality</div>
          <div className="text-green-600 dark:text-green-400">Good - 8/10</div>
        </div>
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm">
          <div className="font-medium text-yellow-800 dark:text-yellow-200">Suggestions</div>
          <div className="text-yellow-600 dark:text-yellow-400">2 improvements found</div>
        </div>
      </div>
    ),
    onVoiceToggle: () => {},
    onAttachment: () => {},
    onToggleContextPanel: () => {},
    onClear: () => {},
  },
};

export const DarkMode: Story = {
  args: Default.args,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

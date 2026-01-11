import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar, type SearchSuggestion } from '../components/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Conversational search bar with voice support and suggestions. Designed for AI-first real estate applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'hero', 'minimal'],
      description: 'Visual variant of the search bar',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the search bar',
    },
    showVoice: {
      control: 'boolean',
      description: 'Show voice input button',
    },
    showFiltersButton: {
      control: 'boolean',
      description: 'Show filters/settings button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    isListening: {
      control: 'boolean',
      description: 'Voice recording state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic search bar
export const Default: Story = {
  args: {
    placeholder: 'Search properties...',
    showVoice: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <SearchBar {...args} onSearch={(query) => console.log('Search:', query)} />
    </div>
  ),
};

// Hero variant for landing pages
export const Hero: Story = {
  args: {
    variant: 'hero',
    size: 'lg',
    placeholder: 'Describe your ideal home...',
    showVoice: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <SearchBar {...args} onSearch={(query) => console.log('Search:', query)} />
    </div>
  ),
};

// Minimal variant
export const Minimal: Story = {
  args: {
    variant: 'minimal',
    size: 'sm',
    placeholder: 'Quick search...',
  },
  render: (args) => (
    <div className="w-[300px]">
      <SearchBar {...args} onSearch={(query) => console.log('Search:', query)} />
    </div>
  ),
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <SearchBar size="sm" placeholder="Small search bar" />
      <SearchBar size="md" placeholder="Medium search bar" />
      <SearchBar size="lg" placeholder="Large search bar" />
    </div>
  ),
};

// With voice recording
export const VoiceRecording: Story = {
  args: {
    showVoice: true,
    isListening: true,
    placeholder: 'Listening...',
  },
  render: (args) => (
    <div className="w-[400px]">
      <SearchBar {...args} />
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  args: {
    isLoading: true,
    placeholder: 'Searching...',
  },
  render: (args) => (
    <div className="w-[400px]">
      <SearchBar {...args} />
    </div>
  ),
};

// With suggestions
const exampleSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'apartment with terrace in Madrid', type: 'recent' },
  { id: '2', text: 'house with garden near the center', type: 'recent' },
  { id: '3', text: 'Try: studio under 150k', type: 'example' },
  { id: '4', text: 'Try: penthouse with views', type: 'example' },
];

export const WithSuggestions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true);

    return (
      <div className="w-[500px]">
        <SearchBar
          variant="hero"
          size="lg"
          placeholder="Describe your ideal home..."
          showVoice
          value={value}
          onChange={(e) => setValue(e.target.value)}
          suggestions={exampleSuggestions}
          showSuggestions={showSuggestions}
          onSuggestionSelect={(suggestion) => {
            setValue(suggestion.text);
            setShowSuggestions(false);
          }}
          onSearch={(query) => {
            console.log('Search:', query);
            setShowSuggestions(false);
          }}
        />
        <p className="mt-4 text-sm text-gray-500">
          Focus the input to see suggestions dropdown
        </p>
      </div>
    );
  },
};

// With filters button
export const WithFilters: Story = {
  args: {
    showVoice: true,
    showFiltersButton: true,
    placeholder: 'Search with filters...',
  },
  render: (args) => (
    <div className="w-[400px]">
      <SearchBar
        {...args}
        onSearch={(query) => console.log('Search:', query)}
        onFiltersClick={() => console.log('Open filters')}
      />
    </div>
  ),
};

// Real estate search example
export const RealEstateExample: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = async (searchQuery: string) => {
      setIsSearching(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResults([
        `Found 234 properties matching "${searchQuery}"`,
        'Showing apartments with terrace in Madrid',
        'Price range: 150k - 500k',
      ]);
      setIsSearching(false);
    };

    return (
      <div className="w-[600px] space-y-4">
        <SearchBar
          variant="hero"
          size="lg"
          placeholder="Ex: apartment with terrace in Madrid under 300k"
          showVoice
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          isLoading={isSearching}
          onSearch={handleSearch}
          suggestions={[
            { id: '1', text: 'apartment with terrace in Madrid', type: 'example' },
            { id: '2', text: 'house with garden for family', type: 'example' },
            { id: '3', text: 'bright studio with good transport', type: 'example' },
          ]}
          showSuggestions={!query}
        />

        {results.length > 0 && (
          <div className="p-4 bg-green-50 rounded-lg">
            {results.map((result, i) => (
              <p key={i} className="text-sm text-green-800">
                {result}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  },
};

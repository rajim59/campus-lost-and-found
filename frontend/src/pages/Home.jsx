
import { Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';


const Home = () => {

  const dummyPosts = [
    {
      id: 1,
      type: 'lost',
      itemName: 'Student ID Card',
      location: 'Library',
      date: '2026-08-28',
      author: 'John Doe',
      image: null,
      status: 'open',
    },
    {
      id: 2,
      type: 'found',
      itemName: 'Wallet',
      location: 'Cafeteria',
      date: '2026-08-29',
      author: 'Jane Smith',
      image: null,
      status: 'open',
    },
    {
      id: 3,
      type: 'lost',
      itemName: 'Phone',
      location: 'Academic Building',
      date: '2026-08-30',
      author: 'Robert Johnson',
      image: null,
      status: 'resolved',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-textPrimary">
          Lost something? <span className="text-primary">Find it here.</span>
        </h1>
        <p className="mt-2 text-textSecondary">
          A trusted space for the university community to reunite lost items with their owners.
        </p>
        <div className="mt-6 max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for ID cards, wallets, phones..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-surface shadow-card focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
        </div>
      </div>

      {/* Trust indicators */}
      <div className="flex justify-center space-x-6 text-sm text-textSecondary mb-8">
        <span>✅ Verified students only</span>
        <span>📦 120+ items recovered</span>
        <span>📍 10 campus locations</span>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Lost', 'Found', 'ID Card', 'Wallet', 'Phone', 'Book', 'Key'].map((cat) => (
          <button
            key={cat}
            className="px-4 py-1.5 rounded-full border border-border bg-surface text-sm text-textPrimary hover:bg-background"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyPosts.map((post) => (
          <div
            key={post.id}
            className="bg-surface border border-border rounded-card shadow-card hover:shadow-card-hover transition-all overflow-hidden"
          >
            {/* Image placeholder */}
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <span className="text-textSecondary text-sm">No image</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={post.type === 'lost' ? 'lost' : 'found'}>
                  {post.type === 'lost' ? 'Lost' : 'Found'}
                </Badge>
                {post.status === 'resolved' && (
                  <Badge variant="resolved">Resolved</Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold text-textPrimary">{post.itemName}</h3>
              <p className="text-sm text-textSecondary mt-1">
                📍 {post.location} · 📅 {post.date}
              </p>
              <div className="flex items-center mt-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                  {post.author.charAt(0)}
                </div>
                <span className="ml-2 text-sm text-textSecondary">{post.author}</span>
              </div>
              <Button variant="secondary" size="sm" fullWidth className="mt-3">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
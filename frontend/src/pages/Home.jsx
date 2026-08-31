import { useState, useEffect } from 'react';
import SearchBar from '../components/shared/SearchBar';
import FilterPills from '../components/shared/FilterPills';
import PostCard from '../components/shared/PostCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import { SearchX } from 'lucide-react';

// Temporary dummy data (later replace with API call)
const dummyPosts = [
  {
    _id: '1',
    postType: 'lost',
    itemName: 'Student ID Card',
    location: 'library',
    itemDate: new Date('2026-08-28'),
    images: [],
    status: 'open',
    userId: { fullName: 'Sobuj Ahmed' },
  },
  {
    _id: '2',
    postType: 'found',
    itemName: 'Wallet',
    location: 'cafeteria',
    itemDate: new Date('2026-08-29'),
    images: [],
    status: 'open',
    userId: { fullName: 'Atikul Islam' },
  },
  {
    _id: '3',
    postType: 'lost',
    itemName: 'Phone',
    location: 'academic_building',
    itemDate: new Date('2026-08-30'),
    images: [],
    status: 'resolved',
    userId: { fullName: 'Al Fahim' },
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Simulate data fetch (will be replaced with API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(dummyPosts);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesFilter =
      activeFilter === 'all' ||
      post.postType === activeFilter ||
      post.category === activeFilter;
    const matchesSearch = post.itemName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const filterItems = [
    { value: 'all', label: 'All' },
    { value: 'lost', label: 'Lost' },
    { value: 'found', label: 'Found' },
    { value: 'id_card', label: 'ID Card' },
    { value: 'wallet', label: 'Wallet' },
    { value: 'phone', label: 'Phone' },
    { value: 'book', label: 'Book' },
    { value: 'key', label: 'Key' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-textPrimary">
          Lost something? <span className="text-primary">Find it here.</span>
        </h1>
        <p className="mt-3 text-textSecondary max-w-2xl mx-auto">
          A trusted space for the university community to reunite lost items with their owners.
        </p>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-8"
        />
      </div>

      {/* Trust indicators */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-textSecondary mb-10">
        <span className="flex items-center">
          <span className="mr-1 text-success">✓</span> Verified students only
        </span>
        <span className="flex items-center">
          <span className="mr-1 text-success">✓</span> 120+ items recovered
        </span>
        <span className="flex items-center">
          <span className="mr-1 text-success">✓</span> 10 campus locations
        </span>
      </div>

      {/* Filter Pills */}
      <div className="mb-8">
        <FilterPills
          items={filterItems}
          activeKey={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 text-danger">{error}</div>
      ) : currentPosts.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No posts found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
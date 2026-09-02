import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/shared/SearchBar';
import FilterPills from '../components/shared/FilterPills';
import PostCard from '../components/shared/PostCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import { SearchX } from 'lucide-react';
import { getAllPosts } from '../services/postService';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || 'all';
  const initialPage = parseInt(searchParams.get('page')) || 1;

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  // Update URL when filter/search/page changes
  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (activeFilter !== 'all') params.filter = activeFilter;
    if (currentPage > 1) params.page = currentPage;
    setSearchParams(params);
  }, [searchTerm, activeFilter, currentPage]);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');

        const query = {
          page: currentPage,
          limit: postsPerPage,
        };
        if (searchTerm) query.search = searchTerm;
        if (activeFilter !== 'all') {
          // Determine if filter is type or category
          if (['lost', 'found'].includes(activeFilter)) {
            query.postType = activeFilter;
          } else {
            query.category = activeFilter;
          }
        }

        const data = await getAllPosts(query);
        setPosts(data.posts);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchTerm, activeFilter, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page on new search
  };

  const handleFilterChange = (value) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

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
          onChange={handleSearchChange}
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
          onChange={handleFilterChange}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(postsPerPage)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 text-danger">{error}</div>
      ) : posts.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No posts found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
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
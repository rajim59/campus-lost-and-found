import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TextArea from '../components/ui/TextArea';
import Badge from '../components/ui/Badge';
import { CATEGORIES, LOCATIONS } from '../utils/constants';
import { getPostById, updatePost } from '../services/postService';
import { SERVER_URL } from '../utils/constants';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    location: '',
    itemDate: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    isContactPublic: true,
  });
  const [postType, setPostType] = useState('lost');
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Simulated fetch — later replace with getPostById(id)
        // For now we keep dummy or call API if available
        const data = await getPostById(id); // if API available
        setFormData({
          itemName: data.post.itemName,
          category: data.post.category,
          location: data.post.location,
          itemDate: data.post.itemDate,
          description: data.post.description || '',
          contactEmail: data.post.contactEmail || '',
          contactPhone: data.post.contactPhone || '',
          isContactPublic: data.post.isContactPublic,
        });
        setPostType(data.post.postType);
        setExistingImages(data.post.images || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load post');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    if (newImages.length + files.length > 3 - existingImages.length) {
      setError('Maximum 3 images total');
      return;
    }
    setError('');
    setNewImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('itemName', formData.itemName);
      fd.append('category', formData.category);
      fd.append('location', formData.location);
      fd.append('itemDate', formData.itemDate);
      fd.append('description', formData.description);
      fd.append('contactEmail', formData.contactEmail);
      fd.append('contactPhone', formData.contactPhone);
      fd.append('isContactPublic', String(formData.isContactPublic));
      // append existing images that remain (if backend supports keeping existing)
      existingImages.forEach((img) => fd.append('existingImages', img));
      newImages.forEach((img) => fd.append('images', img));

      await updatePost(id, fd);
      navigate('/my-posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">Edit Post</h1>
        <p className="mt-2 text-textSecondary">Update your post information.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-container p-6 md:p-8">
        {/* Post Type (disabled) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-textPrimary mb-2">Post Type (fixed)</label>
          <Badge variant={postType === 'lost' ? 'lost' : 'found'}>
            {postType === 'lost' ? 'Lost' : 'Found'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2">
            <Input
              label="Item Name *"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <Select
            label="Category *"
            name="category"
            options={CATEGORIES}
            value={formData.category}
            onChange={handleChange}
            required
          />
          <Select
            label="Location *"
            name="location"
            options={LOCATIONS}
            value={formData.location}
            onChange={handleChange}
            required
          />
          <div className="md:col-span-2">
            <Input
              label="Date & Time *"
              type="datetime-local"
              name="itemDate"
              value={formData.itemDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <TextArea
              label="Description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-textPrimary mb-2">Current Images</label>
            <div className="flex gap-3">
              {existingImages.map((img, index) => (
                <div key={index} className="relative h-20 w-20 rounded-card overflow-hidden border border-border">
                  <img src={`${SERVER_URL}/uploads/${img}`} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-1 right-1 p-0.5 bg-white rounded-full shadow"
                  >
                    <X className="h-4 w-4 text-danger" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-textPrimary mb-2">Add New Images</label>
          <div className="border-2 border-dashed border-border rounded-card p-6 text-center hover:bg-background transition-colors">
            <input
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={handleNewImages}
              className="hidden"
              id="new-image-upload"
            />
            <label htmlFor="new-image-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-textSecondary mb-2" />
              <p className="text-sm text-textSecondary">Click to add more images</p>
            </label>
          </div>
          {newPreviews.length > 0 && (
            <div className="flex gap-3 mt-3">
              {newPreviews.map((src, index) => (
                <div key={index} className="relative h-20 w-20 rounded-card overflow-hidden border border-border">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-1 right-1 p-0.5 bg-white rounded-full shadow"
                  >
                    <X className="h-4 w-4 text-danger" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            label="Contact Email"
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
          />
          <Input
            label="Contact Phone"
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
          />
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isContactPublic"
                checked={formData.isContactPublic}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span className="text-sm text-textPrimary">Make contact info public</span>
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-danger mb-4">{error}</p>}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            Update Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
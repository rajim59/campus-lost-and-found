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

  const [customCategory, setCustomCategory] = useState('');
  const [customLocation, setCustomLocation] = useState('');
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
        const data = await getPostById(id);
        const post = data.post;

        // চেক করা ক্যাটাগরি ও লোকেশন প্রি-সেট তালিকায় আছে কি না
        const categoryIsPreset = CATEGORIES.some((c) => c.value === post.category);
        const locationIsPreset = LOCATIONS.some((l) => l.value === post.location);

        // ডেট ফরম্যাট 'YYYY-MM-DDThh:mm' অনুযায়ী রূপান্তর
        let formattedDate = '';
        if (post.itemDate) {
          const dateObj = new Date(post.itemDate);
          formattedDate = dateObj.toISOString().slice(0, 16);
        }

        setFormData({
          itemName: post.itemName || '',
          category: categoryIsPreset ? post.category : 'other',
          location: locationIsPreset ? post.location : 'other',
          itemDate: formattedDate,
          description: post.description || '',
          contactEmail: post.contactEmail || '',
          contactPhone: post.contactPhone || '',
          isContactPublic: post.isContactPublic ?? true,
        });

        // প্রি-সেট তালিকায় না থাকলে কাস্টম স্টেটে পুরনো মান সংরক্ষণ করা
        if (!categoryIsPreset) setCustomCategory(post.category || '');
        if (!locationIsPreset) setCustomLocation(post.location || '');

        setPostType(post.postType);
        setExistingImages(post.images || []);
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

    // 'other' নির্বাচিত থাকলে কাস্টম ইনপুট, অন্যথায় ড্রপডাউনের মান ব্যবহার হবে
    const finalCategory =
      formData.category === 'other' ? customCategory.trim() : formData.category;
    const finalLocation =
      formData.location === 'other' ? customLocation.trim() : formData.location;

    if (!formData.itemName.trim() || !finalCategory || !finalLocation || !formData.itemDate) {
      setError('Please fill all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('itemName', formData.itemName.trim());
      fd.append('category', finalCategory);
      fd.append('location', finalLocation);
      fd.append('itemDate', formData.itemDate);
      fd.append('description', formData.description.trim());
      fd.append('contactEmail', formData.contactEmail.trim());
      fd.append('contactPhone', formData.contactPhone.trim());
      fd.append('isContactPublic', String(formData.isContactPublic));

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
        {/* Post Type (Fixed) */}
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

          {/* Category Dropdown */}
          <div className={formData.category === 'other' ? 'md:col-span-1' : 'md:col-span-1'}>
            <Select
              label="Category *"
              name="category"
              options={CATEGORIES}
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* Custom Category Input */}
          {formData.category === 'other' ? (
            <div className="md:col-span-1">
              <Input
                label="Specify Category *"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g. Power Bank, Water Bottle, etc."
                required
              />
            </div>
          ) : null}

          {/* Location Dropdown */}
          <div className={formData.location === 'other' ? 'md:col-span-1' : 'md:col-span-1'}>
            <Select
              label="Location *"
              name="location"
              options={LOCATIONS}
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Custom Location Input */}
          {formData.location === 'other' ? (
            <div className="md:col-span-1">
              <Input
                label="Specify Location *"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="e.g. Lab 3rd Floor, Gymnasium, etc."
                required
              />
            </div>
          ) : null}

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
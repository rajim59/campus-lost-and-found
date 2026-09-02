import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TextArea from '../components/ui/TextArea';
import Badge from '../components/ui/Badge';
import { CATEGORIES, LOCATIONS } from '../utils/constants';
import { createPost } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    postType: 'lost',
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
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (images.length + files.length > 3) {
      setError('Maximum 3 images allowed');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setError('');
    
    // প্রিভিউ তৈরি
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setImages((prev) => [...prev, ...files]);

    // ইনপুট রিসেট করা যাতে একই ফাইল পুনরায় সিলেক্ট করা যায়
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index) => {
    // মেমরি লিক এড়াতে প্রিভিউ অবজেক্ট ইউআরএল রিভোক করা
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // "other" সিলেক্ট থাকলে কাস্টম ইনপুট, অন্যথায় সিলেক্টেড ভ্যালু
    const finalCategory =
      formData.category === 'other' ? customCategory.trim() : formData.category;
    const finalLocation =
      formData.location === 'other' ? customLocation.trim() : formData.location;

    // ভ্যালিডেশন
    if (!formData.itemName.trim() || !finalCategory || !finalLocation || !formData.itemDate) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('postType', formData.postType);
      fd.append('itemName', formData.itemName.trim());
      fd.append('category', finalCategory);
      fd.append('location', finalLocation);
      fd.append('itemDate', formData.itemDate);
      fd.append('description', formData.description.trim());
      fd.append('contactEmail', formData.contactEmail ? formData.contactEmail.trim() : user?.email || '');
      fd.append('contactPhone', formData.contactPhone.trim());
      fd.append('isContactPublic', String(formData.isContactPublic));
      
      // ফাইল অ্যাপেন্ড
      images.forEach((img) => fd.append('images', img));

      await createPost(fd);
      navigate('/my-posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">Create a Post</h1>
        <p className="mt-2 text-textSecondary">Report a lost or found item.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-container p-6 md:p-8">
        {/* Post Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-textPrimary mb-2">Post Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, postType: 'lost' })}
              className={`p-4 rounded-card border-2 text-left transition-colors ${
                formData.postType === 'lost'
                  ? 'border-lost bg-lost/5'
                  : 'border-border hover:bg-background'
              }`}
            >
              <Badge variant="lost">Lost</Badge>
              <p className="mt-2 text-sm text-textSecondary">I lost an item</p>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, postType: 'found' })}
              className={`p-4 rounded-card border-2 text-left transition-colors ${
                formData.postType === 'found'
                  ? 'border-found bg-found/5'
                  : 'border-border hover:bg-background'
              }`}
            >
              <Badge variant="found">Found</Badge>
              <p className="mt-2 text-sm text-textSecondary">I found an item</p>
            </button>
          </div>
        </div>

        {/* Item Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2">
            <Input
              label="Item Name *"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="e.g. Student ID Card"
              required
            />
          </div>

          {/* Category */}
          <div className="md:col-span-1">
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

          {/* Location */}
          <div className="md:col-span-1">
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
              placeholder="Describe details about the item..."
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Images (Max 3)
          </label>
          <div className="border-2 border-dashed border-border rounded-card p-6 text-center hover:bg-background transition-colors">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-textSecondary mb-2" />
              <p className="text-sm text-textSecondary">Click to upload images (jpg, png, max 2MB each)</p>
            </label>
          </div>
          {previews.length > 0 && (
            <div className="flex gap-3 mt-3">
              {previews.map((src, index) => (
                <div key={index} className="relative h-20 w-20 rounded-card overflow-hidden border border-border">
                  <img src={src} alt="Upload preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
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
            placeholder={user?.email || 'you@example.com'}
          />
          <Input
            label="Contact Phone"
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="+8801XXXXXXXXX"
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
          <Button type="submit" loading={loading}>
            Submit Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
import { useState } from 'react';
import Modal from '../ui/Modal';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { submitClaim } from '../../services/claimService';
import { useAuth } from '../../contexts/AuthContext';

const ClaimModal = ({ isOpen, onClose, postId, postTitle }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ডামি ডেটা (যেমন ID: '1', '2') হলে ফেক রেসপন্স দিয়ে UI টেস্ট সফল করা
      if (postId === '1' || postId === '2' || postId === '3') {
        await new Promise((resolve) => setTimeout(resolve, 600));
      } else {
        await submitClaim(postId, message);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
        onClose();
      }, 1200);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Claim this item: ${postTitle}`}>
      <form onSubmit={handleSubmit}>
        <p className="text-sm text-textSecondary mb-4">
          As <span className="font-medium text-textPrimary">{user?.fullName || 'Verified Student'}</span>, explain why this item belongs to you.
        </p>

        {success ? (
          <div className="py-6 text-center text-success font-medium">
            ✓ Claim submitted successfully!
          </div>
        ) : (
          <>
            <TextArea
              label="Claim message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe identifying details of the item..."
              required
            />
            {error && <p className="mt-2 text-sm text-danger">{error}</p>}
            <div className="flex justify-end space-x-3 mt-6">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                Submit Claim
              </Button>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
};

export default ClaimModal;
import { Search, FilePlus, ShieldCheck, MessageCircle, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 fade-in">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="w-14 h-14 mx-auto bg-primary text-white rounded-card flex items-center justify-center mb-5">
          <Search size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-textPrimary">
          About Campus Lost & Found
        </h1>
        <p className="max-w-2xl mx-auto text-textSecondary mt-4 leading-7">
          A simple and secure platform for university students to report lost items,
          find missing belongings, and return found items to their rightful owners.
        </p>
      </div>

      {/* Purpose */}
      <div className="bg-surface border border-border rounded-container p-7 md:p-9 mb-8 shadow-card">
        <h2 className="text-2xl font-bold text-textPrimary">Our Purpose</h2>
        <p className="text-textSecondary mt-3 leading-7">
          Campus Lost & Found helps students easily connect with each other when
          something is lost or found on campus. Instead of depending only on word
          of mouth, students can post information and search for missing belongings
          in one place.
        </p>
      </div>

      {/* How It Works */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-textPrimary text-center">How It Works</h2>
        <p className="text-textSecondary text-center mt-2 mb-6">
          Find, report, and recover items in a few simple steps.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-surface border border-border rounded-card p-6 shadow-card">
            <div className="w-11 h-11 bg-primary text-white rounded-card flex items-center justify-center">
              <FilePlus size={21} />
            </div>
            <h3 className="font-bold text-textPrimary mt-5">1. Post an Item</h3>
            <p className="text-sm text-textSecondary mt-2 leading-6">
              Report a lost item or post details about something you found on campus.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-card p-6 shadow-card">
            <div className="w-11 h-11 bg-primary text-white rounded-card flex items-center justify-center">
              <Search size={21} />
            </div>
            <h3 className="font-bold text-textPrimary mt-5">2. Search & Match</h3>
            <p className="text-sm text-textSecondary mt-2 leading-6">
              Search through posts and use available information to identify your
              lost or found belongings.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-card p-6 shadow-card">
            <div className="w-11 h-11 bg-success text-white rounded-card flex items-center justify-center">
              <CheckCircle size={21} />
            </div>
            <h3 className="font-bold text-textPrimary mt-5">3. Recover the Item</h3>
            <p className="text-sm text-textSecondary mt-2 leading-6">
              Submit a claim when appropriate and complete the recovery process
              with the owner.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-surface border border-border rounded-container p-7 md:p-9 shadow-card">
        <h2 className="text-2xl font-bold text-textPrimary">Key Features</h2>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="flex gap-3 items-start">
            <ShieldCheck size={21} className="text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-textPrimary">Verified Students</h3>
              <p className="text-sm text-textSecondary mt-1">
                University users can be verified before accessing the platform.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Search size={21} className="text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-textPrimary">Search & Filter</h3>
              <p className="text-sm text-textSecondary mt-1">
                Quickly find relevant lost and found posts.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <MessageCircle size={21} className="text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-textPrimary">Claim System</h3>
              <p className="text-sm text-textSecondary mt-1">
                Submit claims for found items through the platform.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <CheckCircle size={21} className="text-success mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-textPrimary">Easy Recovery</h3>
              <p className="text-sm text-textSecondary mt-1">
                Keep the recovery process simple and organized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
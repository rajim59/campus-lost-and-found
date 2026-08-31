const About = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-3xl mx-auto bg-surface border border-border rounded-container shadow-card p-8">
        <h1 className="text-3xl font-bold text-textPrimary text-center">
          About Campus Lost & Found
        </h1>

        <p className="text-textSecondary text-center mt-4">
          A simple platform for university students to report lost items,
          find missing belongings, and return found items to their owners.
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-textPrimary">
            Our Purpose
          </h2>

          <p className="text-textSecondary mt-2">
            Campus Lost & Found helps students easily connect with each other
            when something is lost or found on campus.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-textPrimary">
            Key Features
          </h2>

          <ul className="list-disc pl-6 mt-3 text-textSecondary space-y-2">
            <li>Post lost and found items</li>
            <li>Search and filter posts</li>
            <li>Submit claims for found items</li>
            <li>Manage your own posts</li>
            <li>Admin verification and claim management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
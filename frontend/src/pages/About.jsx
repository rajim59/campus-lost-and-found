import {
  Search,
  FilePlus,
  ShieldCheck,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 mx-auto bg-[#1E3A8A] text-white rounded-xl flex items-center justify-center mb-5">
            <Search size={28} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            About Campus Lost & Found
          </h1>

          <p className="max-w-2xl mx-auto text-[#475569] mt-4 leading-7">
            A simple and secure platform for university students to report
            lost items, find missing belongings, and return found items to
            their rightful owners.
          </p>
        </div>

        {/* Purpose */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-7 md:p-9 mb-8">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Our Purpose
          </h2>

          <p className="text-[#475569] mt-3 leading-7">
            Campus Lost & Found helps students easily connect with each other
            when something is lost or found on campus. Instead of depending
            only on word of mouth, students can post information and search
            for missing belongings in one place.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0F172A] text-center">
            How It Works
          </h2>

          <p className="text-[#475569] text-center mt-2 mb-6">
            Find, report, and recover items in a few simple steps.
          </p>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
              <div className="w-11 h-11 bg-[#1E3A8A] text-white rounded-lg flex items-center justify-center">
                <FilePlus size={21} />
              </div>

              <h3 className="font-bold text-[#0F172A] mt-5">
                1. Post an Item
              </h3>

              <p className="text-sm text-[#475569] mt-2 leading-6">
                Report a lost item or post details about something you found
                on campus.
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
              <div className="w-11 h-11 bg-[#1E3A8A] text-white rounded-lg flex items-center justify-center">
                <Search size={21} />
              </div>

              <h3 className="font-bold text-[#0F172A] mt-5">
                2. Search & Match
              </h3>

              <p className="text-sm text-[#475569] mt-2 leading-6">
                Search through posts and use available information to identify
                your lost or found belongings.
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
              <div className="w-11 h-11 bg-[#16A34A] text-white rounded-lg flex items-center justify-center">
                <CheckCircle size={21} />
              </div>

              <h3 className="font-bold text-[#0F172A] mt-5">
                3. Recover the Item
              </h3>

              <p className="text-sm text-[#475569] mt-2 leading-6">
                Submit a claim when appropriate and complete the recovery
                process with the owner.
              </p>
            </div>

          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-7 md:p-9">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <div className="flex gap-3 items-start">
              <ShieldCheck
                size={21}
                className="text-[#1E3A8A] mt-0.5 shrink-0"
              />
              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Verified Students
                </h3>
                <p className="text-sm text-[#475569] mt-1">
                  University users can be verified before accessing the
                  platform.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Search
                size={21}
                className="text-[#1E3A8A] mt-0.5 shrink-0"
              />
              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Search & Filter
                </h3>
                <p className="text-sm text-[#475569] mt-1">
                  Quickly find relevant lost and found posts.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <MessageCircle
                size={21}
                className="text-[#1E3A8A] mt-0.5 shrink-0"
              />
              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Claim System
                </h3>
                <p className="text-sm text-[#475569] mt-1">
                  Submit claims for found items through the platform.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <CheckCircle
                size={21}
                className="text-[#16A34A] mt-0.5 shrink-0"
              />
              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Easy Recovery
                </h3>
                <p className="text-sm text-[#475569] mt-1">
                  Keep the recovery process simple and organized.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
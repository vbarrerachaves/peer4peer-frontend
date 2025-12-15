import peer4peerLogo from "./assets/peer4peer-logo.png";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Glass container */}
      <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 md:p-12 border border-white/10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-300 mb-1">
            About
          </h1>

          <img
            src={peer4peerLogo}
            alt="Peer4Peer logo"
            className="mx-auto h-20 md:h-24 mt-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
          />

          <p className="text-2xl md:text-2xl font-extrabold text-blue-300 mb-1">
            Advising Platform
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-10 text-lg leading-relaxed text-gray-100">

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold mb-2 text-blue-400">
              Our Mission
            </h2>
            <p>
              Peer4Peer is a lightweight advising request platform designed to
              make academic support more accessible, transparent, and equitable
              for students.
            </p>
          </section>

          {/* Problem */}
          <section>
            <h2 className="text-2xl font-bold mb-2 text-blue-400">
              The Problem We Address
            </h2>
            <p>
              Many students struggle to access timely advising due to long wait
              times, unclear processes, or lack of visibility into request
              status.
            </p>
          </section>

          {/* Equity */}
          <section>
            <h2 className="text-2xl font-bold mb-2 text-blue-400">
              Equity & Access
            </h2>
            <p>
              Peer4Peer promotes equity by providing a clear, centralized, and
              trackable way for students to request academic advising.
            </p>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-bold mb-2 text-blue-400">
              How It Works
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Students</strong> submit advising requests.</li>
              <li><strong>Advisors</strong> review and respond.</li>
              <li>Students track progress in one place.</li>
            </ul>
          </section>

          {/* Why it matters */}
          <section>
            <h2 className="text-2xl font-bold mb-2 text-blue-400">
              Why Peer4Peer Matters
            </h2>
            <p>
              By simplifying communication and increasing transparency,
              Peer4Peer ensures no request goes unnoticed.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

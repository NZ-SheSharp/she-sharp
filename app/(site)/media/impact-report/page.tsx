export const metadata = {
  title: "Impact Report | She Sharp",
  description: "Read about She Sharp's annual impact and achievements in empowering women in STEM.",
};

export default function ImpactReportPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-navy-dark mb-6">
          Impact Report
        </h1>
        <p className="text-xl text-gray mb-12">
          Discover the transformative impact She Sharp has made in empowering women in STEM fields.
        </p>

        <div className="bg-purple-light/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-purple-dark mb-4">
            2024 Annual Impact Report
          </h2>
          <p className="text-navy-dark mb-6">
            Our comprehensive annual report showcases the growth, achievements, and impact of our programs.
          </p>
          <button className="bg-gradient-to-r from-purple-dark to-periwinkle-dark text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Download 2024 Report (PDF)
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-light/20">
            <h3 className="text-xl font-bold text-navy-dark mb-3">
              Key Achievements
            </h3>
            <ul className="space-y-2 text-gray">
              <li>• 2200+ active members in our community</li>
              <li>• 84+ events organized since 2014</li>
              <li>• 50+ corporate sponsors supporting our mission</li>
              <li>• 150+ successful mentorship matches</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-light/20">
            <h3 className="text-xl font-bold text-navy-dark mb-3">
              Program Highlights
            </h3>
            <ul className="space-y-2 text-gray">
              <li>• THRIVE: Career development program launch</li>
              <li>• Google Educator Conference success</li>
              <li>• Expanded mentorship program</li>
              <li>• New podcast series launch</li>
            </ul>
          </div>
        </div>

        <div className="bg-mint-light border border-mint-dark rounded-lg p-8">
          <h3 className="text-2xl font-bold text-navy-dark mb-4">
            Looking Ahead
          </h3>
          <p className="text-navy-dark">
            As we move forward, She Sharp remains committed to expanding our reach and impact. 
            Our goals for the coming year include launching new initiatives, expanding our mentorship 
            program, and creating more opportunities for women to thrive in STEM careers.
          </p>
        </div>
      </div>
    </div>
  );
}
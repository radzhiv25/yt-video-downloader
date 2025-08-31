export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            This YouTube video downloader is provided for educational and personal use only. 
            Please ensure you comply with all applicable laws and YouTube&apos;s Terms of Service.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notes:</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6">
            <li>Only download videos you have permission to download</li>
            <li>Respect copyright laws and intellectual property rights</li>
            <li>Do not use this tool for commercial purposes without proper licensing</li>
            <li>We are not responsible for any misuse of this tool</li>
          </ul>
          
          <p className="text-gray-600">
            By using this service, you agree to use it responsibly and in accordance with 
            all applicable laws and regulations.
          </p>
        </div>
      </div>
    </div>
  )
} 
// Contact.jsx
export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">Questions? Reach out at hello@novacart.dev</p>
      <form className="space-y-3" onSubmit={e => { e.preventDefault(); alert("Message sent (demo)"); }}>
        <input placeholder="Your name" className="w-full border rounded-lg px-3 py-2" required />
        <input type="email" placeholder="Email" className="w-full border rounded-lg px-3 py-2" required />
        <textarea placeholder="Message" rows="4" className="w-full border rounded-lg px-3 py-2" required />
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Send</button>
      </form>
    </div>
  );
}
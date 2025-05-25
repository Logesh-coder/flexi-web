'use client'
import Input from '@/components/ui/Input';
import { MessageCircle, Phone, Send, Tag, User } from 'lucide-react';
import { useState } from 'react';

const page: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    category: '',
                    message: ''
                });
            }, 3000);
        }, 1500);
    };

    return (
        <div className=' flex items-center justify-center px-4 pt-[80px]' >
            <div className="bg-white rounded-xl border dark:bg-black border-gray-300 w-[400px] p-6 sticky top-6" >
                <div className="flex items-center mb-6">
                    <MessageCircle className="text-primary-600 mr-3" size={24} />
                    <h2 className="text-2xl font-bold ">Help & Support</h2>
                </div>

                {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <h3 className="text-green-800 font-medium text-lg mb-2">Thank you for your message!</h3>
                        <p className="text-green-700">We've received your request and will get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                label="Name"
                                name="name"
                                icon={User}
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Mobile"
                                name="mobile"
                                type="number"
                                icon={Phone}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your contact number"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Subject"
                                name="subject"
                                icon={Tag}
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="Subject of your message"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium dark:text-gray-300  text-gray-700 mb-1">Message</label>
                            <textarea
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border dark:bg-gray-700 border-gray-300 rounded-lg focus:outline-none transition-all focus:ring-2 focus:ring-primary-500 focus:border-primary-500 "
                                placeholder="Type your message here..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 flex items-center justify-center rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-primary-500 hover:bg-primary-700'
                                } text-white font-medium transition-colors`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send size={18} className="mr-2" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default page;

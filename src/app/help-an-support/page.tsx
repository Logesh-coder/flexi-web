'use client';

import Input from '@/components/ui/Input';
import HelpAnSupportCreate from '@/services/help-an-support-create';
import { MessageCircle, Phone, Send, Tag, User } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormValues = {
    name: string;
    mobile: string;
    subject: string;
    message: string;
};

const Page: React.FC = () => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            await HelpAnSupportCreate(data);
            toast.success('Support request submitted successfully!');
            reset();
        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast.error('Failed to submit. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center px-4 pt-[80px]">
            <div className="bg-white rounded-xl border dark:bg-black border-gray-300 w-[400px] p-6 sticky top-6">
                <div className="flex items-center mb-6">
                    <MessageCircle className="text-primary-600 mr-3" size={24} />
                    <h2 className="text-2xl font-bold">Help & Support</h2>
                </div>

                {isSubmitSuccessful ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <h3 className="text-green-800 font-medium text-lg mb-2">Thank you for your message!</h3>
                        <p className="text-green-700">We've received your request and will get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-4">
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <Input
                                        label="Name"
                                        icon={User}
                                        placeholder="Your name"
                                        {...field}
                                        error={errors.name?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-4">
                            <Controller
                                name="mobile"
                                control={control}
                                rules={{
                                    required: 'Mobile number is required',
                                    pattern: {
                                        value: /^[0-9]{10,15}$/,
                                        message: 'Enter a valid mobile number',
                                    }
                                }}
                                render={({ field }) => (
                                    <Input
                                        label="Mobile"
                                        icon={Phone}
                                        type="tel"
                                        placeholder="Your mobile number"
                                        {...field}
                                        error={errors.mobile?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-4">
                            <Controller
                                name="subject"
                                control={control}
                                rules={{ required: 'Subject is required' }}
                                render={({ field }) => (
                                    <Input
                                        label="Subject"
                                        icon={Tag}
                                        placeholder="Subject of your message"
                                        {...field}
                                        error={errors.subject?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-6">
                            <Controller
                                name="message"
                                control={control}
                                rules={{ required: 'Message is required' }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">Message</label>
                                        <textarea
                                            {...field}
                                            rows={4}
                                            className="w-full px-3 py-2 border dark:bg-gray-700 border-gray-300 rounded-lg focus:outline-none transition-all focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Type your message here..."
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                        )}
                                    </div>
                                )}
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
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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

export default Page;

'use client'
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  FaPlay,
  FaMousePointer,
  FaPalette,
  FaQuestionCircle,
  FaTimes,
  FaComment
} from 'react-icons/fa';
import { FiSmartphone, FiMonitor } from 'react-icons/fi';
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  MainContainer
} from '@chatscope/chat-ui-kit-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from 'axios';
import { supportChatService } from './chatPost';

export default function BuilderSupport() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async (messageText) => {

    try {
      setIsLoading(true)
      const response = await supportChatService(messageText)
      console.log(response, 'this is the post message response')
      // Add user message
      const userMessage = {
        message: messageText,
        sentTime: new Date().toISOString(),
        sender: 'user'
      };

      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      // // Add AI response
      const aiMessage = {
        message: response,
        sentTime: new Date().toISOString(),
        sender: 'Gemini'
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    } catch (err) {
      setError('Sorry, there was an error connecting to the chat service');
    } finally {
      setIsLoading(false);
    }
  };
  const faqs = [
    {
      q: "How do I create my shop?",
      a: `Step 1: Go to our website and click "Sign Up".
Step 2: Fill in your business details and create an account.
Step 3: Log in to your dashboard.
Step 4: Follow the shop setup wizard to complete the initial configuration.`,
    },
    {
      q: "How do I use the builder?",
      a: `Step 1: In your dashboard, go to the "Builder" tab.
Step 2: Choose a section to edit (like header, banner, products, etc.).
Step 3: Use drag-and-drop tools to add or remove components.
Step 4: Click "Save" or "Publish" to make your changes live.`,
    },
    {
      q: "How do I upload products?",
      a: `Step 1: Go to the "Products" section in your dashboard.
Step 2: Click the "Add New Product" button.
Step 3: Enter the product name, description, and price.
Step 4: Upload product images and click "Save".`,
    },
    {
      q: "How is my shop responsive?",
      a: `Step 1: Design your shop using the builder.
Step 2: All design elements automatically adjust to screen sizes.
Step 3: You can preview how it looks on mobile, tablet, and desktop using the device switcher in the builder.`,
    },
    {
      q: "How do I buy templates?",
      a: `Step 1: Navigate to the "Template Store" from your dashboard.
Step 2: Browse available templates and preview them.
Step 3: Click "Buy Now" on your selected template.
Step 4: Complete the payment and apply it to your shop.`,
    },
  ];
  return (
    <div className="min-h-screen container mx-auto bg-white">
      {/* Chat Dialog */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-blue-50 rounded-t-xl">
            <h3 className="text-lg font-semibold text-blue-800">Builder Support Chat</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaTimes />
            </button>
          </div>

          <MainContainer className="flex flex-col max-h-[calc(100vh-14rem)] overflow-y-auto">
            <ChatContainer className="flex-1 flex flex-col min-h-0"> {/* Key change here */}
              {/* Processing Indicator */}
              {isLoading && (
                <div className="sticky top-0 z-10 bg-white/90 p-2 text-sm text-gray-500 flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2 text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </div>
              )}

              <MessageList
                className="flex-1 overflow-y-auto"  // Added overflow here
                scrollBehavior="smooth"
                loading={false}
                loadingMore={false}
              >
                {messages.map((msg, index) => (
                  <Message
                    key={index}
                    className='w-full'
                    model={{
                      message: msg.message,
                      sentTime: msg.sentTime,
                      sender: msg.sender,
                      direction: msg.sender === 'user' ? 'outgoing' : 'incoming',
                      position: 'single'
                    }}
                  >
                    {msg.sender === 'Gemini' && (
                      <Avatar src="/chatbot-avatar.png" name="AI Assistant" />
                    )}
                  </Message>
                ))}
              </MessageList>

              <MessageInput
                placeholder="Type your builder questions here..."
                value={newMessage}
                onChange={setNewMessage}
                onSend={handleSend}
                disabled={isLoading}
                attachButton={false}
                sendButton={true}
                className="border-t border-gray-200 sticky bottom-0 bg-white"
              />
            </ChatContainer>
          </MainContainer>

          {error && (
            <div className="text-red-500 p-2 text-sm bg-red-50">{error}</div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-EthioBack bg-clip-text text-transparent">
            Master Your Online Store Builder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning digital storefronts with our intuitive drag-and-drop builder
          </p>

          {/* Video Tutorial */}
          <div className="w-[70%] mx-auto mb-6 rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/your-video-id"
                title="Builder Tutorial"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Builder Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaMousePointer className="w-8 h-8 text-blue-600" />,
                title: "Drag & Drop Interface",
                desc: "Easily arrange elements with intuitive visual controls"
              },
              {
                icon: <FaPalette className="w-8 h-8 text-purple-600" />,
                title: "Custom Themes",
                desc: "Choose from 50+ professional templates"
              },
              {
                icon: <FiSmartphone className="w-8 h-8 text-green-600" />,
                title: "Mobile Optimization",
                desc: "Real-time mobile preview and editing"
              },
              {
                icon: <FiMonitor className="w-8 h-8 text-orange-600" />,
                title: "Dashboard Access",
                desc: "Manage products, orders, and analytics"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Create Your Store in 4 Simple Steps
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {['1. Choose Template', '2. Customize Design', '3. Add Products', '4. Publish'].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-600">
                  {[
                    'Select from professional templates',
                    'Modify colors, layout, and content',
                    'Upload products with inventory details',
                    'Go live with one click'
                  ][idx]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center">
                    <FaQuestionCircle className="w-5 h-5 text-blue-600 mr-2" />
                    {faq.q}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 whitespace-pre-line">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 bg-gradient-to-r from-green-800 via-yellow-400 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Personalized Help?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our support team is ready to assist you with any builder questions
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowChat(!showChat)}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 flex items-center transition-all"
            >
              <FaPlay className="mr-2" /> Live Chat
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-all">
              Schedule Call
            </button>
          </div>
        </div>
      </section>
      <div className="fixed bottom-6 right-6">

        <button
          onClick={() => setShowChat(!showChat)}
          className="bg-orange-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Support Chat"
        >
          <FaComment className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

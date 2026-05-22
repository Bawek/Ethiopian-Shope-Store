import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CustomerFooter = () => {
    const date = new Date()
    return (
        <footer className="site-footer py-10 mt-12 dark:bg-black dark:text-white">
            <div className="footer-container max-w-screen-xl mx-auto px-5">
                <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="footer-section">
                        <h3 className="text-blue-400 mb-4">About Us</h3>
                        <p className="leading-6">Your Trusted Online Shopping Destination. Committed to Quality and Customer Satisfaction.</p>
                        <div className="trust-badges mt-5">
                            <img src="ssl-secure.png" alt="SSL Secure" className="h-10 mr-3" />
                            <img src="payment-options.png" alt="Payment Options" className="h-10" />
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div className="footer-section">
                        <h3 className="text-blue-400 mb-4">Customer Service</h3>
                        <ul className="list-none p-0">
                            <li><Link className='no-underline' href="/contact"><span className="text-black hover:text-blue-400 leading-8">Contact Us</span></Link></li>
                            <li><Link className='no-underline' href="/faq"><span className="text-black hover:text-blue-400 leading-8">FAQ</span></Link></li>
                            <li><Link className='no-underline' href="/shipping"><span className="text-black hover:text-blue-400 leading-8">Shipping & Returns</span></Link></li>
                            <li><Link className='no-underline' href="/track-order"><span className="text-black hover:text-blue-400 leading-8">Track Order</span></Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="footer-section">
                        <h3 className="text-blue-400 mb-4">Policies</h3>
                        <ul className="list-none p-0">
                            <li><Link className='no-underline' href="/privacy"><span className="text-black hover:text-blue-400 leading-8">Privacy Policy</span></Link></li>
                            <li><Link className='no-underline' href="/terms"><span className="text-black hover:text-blue-400 leading-8">Terms of Service</span></Link></li>
                            <li><Link className='no-underline' href="/cookie"><span className="text-black hover:text-blue-400 leading-8">Cookie Policy</span></Link></li>
                            <li><Link className='no-underline' href="/accessibility"><span className="text-black hover:text-blue-400 leading-8">Accessibility</span></Link></li>
                        </ul>
                    </div>

                    {/* Social & Newsletter */}
                    <div className="footer-section">
                        <h3 className="text-blue-400 mb-4">Stay Connected</h3>
                        <div className="social-links mb-5">
                            <Link className='no-underline' href="#"><span className="text-black hover:text-blue-400 mr-4"><i className="fab fa-facebook"></i></span></Link>
                            <Link className='no-underline' href="#"><span className="text-black hover:text-blue-400 mr-4"><i className="fab fa-instagram"></i></span></Link>
                            <Link className='no-underline' href="#"><span className="text-black hover:text-blue-400 mr-4"><i className="fab fa-twitter"></i></span></Link>
                            <Link className='no-underline' href="#"><span className="text-black hover:text-blue-400"><i className="fab fa-linkedin"></i></span></Link>
                        </div>

                        <form >
                            <input type="email" placeholder="Enter your email" className="rounded-md border-gray-400 w-full" />
                            <Button className="w-full mt-2">Subscribe</Button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom w-full border-t border-gray-300 mt-10 pt-5 text-center">
                    <p className="m-0">&copy; {new Date().getFullYear()} E-commerce platform. All rights reserved.</p>
                    <div className="payment-methods mt-4">
                        <i className="fab fa-cc-visa text-xl mx-1"></i>
                        <i className="fab fa-cc-mastercard text-xl mx-1"></i>
                        <i className="fab fa-cc-paypal text-xl mx-1"></i>
                        <i className="fab fa-cc-apple-pay text-xl mx-1"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default CustomerFooter;

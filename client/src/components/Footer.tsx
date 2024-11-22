import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-burntorange w-full text-white py-8 rounded-t-lg">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="text-lg font-bold mb-4">About Us</h4>
                    <p className="text-sm">
                        Your go-to platform for anytime, anywhere food delivery. We bring delicious meals right to your doorstep!
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-4">Contact</h4>
                    <p className="flex items-center text-sm mb-2">
                        <Mail className="mr-2" />
                        support@swigato.com
                    </p>
                    <p className="flex items-center text-sm">
                        <Phone className="mr-2" />
                        +91 - 12345 67890
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <Link to="/facebook" className="flex items-center text-sm hover:text-gray-300">
                            <Facebook className="mr-2" />
                            Facebook
                        </Link>
                        <Link to="/twitter" className="flex items-center text-sm hover:text-gray-300">
                            <Twitter className="mr-2" />
                            Twitter
                        </Link>
                        <Link to="/instagram" className="flex items-center text-sm hover:text-gray-300">
                            <Instagram className="mr-2" />
                            Instagram
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-xs border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} Swigato. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

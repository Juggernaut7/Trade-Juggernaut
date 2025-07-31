 
 import React from 'react';
 import { Twitter, Linkedin, Github } from 'lucide-react'; // Example icons
 
 function Footer() {
   const currentYear = new Date().getFullYear();
 
   return (
     <footer className="bg-juggernaut-medium text-juggernaut-text-muted py-8 px-4 border-t border-juggernaut-light">
       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
         {/* Copyright Section */}
         <div className="mb-4 md:mb-0">
           <p>&copy; {currentYear} Trade Juggernaut. All rights reserved.</p>
           <p className="text-sm mt-1">Empowering your crypto journey with AI insights.</p>
         </div>
 
         {/* Navigation Links */}
         <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
           <a href="#" className="hover:text-juggernaut-accent-1 transition-colors">Privacy Policy</a>
           <a href="#" className="hover:text-juggernaut-accent-1 transition-colors">Terms of Service</a>
           <a href="#" className="hover:text-juggernaut-accent-1 transition-colors">Contact Us</a>
           <a href="#" className="hover:text-juggernaut-accent-1 transition-colors">FAQ</a>
         </div>
 
         {/* Social Media Icons */}
         <div className="flex space-x-4">
           <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
             <Twitter className="h-6 w-6 text-juggernaut-text-light hover:text-juggernaut-accent-1 transition-colors" />
           </a>
           <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
             <Linkedin className="h-6 w-6 text-juggernaut-text-light hover:text-juggernaut-accent-1 transition-colors" />
           </a>
           <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
             <Github className="h-6 w-6 text-juggernaut-text-light hover:text-juggernaut-accent-1 transition-colors" />
           </a>
         </div>
       </div>
     </footer>
   );
 }
 
 export default Footer;
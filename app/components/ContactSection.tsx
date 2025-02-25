"use client";

import React, { useRef, useState } from "react";
import { Mail, Github, BookOpen, Twitter, Linkedin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID || "";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("Failed to send message. Try again later."));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      text: "Send me a mail",
      icon: Mail,
      href: "mailto:sharmasanskar004@gmail.com",
    },
    {
      text: "View my work on Github",
      icon: Github,
      href: "https://github.com/SharmaSanskar",
    },
    {
      text: "Read my blogs on Medium",
      icon: BookOpen,
      href: "https://sharmasanskar.medium.com/",
    },
    {
      text: "Follow me on Twitter",
      icon: Twitter,
      href: "https://twitter.com/sharma__sanskar",
    },
    {
      text: "Connect with me on Linkedin",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sharma-sanskar/",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="relative min-h-[80vh] p-4 md:p-8"
      ref={sectionRef}
      id="contact"
    >
      {/* Desktop title */}
      <div className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 items-center">
        <div className="transform rotate-90 text-4xl tracking-widest font-bold flex items-center gap-3">
          <h1 className="font">CONTACT</h1>
          <div className="w-12 h-1 bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4"></div>
        </div>
      </div>

      {/* Mobile title */}
      <div className="md:hidden text-center my-4">
        <h1 className="text-3xl font-bold tracking-widest">CONTACT</h1>
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-12 h-1 bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left side - Social Links */}
          <div className="space-y-6 md:space-y-8">
            <motion.h2
              className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              Lets Connect!
            </motion.h2>
            <motion.div
              className="space-y-4 md:space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-fontPrimary hover:text-fontSecondary hover:font-bold transition-colors duration-300"
                  variants={linkVariants}
                  whileHover={{ x: 10 }}
                >
                  <div className="w-9 h-9 rounded-full bg-accentPurple2 flex items-center justify-center">
                    <link.icon size={20} />
                  </div>
                  <span>{link.text}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right side - Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-fontPrimary"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 bg-accentPurple1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 bg-accentPurple1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full p-3 bg-accentPurple1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
              <motion.button
                type="submit"
                className="w-full p-3 bg-accentPurple2 rounded-md hover:bg-accentPurple3 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
              {status && <p className="text-sm mt-2 text-center">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

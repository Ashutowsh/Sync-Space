"use client"
import SyncSpaceLogo from '@/components/Header/Logo';
import { Button } from '@/components/ui/button';
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-700 mt-4">{description}</p>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <nav className="bg-white shadow-lg pt-3">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <SyncSpaceLogo />
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Get Started
          </Button>
        </div>
      </nav>

      <section className="text-center py-16 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900">
          Collaborate, Innovate, and Create with Sync Space
        </h1>
        <p className="text-gray-700 mt-4 text-lg">
          Your one-stop solution for organizing, creating, and sharing ideas and data with your team.
        </p>
        <Button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600">
          Get Started
        </Button>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <FeatureCard
            title="Seamless Authentication"
            description="Effortlessly manage access and security, allowing you to focus on collaboration."
          />
          <FeatureCard
            title="Organized Workspaces"
            description="Neatly organize your projects and ideas in different workspaces within your organization."
          />
          <FeatureCard
            title="Beautiful Document Editors"
            description="Create and manage documents with our user-friendly and visually pleasing editors."
          />
          <FeatureCard
            title="AI-Powered Insights"
            description="Generate insights and information with the power of AI, directly within your workspace."
          />
          <FeatureCard
            title="Notifications & Commenting"
            description="Collaborate effectively with real-time notifications and document-specific commenting."
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Shield, Award, Users, Clock, CheckCircle, Heart, Target, Eye } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Happy Patients', value: '50,000+' },
    { icon: Award, label: 'Years Experience', value: '10+' },
    { icon: Shield, label: 'Accuracy Rate', value: '99.9%' },
    { icon: Clock, label: 'Tests Completed', value: '2,00,000+' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centric Care',
      description: 'We put our patients first, ensuring comfort, convenience, and quality care at every step.'
    },
    {
      icon: Shield,
      title: 'Accuracy & Reliability',
      description: 'NABL-certified lab with state-of-the-art equipment ensuring 99.9% accurate results.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Continuously adopting latest technology and methods to improve healthcare delivery.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear pricing, honest communication, and transparent processes in all our services.'
    }
  ];

  const team = [
    {
      name: 'Dr. Rimjhim Rani',
      role: 'Chief Pathologist & Founder',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Leading pathologist with 15+ years of experience in diagnostic medicine.'
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Senior Lab Director',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Expert in clinical biochemistry and quality assurance with international certifications.'
    },
    {
      name: 'Ms. Priya Sharma',
      role: 'Operations Manager',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Ensuring smooth operations and exceptional customer service across all locations.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-6">
            About The LABs
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Leading the way in pathology services across Patna with a commitment to accuracy, 
            convenience, and patient care. Your health is our priority.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-medical-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</div>
              <div className="text-secondary-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-secondary-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-secondary-700 leading-relaxed">
              <p>
                Founded in 2014, The LABs began with a simple mission: to make quality healthcare 
                accessible to everyone in Patna. What started as a small diagnostic center has grown 
                into the region's most trusted pathology service provider.
              </p>
              <p>
                We pioneered home collection services in Bihar, understanding that convenience 
                shouldn't compromise quality. Our NABL-certified laboratory processes thousands 
                of samples daily with unwavering accuracy and reliability.
              </p>
              <p>
                Today, we serve over 50,000 patients annually across Patna, from Kankarbagh to 
                Boring Road, Rajendra Nagar to Danapur, bringing world-class diagnostic services 
                right to your doorstep.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Modern laboratory"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-primary-600">NABL</div>
              <div className="text-sm text-secondary-600">Certified Lab</div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-secondary-900 mb-4">Our Values</h3>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              The principles that guide everything we do at The LABs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="text-xl font-bold text-secondary-900 mb-3">{value.title}</h4>
                <p className="text-secondary-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-secondary-900 mb-4">Meet Our Team</h3>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your health and well-being
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-secondary-50 rounded-2xl p-8 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-bold text-secondary-900 mb-2">{member.name}</h4>
                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                <p className="text-secondary-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-br from-primary-50 to-medical-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">Certifications & Accreditations</h3>
            <p className="text-secondary-600">
              Our commitment to quality is validated by leading healthcare organizations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-bold text-secondary-900 mb-2">NABL Accredited</h4>
              <p className="text-sm text-secondary-600">National Accreditation Board for Testing and Calibration Laboratories</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-medical-600" />
              </div>
              <h4 className="font-bold text-secondary-900 mb-2">ISO 15189 Certified</h4>
              <p className="text-sm text-secondary-600">International standard for medical laboratories</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success-600" />
              </div>
              <h4 className="font-bold text-secondary-900 mb-2">CAP Certified</h4>
              <p className="text-sm text-secondary-600">College of American Pathologists accreditation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
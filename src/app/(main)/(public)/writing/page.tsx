import Link from "next/link";

import {
  Award,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  PenTool,
  Star,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WritingServicesPage() {
  const services = [
    {
      title: "CV Writing",
      description:
        "Professional CV writing that highlights your skills, experience, and achievements to land your dream job.",
      icon: <FileText className="h-8 w-8" />,
      features: [
        "ATS-Optimized",
        "Industry-Specific",
        "Professional Format",
        "Unlimited Revisions",
      ],
      link: "/writing/cv",
      popular: true,
    },
    {
      title: "Statement of Purpose (SOP)",
      description:
        "Compelling SOPs that showcase your academic goals, research interests, and career aspirations.",
      icon: <GraduationCap className="h-8 w-8" />,
      features: [
        "University-Specific",
        "Research-Focused",
        "Personal Story",
        "Academic Excellence",
      ],
      link: "/writing/sop",
      popular: false,
    },
    {
      title: "Cover Letters",
      description:
        "Persuasive cover letters that complement your CV and demonstrate your fit for the role.",
      icon: <Mail className="h-8 w-8" />,
      features: [
        "Job-Specific",
        "Company Research",
        "Skills Matching",
        "Professional Tone",
      ],
      link: "/writing/letter",
      popular: false,
    },
    {
      title: "Essay Writing",
      description:
        "Academic and application essays that demonstrate critical thinking and writing excellence.",
      icon: <PenTool className="h-8 w-8" />,
      features: [
        "Academic Standards",
        "Original Content",
        "Proper Citations",
        "Topic Research",
      ],
      link: "/writing/essay",
      popular: false,
    },
    {
      title: "Travel Itinerary",
      description:
        "Detailed travel itineraries for visa applications and trip planning with all necessary documentation.",
      icon: <MapPin className="h-8 w-8" />,
      features: [
        "Visa-Compliant",
        "Detailed Planning",
        "Cost Breakdown",
        "Booking Assistance",
      ],
      link: "/writing/itinerary",
      popular: false,
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Documents Written",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: <Award className="h-5 w-5" />,
    },
    {
      number: "48hrs",
      label: "Average Delivery",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      number: "100+",
      label: "Happy Clients",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  const testimonials = [
    {
      name: "Nabin Dhami",
      role: "Software Engineer",
      content:
        "Their CV writing service helped me land interviews at top tech companies. Highly professional!",
      rating: 5,
    },
    {
      name: "Babita  Kumari",
      role: "Graduate Student",
      content:
        "The SOP they wrote for me was exceptional. Got accepted to my dream university!",
      rating: 5,
    },
    {
      name: "Srishti Tater",
      role: "Marketing Manager",
      content:
        "Professional, timely, and exactly what I needed. Will definitely use their services again.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="px-4 py-20">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Professional Writing Services
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            Expert Writing Services for Your
            <span className="block text-blue-600">Career Success</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            From CVs and SOPs to cover letters and travel itineraries, we
            provide professional writing services that help you achieve your
            academic and career goals.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 flex justify-center">{stat.icon}</div>
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Writing Services
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Professional writing solutions tailored to your specific needs and
              requirements
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                className="relative border-0 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                {service.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="mb-2 flex items-center space-x-3">
                    <div>{service.icon}</div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={service.link}>
                    <Button className="w-full">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Writing Process
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              A streamlined process to deliver high-quality writing services
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We discuss your requirements and goals",
              },
              {
                step: "2",
                title: "Research",
                description: "We research and gather relevant information",
              },
              {
                step: "3",
                title: "Writing",
                description: "Our experts craft your document professionally",
              },
              {
                step: "4",
                title: "Delivery",
                description: "We deliver and provide revisions if needed",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {process.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

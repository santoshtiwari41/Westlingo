"use client";

import { useRouter } from "next/navigation";

import {
  Award,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  MapPin,
  Plane,
  Shield,
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

export default function VisaServicesPage() {
  const router = useRouter();
  const touristVisaFeatures = [
    "Complete Documentation Assistance",
    "Travel Itinerary Planning",
    "Hotel Booking Support",
    "Financial Statement Guidance",
    "Interview Preparation",
    "Application Tracking",
    "Multiple Country Options",
    "Fast Processing Available",
  ];

  const afterOfferVisaFeatures = [
    "Student Visa Processing",
    "Work Permit Applications",
    "Document Verification",
    "University Liaison",
    "Employer Communication",
    "Visa Interview Coaching",
    "Post-Arrival Support",
    "Family Visa Assistance",
  ];

  const countries = [
    { name: "USA", flag: "🇺🇸", popular: true },
    { name: "Canada", flag: "🇨🇦", popular: true },
    { name: "UK", flag: "🇬🇧", popular: true },
    { name: "Australia", flag: "🇦🇺", popular: true },
    { name: "Germany", flag: "🇩🇪", popular: false },
    { name: "France", flag: "🇫🇷", popular: false },
    { name: "Netherlands", flag: "🇳🇱", popular: false },
    { name: "New Zealand", flag: "🇳🇿", popular: false },
  ];

  const successStats = [
    {
      number: "98%",
      label: "Visa Approval Rate",
      icon: <Award className="h-5 w-5" />,
    },
    {
      number: "2000+",
      label: "Successful Applications",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      number: "50+",
      label: "Countries Covered",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: <Star className="h-5 w-5" />,
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Free Consultation",
      description:
        "Discuss your travel plans and visa requirements with our experts",
    },
    {
      step: "2",
      title: "Document Preparation",
      description: "We help you gather and prepare all required documents",
    },
    {
      step: "3",
      title: "Application Submission",
      description: "Submit your application with complete documentation",
    },
    {
      step: "4",
      title: "Follow-up & Support",
      description: "Track your application and provide ongoing support",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50">
            Professional Visa Services
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Expert Visa Consultation
            <span className="mt-2 block text-blue-600">Services</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            Professional visa consultation services for tourist and post-offer
            visas. We handle the complex paperwork so you can focus on your
            journey.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Free Consultation
            </Button>
            <Button size="lg" variant="outline">
              View Our Services
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {successStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-3 flex justify-center text-blue-600">
                  {stat.icon}
                </div>
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Visa Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Comprehensive visa solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-3 flex items-center space-x-3">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      Tourist Visa Services
                    </CardTitle>
                    <Badge className="mt-1 border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-50">
                      Most Popular
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  Complete tourist visa assistance for your travel plans.
                  Professional documentation and application support.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6 grid gap-3 md:grid-cols-2">
                  {touristVisaFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-3 flex items-center font-medium text-gray-900">
                    <MapPin className="mr-2 h-4 w-4" />
                    Popular Destinations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {countries
                      .filter((c) => c.popular)
                      .map((country, index) => (
                        <Badge
                          key={index}
                          className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        >
                          {country.flag} {country.name}
                        </Badge>
                      ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push("/visa-service/tourist-visa")}
                >
                  Tourist Visa
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-3 flex items-center space-x-3">
                  <div className="rounded-lg bg-green-50 p-2">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      After Offer Visa
                    </CardTitle>
                    <Badge className="mt-1 border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50">
                      Study & Work
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  Specialized visa services for students and professionals with
                  offer letters from institutions or employers.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6 grid gap-3 md:grid-cols-2">
                  {afterOfferVisaFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-3 flex items-center font-medium text-gray-900">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Visa Types We Handle
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                      Student Visa
                    </Badge>
                    <Badge className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                      Work Visa
                    </Badge>
                    <Badge className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                      Family Visa
                    </Badge>
                    <Badge className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                      Dependent Visa
                    </Badge>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => router.push("/visa-service/offer-visa")}
                >
                  After Offer Visa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Process
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              A streamlined approach to visa applications
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((process, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
                  {process.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {process.title}
                </h3>
                <p className="text-sm text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Countries We Serve
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Visa services for destinations worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {countries.map((country, index) => (
              <Card
                key={index}
                className="border border-gray-200 text-center transition-shadow hover:shadow-sm"
              >
                <CardContent className="pt-6 pb-4">
                  <div className="mb-2 text-3xl">{country.flag}</div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {country.name}
                  </h3>
                  {country.popular && (
                    <Badge className="mt-2 border border-blue-200 bg-blue-50 text-xs text-blue-700 hover:bg-blue-50">
                      Popular
                    </Badge>
                  )}
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
              Why Choose Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Professional visa consultation with proven results
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Secure Process
              </h3>
              <p className="text-sm text-gray-600">
                Your documents and personal information are handled with
                complete confidentiality
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Fast Processing
              </h3>
              <p className="text-sm text-gray-600">
                Efficient processing with regular updates on your application
                status
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Expert Support
              </h3>
              <p className="text-sm text-gray-600">
                Experienced visa consultants available to guide you through
                every step
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Ready to Start Your Application?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Get professional visa consultation and make your travel plans a
            reality
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Book Free Consultation
            </Button>
            <Button size="lg" variant="outline">
              Contact Our Experts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

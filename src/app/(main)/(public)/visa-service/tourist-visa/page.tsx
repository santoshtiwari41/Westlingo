import {
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
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

export default function TouristVisaPage() {
  const services = [
    {
      title: "Documentation Assistance",
      description: "Complete help with all required documents and forms",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Travel Itinerary Planning",
      description: "Detailed travel plans that meet visa requirements",
      icon: <MapPin className="h-6 w-6" />,
    },
    {
      title: "Hotel Booking Support",
      description: "Assistance with accommodation bookings and confirmations",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: "Financial Statement Guidance",
      description: "Help with bank statements and financial documentation",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      title: "Photo Requirements",
      description: "Guidance on passport photos and specifications",
      icon: <Camera className="h-6 w-6" />,
    },
    {
      title: "Interview Preparation",
      description: "Mock interviews and preparation for visa interviews",
      icon: <Users className="h-6 w-6" />,
    },
  ];

  const countries = [
    { name: "United States", processing: "5-15 days", difficulty: "High" },
    { name: "Canada", processing: "2-4 weeks", difficulty: "Medium" },
    { name: "United Kingdom", processing: "3 weeks", difficulty: "Medium" },
    { name: "Australia", processing: "2-4 weeks", difficulty: "Medium" },
    { name: "Schengen (Europe)", processing: "2 weeks", difficulty: "Medium" },
    { name: "Japan", processing: "5-7 days", difficulty: "Low" },
    { name: "South Korea", processing: "5-10 days", difficulty: "Low" },
    { name: "Singapore", processing: "3-5 days", difficulty: "Low" },
  ];

  const requirements = [
    "Valid passport (minimum 6 months validity)",
    "Completed visa application form",
    "Recent passport-sized photographs",
    "Travel itinerary and hotel bookings",
    "Bank statements (last 3-6 months)",
    "Employment letter or business registration",
    "Travel insurance coverage",
    "Proof of ties to home country",
  ];

  const processSteps = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "Discuss your travel plans and determine visa requirements",
      duration: "30 minutes",
    },
    {
      step: "2",
      title: "Document Collection",
      description: "Gather all required documents with our guidance",
      duration: "2-3 days",
    },
    {
      step: "3",
      title: "Application Preparation",
      description: "Complete forms and prepare your application package",
      duration: "1-2 days",
    },
    {
      step: "4",
      title: "Submission & Tracking",
      description: "Submit application and track progress until approval",
      duration: "Varies by country",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Tourist Visa
            <span className="mt-2 block text-blue-600">
              Application Services
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            Professional assistance for tourist visa applications to
            destinations worldwide. We handle the paperwork so you can focus on
            planning your perfect vacation.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg">Start Your Application</Button>
            <Button size="lg" variant="outline">
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              What We Offer
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Comprehensive tourist visa services to make your application
              process smooth and successful
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border border-gray-200 transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center space-x-3">
                    <div className="rounded-lg bg-blue-50 p-2">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Popular Destinations
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Processing times and difficulty levels for major tourist
              destinations
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {countries.map((country, index) => (
              <Card
                key={index}
                className="border border-gray-200 transition-shadow hover:shadow-sm"
              >
                <CardContent className="pt-6">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    {country.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Processing:</span>
                      <Badge className="border border-blue-200 bg-blue-50 text-xs text-blue-700 hover:bg-blue-50">
                        {country.processing}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Difficulty:</span>
                      <Badge
                        className={`text-xs hover:bg-current ${
                          country.difficulty === "High"
                            ? "border border-red-200 bg-red-50 text-red-700"
                            : country.difficulty === "Medium"
                              ? "border border-yellow-200 bg-yellow-50 text-yellow-700"
                              : "border border-green-200 bg-green-50 text-green-700"
                        }`}
                      >
                        {country.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="container mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Document Requirements
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                General requirements for tourist visa applications. Specific
                requirements may vary by destination.
              </p>
              <div className="space-y-3">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Need Help with Documents?
              </h3>
              <p className="mb-6 text-gray-600">
                Our experts will guide you through each requirement and help you
                prepare all necessary documents correctly.
              </p>
              <Button className="w-full">Get Document Checklist</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Process
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              A step-by-step approach to ensure your tourist visa application is
              successful
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((process, index) => (
              <Card key={index} className="border border-gray-200 text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
                    {process.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {process.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">
                    {process.description}
                  </p>
                  <Badge className="border border-gray-200 bg-gray-50 text-xs text-gray-700 hover:bg-gray-50">
                    {process.duration}
                  </Badge>
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
              Why Choose Our Tourist Visa Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Professional expertise to maximize your chances of visa approval
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                High Success Rate
              </h3>
              <p className="text-sm text-gray-600">
                98% approval rate for tourist visa applications
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Fast Processing
              </h3>
              <p className="text-sm text-gray-600">
                Quick document preparation and application submission
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Expert Guidance
              </h3>
              <p className="text-sm text-gray-600">
                Experienced consultants familiar with all requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Ready to Plan Your Trip?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Let us handle your tourist visa application while you focus on
            planning the perfect vacation
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg">Start Application Now</Button>
            <Button size="lg" variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

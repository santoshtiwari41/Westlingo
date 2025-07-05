import {
  Award,
  BookOpen,
  Briefcase,
  Building,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  GraduationCap,
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

export default function AfterOfferVisaPage() {
  const visaTypes = [
    {
      title: "Student Visa",
      description: "For students with university admission offers",
      icon: <GraduationCap className="h-6 w-6" />,
      features: [
        "University liaison",
        "I-20/CAS processing",
        "Financial documentation",
        "Interview preparation",
      ],
    },
    {
      title: "Work Visa",
      description: "For professionals with job offers",
      icon: <Briefcase className="h-6 w-6" />,
      features: [
        "Employer coordination",
        "Work permit processing",
        "Skill assessment",
        "Contract verification",
      ],
    },
    {
      title: "Family/Dependent Visa",
      description: "For family members of visa holders",
      icon: <Users className="h-6 w-6" />,
      features: [
        "Relationship documentation",
        "Sponsor verification",
        "Financial support proof",
        "Medical exams",
      ],
    },
  ];

  const services = [
    {
      title: "Document Verification",
      description:
        "Thorough review of all offer letters and supporting documents",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "University/Employer Liaison",
      description: "Direct communication with institutions and employers",
      icon: <Building className="h-6 w-6" />,
    },
    {
      title: "Financial Documentation",
      description:
        "Assistance with financial statements and sponsorship letters",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Interview Coaching",
      description: "Comprehensive preparation for visa interviews",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Post-Arrival Support",
      description: "Guidance for settling in your destination country",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Application Tracking",
      description: "Regular updates on your application status",
      icon: <Clock className="h-6 w-6" />,
    },
  ];

  const countries = [
    {
      name: "United States",
      studentVisa: "F-1",
      workVisa: "H-1B, L-1",
      processing: "2-8 weeks",
      requirements: "I-20, SEVIS fee, Financial proof",
    },
    {
      name: "Canada",
      studentVisa: "Study Permit",
      workVisa: "Work Permit",
      processing: "4-12 weeks",
      requirements: "LOA, GIC, Medical exam",
    },
    {
      name: "United Kingdom",
      studentVisa: "Student Visa",
      workVisa: "Skilled Worker",
      processing: "3-8 weeks",
      requirements: "CAS, ATAS, TB test",
    },
    {
      name: "Australia",
      studentVisa: "Subclass 500",
      workVisa: "Subclass 482",
      processing: "4-12 weeks",
      requirements: "COE, GTE, Health insurance",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Offer Letter Review",
      description:
        "Verify your admission/job offer and check visa requirements",
      duration: "1 day",
    },
    {
      step: "2",
      title: "Document Preparation",
      description:
        "Gather and prepare all required documents with our guidance",
      duration: "1-2 weeks",
    },
    {
      step: "3",
      title: "Application Submission",
      description: "Submit your visa application with complete documentation",
      duration: "1-2 days",
    },
    {
      step: "4",
      title: "Interview & Follow-up",
      description: "Prepare for interview and track application until approval",
      duration: "2-12 weeks",
    },
  ];

  const requirements = [
    "Valid passport (minimum 6 months validity)",
    "Original offer letter from institution/employer",
    "Academic transcripts and certificates",
    "English language proficiency test results",
    "Financial statements and sponsorship letters",
    "Medical examination reports",
    "Police clearance certificates",
    "Passport-sized photographs",
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Visa Types We Handle
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Comprehensive support for different types of after-offer visas
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {visaTypes.map((visa, index) => (
              <Card
                key={index}
                className="border border-gray-200 transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-3 flex items-center space-x-3">
                    <div className="rounded-lg bg-green-50 p-2">
                      {visa.icon}
                    </div>
                    <CardTitle className="text-lg">{visa.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {visa.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {visa.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              End-to-end support for your after-offer visa application
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border border-gray-200 transition-shadow hover:shadow-sm"
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

      <section className="bg-white px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Popular Destinations
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Visa information for top study and work destinations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {countries.map((country, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    {country.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Student Visa:
                      </span>
                      <Badge className="ml-2 border border-blue-200 bg-blue-50 text-xs text-blue-700 hover:bg-blue-50">
                        {country.studentVisa}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Work Visa:
                      </span>
                      <Badge className="ml-2 border border-green-200 bg-green-50 text-xs text-green-700 hover:bg-green-50">
                        {country.workVisa}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Processing Time:
                      </span>
                      <Badge className="ml-2 border border-gray-200 bg-gray-50 text-xs text-gray-700 hover:bg-gray-50">
                        {country.processing}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Key Requirements:
                      </span>
                      <p className="mt-1 text-sm text-gray-600">
                        {country.requirements}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                General Requirements
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Common documents required for after-offer visa applications.
                Specific requirements vary by country and visa type.
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
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Got Your Offer Letter?
              </h3>
              <p className="mb-6 text-gray-600">
                Upload your offer letter and get a personalized document
                checklist and timeline for your visa application.
              </p>
              <Button className="w-full">Upload Offer Letter</Button>
            </div>
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
              Streamlined process to get you from offer letter to visa approval
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((process, index) => (
              <Card key={index} className="border border-gray-200 text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-lg font-semibold text-white">
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

      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Our After Offer Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Specialized expertise in post-offer visa applications
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Institution Partnerships
              </h3>
              <p className="text-sm text-gray-600">
                Direct relationships with universities and employers worldwide
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                High Success Rate
              </h3>
              <p className="text-sm text-gray-600">
                99% approval rate for after-offer visa applications
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Post-Arrival Support
              </h3>
              <p className="text-sm text-gray-600">
                Continued assistance even after you reach your destination
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Ready to Secure Your Visa?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Don't let visa complications delay your dreams. Get expert help to
            secure your visa quickly and efficiently.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg">Start Application Process</Button>
            <Button size="lg" variant="outline">
              Book Expert Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

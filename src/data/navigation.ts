export interface NavigationLink {
  label: string;
  href: string;
}

export interface NavigationSection {
  title: string;
  href: string;
  items: NavigationLink[];
}

export interface NavigationItem {
  name: string;
  nested: boolean;
  items: (NavigationSection | NavigationLink)[];
}

export interface MobileNavItemProps {
  item: NavigationItem;
  index: number;
  onClose: () => void;
}

export const navigationItems: NavigationItem[] = [
  {
    name: "Test Preparation/Booking",
    nested: true,
    items: [
      {
        title: "PTE",
        href: "/course/pte",
        items: [
          { label: "Preparation Class", href: "/course/pte/preparations" },
          { label: "Test Booking", href: "/course/pte/bookings" },
          { label: "Mock Test", href: "/course/pte/mocks" },
        ],
      },
      {
        title: "IELTS",
        href: "/course/ielts",
        items: [
          { label: "Preparation Class", href: "/course/ielts/preparations" },
          { label: "Test Booking", href: "/course/ielts/bookings" },
          { label: "Mock Test", href: "/course/ielts/mocks" },
        ],
      },
      {
        title: "DUOLINGO",
        href: "/course/duolingo",
        items: [
          {
            label: "Preparation Class",
            href: "/course/duolingo/preparations",
          },
          { label: "Test Booking", href: "/course/duolingo/bookings" },
          { label: "Mock Test", href: "/course/duolingo/mocks" },
        ],
      },
      {
        title: "SAT",
        href: "/course/sat",
        items: [
          { label: "Preparation Class", href: "/course/sat/preparations" },
          { label: "Test Booking", href: "/course/sat/bookings" },
          { label: "Mock Test", href: "/course/sat/mocks" },
        ],
      },
      {
        title: "TOFEL",
        href: "/course/tofel",
        items: [
          { label: "Preparation Class", href: "/course/tofel/preparations" },
          { label: "Test Booking", href: "/course/tofel/bookings" },
          { label: "Mock Test", href: "/course/tofel/mocks" },
        ],
      },
      {
        title: "NAT/JLPT",
        href: "/course/nat",
        items: [
          { label: "Preparation Class", href: "/course/nat/preparations" },
          { label: "Test Booking", href: "/course/nat/bookings" },
          { label: "Mock Test", href: "/course/nat/mocks" },
        ],
      },
      // { title: "BASIC ENGLISH", href:"/courses/basic-english", items: ["Preparation Class", "Test Booking", "Mock Test"] },
    ],
  },
  {
    name: "Writing",
    nested: false,
    items: [
      { label: "CV", href: "/writing/cv" },
      { label: "SOP", href: "/writing/sop" },
      { label: "ESSAY", href: "/writing/essay" },
      { label: "LETTER", href: "/writing/letter" },
      { label: "ITINERARY", href: "/writing/itinerary" },
    ],
  },
  {
    name: "Study Abroad",
    nested: false,
    items: [
      { label: "Finland", href: "/study-abroad/finland" },
      { label: "Japan", href: "/study-abroad/japan" },
    ],
  },
  {
    name: "Visa Services",
    nested: false,
    items: [
      { label: "Tourist Visa Service", href: "/visa-service/tourist-visa" },
      { label: "After Offer Visa Service", href: "/visa-service/offer-visa" },
    ],
  },
  // {
  //   name: "Blogs",
  //   nested: false,
  //   items: [{ label: "Blogs", href: "/blog" }],
  // },
];

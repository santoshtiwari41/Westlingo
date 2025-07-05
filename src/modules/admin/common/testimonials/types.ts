export interface Testimonial {
  id: string;
  name: string;
  image?: string;
  quote: string;
  bio?: string;
}

export type GetTestimonial = Testimonial;
export type GetTestimonials = Testimonial[];

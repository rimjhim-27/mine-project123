export interface TestPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  tests: string[];
  category: string;
  popular?: boolean;
  homeCollection: boolean;
}

export interface IndividualTest {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  symptoms: string[];
  preparationRequired: boolean;
  reportTime: string;
  homeCollection: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  image: string;
}
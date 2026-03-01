export interface User {
  _id: string;
  email: string;
  role: string;
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
  pregnancyInfo?: {
    isPregnant: boolean;
    currentWeek?: number;
    currentMonth?: number;
    dueDate?: string;
  };
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

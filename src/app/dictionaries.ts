import 'server-only';

const dictionaries = {
  de: {
    brand: 'Trattoria Toscana',
    owners: 'Claudia & Francesco',
    heroTitle: 'Ein Stück Toskana in Burgdorf.',
    heroSubtitle:
      'Genießen Sie originale italienische Spezialitäten von Claudia & Francesco.',
    ctaMenu: 'Speisekarte ansehen',
    ctaBook: 'Tisch reservieren',
    address: 'Burgdorfer Straße 43, 31303 Burgdorf',
    phone: '05136-89534',
    mobile: '015560710947',
    hoursTitle: 'Öffnungszeiten',
    hoursWeek: 'Di. - Sa.: 18:00 - 22:00 Uhr',
    hoursSun: 'Sonn- und Feiertags: 12:00 - 21:00 Uhr',
    hoursMon: 'Montag: Ruhetag',
    meatTitle: 'Carne / Fleischgerichte',
    meatSub:
      'Zu allen Fleischgerichten servieren wir Kartoffeln und Gemüse als Beilage',
    fishTitle: 'Pesce / Fischgerichte',
    fishSub:
      'Zu allen Fischgerichten servieren wir Kartoffeln und Gemüse als Beilage',
    dessertTitle: 'Dolci / Desserts',
    allergenNotice:
      'Alle Preise inkl. MwSt. Wir erteilen Ihnen gerne Auskunft über Zusatzstoffe und Allergene.',
    bookingTitle: 'Tisch Reservieren',
    bookingSubtitle: 'Sichern Sie sich Ihren Platz bei uns',
    inputName: 'Ihr Name',
    inputGuests: 'Personenzahl',
    inputDate: 'Datum',
    inputTime: 'Uhrzeit',
    btnSubmit: 'Über WhatsApp reservieren',
    btnCancel: 'Abbrechen',
  },
  en: {
    brand: 'Trattoria Toscana',
    owners: 'Claudia & Francesco',
    heroTitle: 'A Piece of Tuscany in Burgdorf.',
    heroSubtitle: 'Enjoy authentic Italian specialties by Claudia & Francesco.',
    ctaMenu: 'View Menu',
    ctaBook: 'Book a Table',
    address: 'Burgdorfer Straße 43, 31303 Burgdorf',
    phone: '05136-89534',
    mobile: '015560710947',
    hoursTitle: 'Opening Hours',
    hoursWeek: 'Tue. - Sat.: 6:00 PM - 10:00 PM',
    hoursSun: 'Sundays & Holidays: 12:00 PM - 9:00 PM',
    hoursMon: 'Monday: Closed',
    meatTitle: 'Carne / Meat Dishes',
    meatSub: 'All meat dishes are served with potatoes and vegetables',
    fishTitle: 'Pesce / Fish Dishes',
    fishSub: 'All fish dishes are served with potatoes and vegetables',
    dessertTitle: 'Dolci / Desserts',
    allergenNotice:
      'All prices include VAT. We will gladly provide information about additives and allergens.',
    bookingTitle: 'Book a Table',
    bookingSubtitle: 'Secure your spot with us',
    inputName: 'Your Name',
    inputGuests: 'Number of Guests',
    inputDate: 'Date',
    inputTime: 'Time',
    btnSubmit: 'Reserve via WhatsApp',
    btnCancel: 'Cancel',
  },
};

export const getDictionary = async (locale: 'de' | 'en') =>
  dictionaries[locale] || dictionaries.de;

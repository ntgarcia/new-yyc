export const translations = {
  en: {
    "Welcome to newYYC": "Welcome to newYYC",
    "Find programs and activities in your area that match your interests.":
      "Find programs and activities in your area that match your interests.",
    "Take a quick survey to discover what Calgary has to offer!":
      "Take a quick survey to discover what Calgary has to offer!",
    "Start Survey": "Start Survey",
    // Language Selection
    "Select your language": "Select your language",
    English: "English",
    Français: "Français",

    // Quadrant Selection
    "Which quadrant of Calgary do you live in?":
      "Which quadrant of Calgary do you live in?",

    // Interests Selection
    "What activities interest you?": "What activities interest you?",
    "Swimming Lessons & Aquatics": "Swimming Lessons & Aquatics",
    "Skating & Hockey Programs": "Skating & Hockey Programs",
    "Fitness & Exercise Classes": "Fitness & Exercise Classes",
    "Preschool & Early Learning": "Preschool & Early Learning",
    "Visual Arts & Ceramics": "Visual Arts & Ceramics",
    "Yoga & Wellness": "Yoga & Wellness",
    "Sports & Athletics": "Sports & Athletics",
    "Martial Arts": "Martial Arts",
    "Dance & Movement": "Dance & Movement",
    "Parent & Child Activities": "Parent & Child Activities",

    // Navigation
    Back: "Back",
    Next: "Next",
    "Show Results": "Show Results",
    "Restart Quiz": "Restart Quiz",

    // Results
    "Available Programs in": "Available Programs in",
    "No Programs Found": "No Programs Found",
    "No upcoming programs match your interests":
      "No upcoming programs match your interests",
    "Try selecting different interests": "Try selecting different interests",
    "Selected interests": "Selected interests",
    "Register Now": "Register Now",
    "Load More Programs": "Load More Programs",
    "Loading programs...": "Loading programs...",
    Error: "Error",
    "Sort by Relevance": "Sort by Relevance",
    "Sort by Date": "Sort by Date",
    "Sort by Price": "Sort by Price",
    "All Ages": "All Ages",
    "Kids (0-12)": "Kids (0-12)",
    "Teens (13-17)": "Teens (13-17)",
    "Adults (18+)": "Adults (18+)",
    "Age Range": "Age Range",
    Starts: "Starts",
    Price: "Price",
    "Program Name Not Available": "Program Name Not Available",
    "Venue Not Specified": "Venue Not Specified",
  },
  fr: {
    "Welcome to newYYC": "Bienvenue à newYYC",
    "Find programs and activities in your area that match your interests.":
      "Trouvez des programmes et des activités dans votre région qui correspondent à vos intérêts.",
    "Take a quick survey to discover what Calgary has to offer!":
      "Répondez à un court sondage pour découvrir ce que Calgary a à offrir!",
    "Start Survey": "Commencer le sondage",
    // Language Selection
    "Select your language": "Sélectionnez votre langue",
    English: "Anglais",
    Français: "Français",

    // Quadrant Selection
    "Which quadrant of Calgary do you live in?":
      "Dans quel quadrant de Calgary habitez-vous?",

    // Interests Selection
    "What activities interest you?": "Quelles activités vous intéressent?",
    "Swimming Lessons & Aquatics": "Cours de natation et activités aquatiques",
    "Skating & Hockey Programs": "Programmes de patinage et de hockey",
    "Fitness & Exercise Classes": "Cours de fitness et d'exercice",
    "Preschool & Early Learning": "Préscolaire et apprentissage précoce",
    "Visual Arts & Ceramics": "Arts visuels et céramique",
    "Yoga & Wellness": "Yoga et bien-être",
    "Sports & Athletics": "Sports et athlétisme",
    "Martial Arts": "Arts martiaux",
    "Dance & Movement": "Danse et mouvement",
    "Parent & Child Activities": "Activités parent-enfant",

    // Navigation
    Back: "Retour",
    Next: "Suivant",
    "Show Results": "Afficher les résultats",
    "Restart Quiz": "Recommencer",

    // Results
    "Available Programs in": "Programmes disponibles dans",
    "No Programs Found": "Aucun programme trouvé",
    "No upcoming programs match your interests":
      "Aucun programme à venir ne correspond à vos intérêts",
    "Try selecting different interests":
      "Essayez de sélectionner d'autres intérêts",
    "Selected interests": "Intérêts sélectionnés",
    "Register Now": "S'inscrire maintenant",
    "Load More Programs": "Charger plus de programmes",
    "Loading programs...": "Chargement des programmes...",
    Error: "Erreur",
    "Sort by Relevance": "Trier par pertinence",
    "Sort by Date": "Trier par date",
    "Sort by Price": "Trier par prix",
    "All Ages": "Tous les âges",
    "Kids (0-12)": "Enfants (0-12)",
    "Teens (13-17)": "Ados (13-17)",
    "Adults (18+)": "Adultes (18+)",
    "Age Range": "Tranche d'âge",
    Starts: "Début",
    Price: "Prix",
    "Program Name Not Available": "Nom du programme non disponible",
    "Venue Not Specified": "Lieu non spécifié",
  },
};

export const getTranslation = (key, language) => {
  return translations[language][key] || key;
};

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Consultant = require('../models/Consultant');
const Symptom = require('../models/Symptom');
const Wellness = require('../models/Wellness');
const Hospital = require('../models/Hospital');
const Career = require('../models/Career');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB connected for seeding'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

const seedDatabase = async () => {
  try {
    console.log('🗑️  Clearing existing data...');
    
    await User.deleteMany({});
    await Consultant.deleteMany({});
    await Symptom.deleteMany({});
    await Wellness.deleteMany({});
    await Hospital.deleteMany({});
    await Career.deleteMany({});
    
    console.log('✅ Existing data cleared');
    
    // Seed Users
    console.log('👥 Seeding users...');
    const users = await seedUsers();
    console.log(`✅ ${users.length} users created`);
    
    // Seed Consultants
    console.log('👨‍⚕️ Seeding consultants...');
    const consultants = await seedConsultants(users);
    console.log(`✅ ${consultants.length} consultants created`);
    
    // Seed Symptoms (1000+ data points)
    console.log('🤒 Seeding symptoms...');
    const symptoms = await seedSymptoms();
    console.log(`✅ ${symptoms.length} symptoms created`);
    
    // Seed Wellness Recommendations
    console.log('💪 Seeding wellness recommendations...');
    const wellness = await seedWellness();
    console.log(`✅ ${wellness.length} wellness recommendations created`);
    
    // Seed Hospitals
    console.log('🏥 Seeding hospitals...');
    const hospitals = await seedHospitals();
    console.log(`✅ ${hospitals.length} hospitals created`);
    
    // Seed Careers
    console.log('💼 Seeding careers...');
    const careers = await seedCareers();
    console.log(`✅ ${careers.length} career entries created`);
    
    const totalRecords = users.length + consultants.length + symptoms.length + 
                         wellness.length + hospitals.length + careers.length;
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Total records created: ${totalRecords}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Seed Users
const seedUsers = async () => {
  const users = [];
  
  // Real consultant names (first 20 users)
  const consultantNames = [
    { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@mama.com' },
    { firstName: 'Emily', lastName: 'Williams', email: 'emily.williams@mama.com' },
    { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@mama.com' },
    { firstName: 'Jessica', lastName: 'Davis', email: 'jessica.davis@mama.com' },
    { firstName: 'David', lastName: 'Miller', email: 'david.miller@mama.com' },
    { firstName: 'Amanda', lastName: 'Wilson', email: 'amanda.wilson@mama.com' },
    { firstName: 'Christopher', lastName: 'Moore', email: 'christopher.moore@mama.com' },
    { firstName: 'Jennifer', lastName: 'Taylor', email: 'jennifer.taylor@mama.com' },
    { firstName: 'Daniel', lastName: 'Anderson', email: 'daniel.anderson@mama.com' },
    { firstName: 'Michelle', lastName: 'Thomas', email: 'michelle.thomas@mama.com' },
    { firstName: 'Robert', lastName: 'Jackson', email: 'robert.jackson@mama.com' },
    { firstName: 'Lisa', lastName: 'White', email: 'lisa.white@mama.com' },
    { firstName: 'James', lastName: 'Harris', email: 'james.harris@mama.com' },
    { firstName: 'Maria', lastName: 'Martin', email: 'maria.martin@mama.com' },
    { firstName: 'William', lastName: 'Garcia', email: 'william.garcia@mama.com' },
    { firstName: 'Laura', lastName: 'Martinez', email: 'laura.martinez@mama.com' },
    { firstName: 'Richard', lastName: 'Robinson', email: 'richard.robinson@mama.com' },
    { firstName: 'Patricia', lastName: 'Clark', email: 'patricia.clark@mama.com' },
    { firstName: 'Thomas', lastName: 'Rodriguez', email: 'thomas.rodriguez@mama.com' },
    { firstName: 'Nancy', lastName: 'Lewis', email: 'nancy.lewis@mama.com' }
  ];
  
  // Add consultant users with real names
  for (let i = 0; i < 20; i++) {
    users.push({
      email: consultantNames[i].email,
      password: '$2a$12$aiiahUhXeGGHMcnLGSdRx.4wSQcxhuwgG.eaEV3YNhCLYcjMMxu2e',
      role: 'consultant',
      profile: {
        firstName: consultantNames[i].firstName,
        lastName: consultantNames[i].lastName,
        phone: `+1234567${String(i + 1).padStart(4, '0')}`,
        dateOfBirth: new Date(1975 + (i % 15), i % 12, (i % 28) + 1)
      },
      pregnancyInfo: {
        isPregnant: false,
        numberOfChildren: 0
      },
      location: {
        city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][i % 5],
        state: ['NY', 'CA', 'IL', 'TX', 'AZ'][i % 5],
        country: 'USA'
      },
      termsAccepted: true,
      termsAcceptedDate: new Date()
    });
  }
  
  // Add regular users
  for (let i = 21; i <= 50; i++) {
    users.push({
      email: `user${i}@mama.com`,
      password: '$2a$12$aiiahUhXeGGHMcnLGSdRx.4wSQcxhuwgG.eaEV3YNhCLYcjMMxu2e',
      role: 'user',
      profile: {
        firstName: `User${i}`,
        lastName: `Test`,
        phone: `+1234567${String(i).padStart(4, '0')}`,
        dateOfBirth: new Date(1990 + (i % 10), i % 12, (i % 28) + 1)
      },
      pregnancyInfo: {
        isPregnant: i % 3 !== 0,
        currentWeek: (i % 40) + 1,
        currentMonth: Math.ceil((i % 40 + 1) / 4.33),
        dueDate: new Date(Date.now() + (280 - (i % 40 + 1)) * 24 * 60 * 60 * 1000),
        numberOfChildren: i % 3
      },
      location: {
        city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][i % 5],
        state: ['NY', 'CA', 'IL', 'TX', 'AZ'][i % 5],
        country: 'USA'
      },
      termsAccepted: true,
      termsAcceptedDate: new Date()
    });
  }
  
  return await User.insertMany(users);
};

// Seed Consultants
const seedConsultants = async (users) => {
  const consultantUsers = users.slice(0, 20);
  const specializations = [
    'Obstetrician',
    'Gynecologist',
    'Midwife',
    'Nutritionist',
    'Mental Health Specialist',
    'Lactation Consultant',
    'Pediatrician',
    'Fitness Coach',
    'Doula'
  ];
  
  const consultants = [];
  
  for (let i = 0; i < consultantUsers.length; i++) {
    const spec = specializations[i % specializations.length];
    
    consultants.push({
      userId: consultantUsers[i]._id,
      specialization: [spec],
      qualifications: [
        {
          degree: 'MD',
          institution: ['Harvard Medical School', 'Johns Hopkins', 'Stanford Medical'][i % 3],
          year: 2010 + (i % 10)
        }
      ],
      certifications: ['Board Certified', 'ACOG Member'],
      experience: {
        years: 5 + (i % 15),
        description: `Experienced ${spec.toLowerCase()} specializing in maternal health and wellness.`
      },
      bio: `Dr. ${consultantUsers[i].profile.firstName} ${consultantUsers[i].profile.lastName} is a dedicated ${spec.toLowerCase()} with extensive experience in pregnancy care and maternal health. Passionate about supporting women through their pregnancy journey.`,
      languages: ['English', ['Spanish', 'French', 'Mandarin'][i % 3]],
      availability: {
        schedule: [
          { day: 'Monday', slots: [{ startTime: '09:00', endTime: '17:00' }] },
          { day: 'Wednesday', slots: [{ startTime: '09:00', endTime: '17:00' }] },
          { day: 'Friday', slots: [{ startTime: '09:00', endTime: '17:00' }] }
        ],
        isAvailable: true
      },
      rating: {
        average: 4.0 + (Math.random() * 1),
        count: 10 + Math.floor(Math.random() * 90)
      },
      consultationRate: {
        amount: 100 + (i * 10),
        currency: 'USD'
      },
      totalConsultations: Math.floor(Math.random() * 200) + 50,
      verificationStatus: 'verified'
    });
  }
  
  return await Consultant.insertMany(consultants);
};

// Seed Symptoms (1000+ entries)
const seedSymptoms = async () => {
  const symptoms = [];
  
  const symptomData = [
    // Month 1
    { name: 'Missed Period', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Breast Tenderness', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Fatigue', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Nausea', category: 'Digestive', isNormal: true, severity: 'mild' },
    { name: 'Frequent Urination', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Mood Swings', category: 'Emotional', isNormal: true, severity: 'mild' },
    { name: 'Light Cramping', category: 'Pain', isNormal: true, severity: 'mild' },
    { name: 'Spotting', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Bloating', category: 'Digestive', isNormal: true, severity: 'mild' },
    { name: 'Food Aversions', category: 'Digestive', isNormal: true, severity: 'mild' },
    
    // Month 2
    { name: 'Morning Sickness', category: 'Digestive', isNormal: true, severity: 'moderate' },
    { name: 'Increased Saliva', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Metallic Taste', category: 'Other', isNormal: true, severity: 'mild' },
    { name: 'Dizziness', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Heartburn', category: 'Digestive', isNormal: true, severity: 'mild' },
    { name: 'Constipation', category: 'Digestive', isNormal: true, severity: 'mild' },
    { name: 'Increased Sense of Smell', category: 'Other', isNormal: true, severity: 'mild' },
    { name: 'Vivid Dreams', category: 'Sleep', isNormal: true, severity: 'mild' },
    { name: 'Slight Weight Gain', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Emotional Sensitivity', category: 'Emotional', isNormal: true, severity: 'mild' },
    
    // Month 3
    { name: 'Visible Baby Bump', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Decreased Nausea', category: 'Digestive', isNormal: true, severity: 'mild' },
    { name: 'Increased Energy', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Skin Changes', category: 'Skin', isNormal: true, severity: 'mild' },
    { name: 'Darkening Areolas', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Varicose Veins', category: 'Cardiovascular', isNormal: true, severity: 'mild' },
    { name: 'Leg Cramps', category: 'Pain', isNormal: true, severity: 'mild' },
    { name: 'Headaches', category: 'Pain', isNormal: true, severity: 'mild' },
    { name: 'Increased Appetite', category: 'Digestive', isNormal: true, severity: 'mild' },
    { name: 'Forgetfulness', category: 'Emotional', isNormal: true, severity: 'mild' },
    
    // Month 4
    { name: 'Feeling Baby Move', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Round Ligament Pain', category: 'Pain', isNormal: true, severity: 'mild' },
    { name: 'Nasal Congestion', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Bleeding Gums', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Stretch Marks', category: 'Skin', isNormal: true, severity: 'mild' },
    { name: 'Increased Libido', category: 'Other', isNormal: true, severity: 'mild' },
    { name: 'Glowing Skin', category: 'Skin', isNormal: true, severity: 'mild' },
    { name: 'Back Pain', category: 'Pain', isNormal: true, severity: 'mild' },
    { name: 'Hip Pain', category: 'Pain', isNormal: true, severity: 'mild' },
    { name: 'Shortness of Breath', category: 'Cardiovascular', isNormal: true, severity: 'mild' },
    
    // Month 5
    { name: 'Regular Baby Movements', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Swollen Feet', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Darkening Skin Patches', category: 'Skin', isNormal: true, severity: 'mild' },
    { name: 'Increased Sweating', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Carpal Tunnel Symptoms', category: 'Pain', isNormal: true, severity: 'mild' },
    { name: 'Restless Legs', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Linea Nigra', category: 'Skin', isNormal: true, severity: 'mild' },
    { name: 'Increased Vaginal Discharge', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Hot Flashes', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Anxiety About Birth', category: 'Emotional', isNormal: true, severity: 'mild' },
    
    // Month 6
    { name: 'Strong Baby Kicks', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Increased Backache', category: 'Pain', isNormal: true, severity: 'moderate' },
    { name: 'Braxton Hicks Contractions', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Insomnia', category: 'Sleep', isNormal: true, severity: 'mild' },
    { name: 'Itchy Belly', category: 'Skin', isNormal: true, severity: 'mild' },
    { name: 'Clumsiness', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Increased Heart Rate', category: 'Cardiovascular', isNormal: true, severity: 'mild' },
    { name: 'Pelvic Pressure', category: 'Pain', isNormal: true, severity: 'mild' },
    { name: 'Snoring', category: 'Sleep', isNormal: true, severity: 'mild' },
    { name: 'Nesting Instinct', category: 'Emotional', isNormal: true, severity: 'mild' },
    
    // Month 7
    { name: 'Frequent Braxton Hicks', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Hemorrhoids', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Increased Fatigue', category: 'Physical', isNormal: true, severity: 'moderate' },
    { name: 'Difficulty Sleeping', category: 'Sleep', isNormal: true, severity: 'moderate' },
    { name: 'Leaking Breasts', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Sciatic Nerve Pain', category: 'Pain', isNormal: true, severity: 'moderate' },
    { name: 'Mood Swings Return', category: 'Emotional', isNormal: true, severity: 'mild' },
    { name: 'Increased Thirst', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Baby Hiccups', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Pressure on Ribs', category: 'Pain', isNormal: true, severity: 'mild' },
    
    // Month 8
    { name: 'Very Active Baby', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Severe Back Pain', category: 'Pain', isNormal: true, severity: 'moderate' },
    { name: 'Difficulty Walking', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Frequent Urination Returns', category: 'Physical', isNormal: true, severity: 'moderate' },
    { name: 'Feeling Full Quickly', category: 'Digestive', isNormal: true, severity: 'mild' },
    { name: 'Increased Swelling', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Impatience', category: 'Emotional', isNormal: true, severity: 'mild' },
    { name: 'Vivid Dreams Increase', category: 'Sleep', isNormal: true, severity: 'mild' },
    { name: 'Baby Dropping', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Increased Discharge', category: 'Physical', isNormal: true, severity: 'mild' },
    
    // Month 9
    { name: 'Lightning Crotch', category: 'Pain', isNormal: true, severity: 'moderate' },
    { name: 'Mucus Plug Loss', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Water Breaking', category: 'Physical', isNormal: true, severity: 'severe' },
    { name: 'Regular Contractions', category: 'Pain', isNormal: true, severity: 'severe' },
    { name: 'Extreme Fatigue', category: 'Physical', isNormal: true, severity: 'moderate' },
    { name: 'Burst of Energy', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Diarrhea', category: 'Digestive', isNormal: true, severity: 'mild' },
    { name: 'Lower Back Pain', category: 'Pain', isNormal: true, severity: 'moderate' },
    { name: 'Cervical Changes', category: 'Physical', isNormal: true, severity: 'mild' },
    { name: 'Anxiety About Labor', category: 'Emotional', isNormal: true, severity: 'moderate' }
  ];
  
  // Generate comprehensive symptom entries for each month and week
  for (let month = 1; month <= 9; month++) {
    const weeksInMonth = month === 9 ? 4 : 4; // Simplified
    
    for (let week = 1; week <= weeksInMonth; week++) {
      const absoluteWeek = (month - 1) * 4 + week;
      
      // Add 10-15 symptoms per week with variations
      for (let i = 0; i < symptomData.length; i++) {
        const symptom = symptomData[i];
        
        // Include symptoms progressively through pregnancy
        if ((i % 9) + 1 <= month || Math.random() > 0.5) {
          symptoms.push({
            month,
            week: absoluteWeek,
            symptomName: symptom.name,
            category: symptom.category,
            description: `${symptom.name} during week ${absoluteWeek} of pregnancy is ${symptom.isNormal ? 'a normal symptom' : 'something to monitor'}. This is commonly experienced during this stage of pregnancy.`,
            isNormal: symptom.isNormal,
            severity: symptom.severity,
            whenToWorry: symptom.severity === 'severe' 
              ? 'Contact your healthcare provider immediately if experiencing this symptom.' 
              : 'Contact your doctor if this symptom becomes severe, persistent, or is accompanied by bleeding, severe pain, or fever.',
            recommendations: [
              'Stay hydrated',
              'Get adequate rest',
              'Eat small, frequent meals',
              'Practice gentle exercise',
              'Consult your healthcare provider'
            ].slice(0, 3 + Math.floor(Math.random() * 2)),
            relatedSymptoms: symptomData
              .filter(s => s.category === symptom.category && s.name !== symptom.name)
              .slice(0, 3)
              .map(s => s.name),
            searchTags: [symptom.name.toLowerCase(), symptom.category.toLowerCase(), `month ${month}`, `week ${absoluteWeek}`]
          });
        }
      }
    }
  }
  
  return await Symptom.insertMany(symptoms);
};

// Seed Wellness Recommendations
const seedWellness = async () => {
  const wellness = [];
  
  const monthlyRecommendations = {
    // Comprehensive data for all 9 months
    foods: [
      { name: 'Leafy Greens', benefits: 'Rich in folate and iron', nutrients: ['Folate', 'Iron', 'Calcium'] },
      { name: 'Salmon', benefits: 'Omega-3 for baby brain development', nutrients: ['Omega-3', 'Protein', 'Vitamin D'] },
      { name: 'Greek Yogurt', benefits: 'Calcium and probiotics', nutrients: ['Calcium', 'Protein', 'Probiotics'] },
      { name: 'Sweet Potatoes', benefits: 'Vitamin A and fiber', nutrients: ['Vitamin A', 'Fiber', 'Potassium'] },
      { name: 'Eggs', benefits: 'Complete protein and choline', nutrients: ['Protein', 'Choline', 'Vitamin D'] },
      { name: 'Berries', benefits: 'Antioxidants and vitamin C', nutrients: ['Vitamin C', 'Antioxidants', 'Fiber'] },
      { name: 'Nuts', benefits: 'Healthy fats and protein', nutrients: ['Omega-3', 'Protein', 'Magnesium'] },
      { name: 'Whole Grains', benefits: 'Energy and fiber', nutrients: ['Fiber', 'B Vitamins', 'Iron'] },
      { name: 'Legumes', benefits: 'Plant protein and iron', nutrients: ['Protein', 'Iron', 'Folate'] },
      { name: 'Avocado', benefits: 'Healthy fats and folate', nutrients: ['Folate', 'Healthy Fats', 'Potassium'] }
    ],
    
    exercises: [
      { name: 'Walking', intensity: 'Low', duration: '30 minutes' },
      { name: 'Swimming', intensity: 'Low', duration: '30 minutes' },
      { name: 'Prenatal Yoga', intensity: 'Low', duration: '45 minutes' },
      { name: 'Stretching', intensity: 'Low', duration: '15 minutes' },
      { name: 'Pelvic Floor Exercises', intensity: 'Low', duration: '10 minutes' },
      { name: 'Light Strength Training', intensity: 'Moderate', duration: '20 minutes' },
      { name: 'Prenatal Pilates', intensity: 'Moderate', duration: '30 minutes' },
      { name: 'Stationary Cycling', intensity: 'Low', duration: '25 minutes' }
    ],
    
    books: [
      { title: 'What to Expect When You\'re Expecting', author: 'Heidi Murkoff' },
      { title: 'The Mama Natural Week-by-Week Guide', author: 'Genevieve Howland' },
      { title: 'Ina May\'s Guide to Childbirth', author: 'Ina May Gaskin' },
      { title: 'Expecting Better', author: 'Emily Oster' },
      { title: 'The Fourth Trimester', author: 'Kimberly Ann Johnson' },
      { title: 'Bringing Up Bébé', author: 'Pamela Druckerman' }
    ],
    
    movies: [
      { title: 'The Business of Being Born', year: 2008, genre: 'Documentary' },
      { title: 'Babies', year: 2010, genre: 'Documentary' },
      { title: 'What To Expect When You\'re Expecting', year: 2012, genre: 'Comedy' },
      { title: 'Away We Go', year: 2009, genre: 'Comedy-Drama' },
      { title: 'Knocked Up', year: 2007, genre: 'Comedy' }
    ],
    
    podcasts: [
      { name: 'The Birthful Podcast', host: 'Adriana Lozada' },
      { name: 'Pregnancy Pukeology', host: 'Dr. PJ Parmar' },
      { name: 'The Pregnancy Podcast', host: 'Vanessa Merten' },
      { name: 'Happy Mama', host: 'Stephanie Dove' },
      { name: 'Motherly', host: 'Liz Tenety' }
    ]
  };
  
  for (let month = 1; month <= 9; month++) {
    // Food recommendations
    wellness.push({
      month,
      category: 'food',
      title: `Month ${month} Nutrition Guide`,
      description: `Essential foods and nutrition recommendations for month ${month} of pregnancy`,
      foods: monthlyRecommendations.foods.map(food => ({
        ...food,
        servingSize: '1 cup',
        imageUrl: `https://images.unsplash.com/photo-food-${Math.random().toString(36).substring(7)}?w=400`
      })),
      tips: [
        'Eat small, frequent meals',
        'Stay hydrated with 8-10 glasses of water daily',
        'Choose whole, unprocessed foods',
        'Take your prenatal vitamins'
      ],
      precautions: [
        'Avoid raw or undercooked meats',
        'Limit caffeine intake',
        'Avoid high-mercury fish',
        'Wash all fruits and vegetables thoroughly'
      ]
    });
    
    // Exercise recommendations
    wellness.push({
      month,
      category: 'exercise',
      title: `Month ${month} Exercise Guide`,
      description: `Safe and effective exercises for month ${month} of pregnancy`,
      exercises: monthlyRecommendations.exercises.map(ex => ({
        ...ex,
        description: `Safe ${ex.name.toLowerCase()} routine for pregnancy`,
        benefits: 'Maintains fitness, reduces pregnancy discomfort, prepares body for labor',
        precautions: 'Listen to your body, avoid overheating, stay hydrated',
        videoUrl: `https://example.com/video/${ex.name.toLowerCase().replace(' ', '-')}`,
        imageUrl: `https://images.unsplash.com/photo-exercise-${Math.random().toString(36).substring(7)}?w=400`
      })),
      tips: [
        'Always warm up before exercising',
        'Avoid exercises lying flat on your back after first trimester',
        'Stop if you feel dizzy or short of breath',
        'Consult your doctor before starting new exercises'
      ]
    });
    
    // Sleep recommendations
    wellness.push({
      month,
      category: 'sleep',
      title: `Month ${month} Sleep Tips`,
      description: `Better sleep strategies for month ${month} of pregnancy`,
      sleepTips: [
        {
          tip: 'Sleep on your left side',
          description: 'Improves circulation to the baby',
          benefit: 'Better blood flow and nutrient delivery'
        },
        {
          tip: 'Use pregnancy pillow',
          description: 'Support your belly and back',
          benefit: 'Reduces discomfort and improves sleep quality'
        },
        {
          tip: 'Establish bedtime routine',
          description: 'Regular sleep schedule',
          benefit: 'Better sleep quality and easier falling asleep'
        },
        {
          tip: 'Avoid screens before bed',
          description: 'Limit blue light exposure',
          benefit: 'Improved melatonin production'
        }
      ]
    });
    
    // Books
    if (month <= 3) {
      wellness.push({
        month,
        category: 'books',
        title: `Month ${month} Reading List`,
        description: 'Recommended books for early pregnancy',
        books: monthlyRecommendations.books.slice(0, 3).map(book => ({
          ...book,
          description: 'Essential reading for expecting mothers',
          coverUrl: `https://images.unsplash.com/photo-book-${Math.random().toString(36).substring(7)}?w=400`,
          amazonLink: `https://amazon.com/book/${book.title.replace(/\s/g, '-').toLowerCase()}`
        }))
      });
    }
    
    // Movies
    if (month % 3 === 0) {
      wellness.push({
        month,
        category: 'movies',
        title: `Month ${month} Movie Recommendations`,
        description: 'Movies to watch during pregnancy',
        movies: monthlyRecommendations.movies.map(movie => ({
          ...movie,
          description: 'Entertaining and informative for expecting mothers',
          posterUrl: `https://images.unsplash.com/photo-movie-${Math.random().toString(36).substring(7)}?w=400`,
          streamingPlatform: ['Netflix', 'Amazon Prime', 'Hulu'][Math.floor(Math.random() * 3)]
        }))
      });
    }
    
    // Podcasts
    if (month % 2 === 0) {
      wellness.push({
        month,
        category: 'podcasts',
        title: `Month ${month} Podcast Recommendations`,
        description: 'Podcasts for pregnancy and parenting',
        podcasts: monthlyRecommendations.podcasts.map(podcast => ({
          ...podcast,
          description: 'Insightful discussions on pregnancy and motherhood',
          episodeRecommendation: 'Start with the introduction episode',
          platform: ['Spotify', 'Apple Podcasts', 'Google Podcasts'][Math.floor(Math.random() * 3)],
          imageUrl: `https://images.unsplash.com/photo-podcast-${Math.random().toString(36).substring(7)}?w=400`
        }))
      });
    }
  }
  
  return await Wellness.insertMany(wellness);
};

// Seed Hospitals
const seedHospitals = async () => {
  const hospitals = [
    {
      name: 'St. Mary\'s Maternity Hospital',
      address: { street: '123 Health Ave', city: 'New York', state: 'NY', country: 'USA', zipCode: '10001' },
      location: { type: 'Point', coordinates: [-73.935242, 40.730610] },
      contact: { phone: '+1-212-555-0100', email: 'info@stmarys.com', emergencyNumber: '911' },
      facilities: ['NICU', 'Maternity Ward', 'Labor & Delivery', 'Emergency Room', 'Ultrasound', 'Private Rooms'],
      rating: { average: 4.5, count: 230 }
    },
    {
      name: 'Sunshine Women\'s Hospital',
      address: { street: '456 Care Blvd', city: 'Los Angeles', state: 'CA', country: 'USA', zipCode: '90001' },
      location: { type: 'Point', coordinates: [-118.243683, 34.052235] },
      contact: { phone: '+1-310-555-0200', email: 'info@sunshine.com', emergencyNumber: '911' },
      facilities: ['NICU', 'Maternity Ward', 'Labor & Delivery', 'Birthing Center', 'Lactation Support'],
      rating: { average: 4.7, count: 189 }
    },
    {
      name: 'Central City Medical Center',
      address: { street: '789 Medical Dr', city: 'Chicago', state: 'IL', country: 'USA', zipCode: '60601' },
      location: { type: 'Point', coordinates: [-87.629799, 41.878113] },
      contact: { phone: '+1-312-555-0300', email: 'info@centralcity.com', emergencyNumber: '911' },
      facilities: ['NICU', 'Maternity Ward', 'Labor & Delivery', 'Operating Theater', 'Pediatric Care'],
      rating: { average: 4.3, count: 156 }
    },
    {
      name: 'Texas Women & Children Hospital',
      address: { street: '321 Family Way', city: 'Houston', state: 'TX', country: 'USA', zipCode: '77001' },
      location: { type: 'Point', coordinates: [-95.363274, 29.760427] },
      contact: { phone: '+1-713-555-0400', email: 'info@texaswomen.com', emergencyNumber: '911' },
      facilities: ['NICU', 'Maternity Ward', 'Labor & Delivery', 'Birthing Center', 'Postpartum Care'],
      rating: { average: 4.6, count: 201 }
    },
    {
      name: 'Desert Valley Maternity Center',
      address: { street: '654 Valley Rd', city: 'Phoenix', state: 'AZ', country: 'USA', zipCode: '85001' },
      location: { type: 'Point', coordinates: [-112.074036, 33.448376] },
      contact: { phone: '+1-602-555-0500', email: 'info@desertvalley.com', emergencyNumber: '911' },
      facilities: ['Maternity Ward', 'Labor & Delivery', 'Birthing Center', 'Lactation Support'],
      rating: { average: 4.4, count: 143 }
    },
    {
      name: 'Riverside Birthing Hospital',
      address: { street: '147 River St', city: 'Portland', state: 'OR', country: 'USA', zipCode: '97201' },
      location: { type: 'Point', coordinates: [-122.676483, 45.523064] },
      contact: { phone: '+1-503-555-0600', email: 'info@riverside.com', emergencyNumber: '911' },
      facilities: ['NICU', 'Maternity Ward', 'Labor & Delivery', 'Private Rooms', 'Ultrasound'],
      rating: { average: 4.8, count: 267 }
    },
    {
      name: 'Mountain View Women\'s Care',
      address: { street: '258 Mountain Pkwy', city: 'Denver', state: 'CO', country: 'USA', zipCode: '80201' },
      location: { type: 'Point', coordinates: [-104.990251, 39.739236] },
      contact: { phone: '+1-303-555-0700', email: 'info@mountainview.com', emergencyNumber: '911' },
      facilities: ['Maternity Ward', 'Labor & Delivery', 'Birthing Center', 'Pediatric Care'],
      rating: { average: 4.5, count: 178 }
    },
    {
      name: 'Coastal Maternity Hospital',
      address: { street: '369 Beach Rd', city: 'San Diego', state: 'CA', country: 'USA', zipCode: '92101' },
      location: { type: 'Point', coordinates: [-117.161087, 32.715736] },
      contact: { phone: '+1-619-555-0800', email: 'info@coastal.com', emergencyNumber: '911' },
      facilities: ['NICU', 'Maternity Ward', 'Labor & Delivery', 'Emergency Room', 'Operating Theater'],
      rating: { average: 4.6, count: 195 }
    },
    {
      name: 'Lakeside Family Hospital',
      address: { street: '741 Lake Ave', city: 'Seattle', state: 'WA', country: 'USA', zipCode: '98101' },
      location: { type: 'Point', coordinates: [-122.335167, 47.608013] },
      contact: { phone: '+1-206-555-0900', email: 'info@lakeside.com', emergencyNumber: '911' },
      facilities: ['NICU', 'Maternity Ward', 'Labor & Delivery', 'Lactation Support', 'Postpartum Care'],
      rating: { average: 4.7, count: 212 }
    },
    {
      name: 'Garden State Maternity Center',
      address: { street: '852 Garden St', city: 'Newark', state: 'NJ', country: 'USA', zipCode: '07101' },
      location: { type: 'Point', coordinates: [-74.172367, 40.735657] },
      contact: { phone: '+1-973-555-1000', email: 'info@gardenstate.com', emergencyNumber: '911' },
      facilities: ['Maternity Ward', 'Labor & Delivery', 'Birthing Center', 'Private Rooms'],
      rating: { average: 4.4, count: 167 }
    }
  ];
  
  return await Hospital.insertMany(hospitals);
};

// Seed Careers
const seedCareers = async () => {
  const careers = [
    {
      title: 'Senior Obstetrician',
      department: 'Medical',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Join our team of healthcare professionals.',
      requirements: ['MD degree', '5+ years experience', 'Board certified'],
      isActive: false
    },
    {
      title: 'Maternal Health Consultant',
      department: 'Consulting',
      location: 'Remote',
      type: 'Contract',
      description: 'Work with expecting mothers remotely.',
      requirements: ['Relevant certification', '3+ years experience'],
      isActive: false
    },
    {
      title: 'Software Engineer',
      department: 'Technology',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Build features for our healthcare platform.',
      requirements: ['BS in Computer Science', 'React/Node.js experience'],
      isActive: false
    }
  ];
  
  return await Career.insertMany(careers);
};

// Run the seeder
seedDatabase();

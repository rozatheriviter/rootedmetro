const resources = [
  // Clothing
  {
    category: "Clothing",
    name: "Beaverton Seventh-Day Adventist",
    address: "14645 SW Davis Rd. Beaverton, OR 97007",
    phone: "503-646-9828",
    hours: "Tues. 9 a.m.-noon",
    services: "Walk-in clothes closet",
    notes: "Bus: 62, 88",
    transportation: "Bus: 62, 88"
  },
  {
    category: "Clothing",
    name: "Birthright of Hillsboro",
    address: "232 NE Lincoln St., Ste. F, Hillsboro, OR 97124",
    phone: "503-648-6766",
    hours: "Tues., Wed., Fri. noon-2 p.m.; Thurs. 5:30 p.m.-7:30 p.m.",
    services: "Maternity and baby clothes up to 12 months. Free confidential pregnancy testing, doctor referrals and housing resources.",
    notes: "Proof of pregnancy documentation needed to sign up for OHP and WIC.",
    transportation: "Bus: 46, 48, 57, MAX Blue"
  },
  {
    category: "Clothing",
    name: "Clothes for Kids",
    address: "16550 SW Merlo Rd. Beaverton, OR 97006",
    phone: "503-356-4322",
    hours: "Appointment required",
    services: "Free clothing",
    notes: "For low-income students attending Beaverton schools. Not for adults, infants, or toddlers. Must make an appointment over the phone or through a ParentSquare account.",
    transportation: "Bus: 67, MAX: Blue"
  },
  {
    category: "Clothing",
    name: "Elevate Him",
    address: "1513 SW Marlow St. Ste. A Portland, OR 97225",
    phone: "503-810-1607",
    hours: "Call to make an appointment",
    services: "Men's resource center offering clothes, supportive men's groups, and haircuts and styling",
    notes: "",
    transportation: ""
  },
  {
    category: "Clothing",
    name: "Helping Hands Clothes Closet",
    address: "14986 NW Cornell Rd. Portland, OR 97229",
    phone: "503-292-9293",
    hours: "Wed. 9:30-11:30 a.m. and 4-6 p.m.",
    services: "Adult and children's clothing and shoes",
    notes: "At Sunset Presbyterian Church. No appointment needed.",
    transportation: "Bus: 48"
  },

  // Day Services/Hygiene
  {
    category: "Day Services/Hygiene",
    name: "Just Compassion of East Washington County",
    address: "12264 SW Hall Blvd. Tigard, OR 97223",
    phone: "503-624-4666",
    hours: "7 a.m.-7 p.m. daily",
    services: "Welcoming, low-barrier space for people experiencing homelessness. Meals, showers, connection with providers, help finding stable housing.",
    notes: "For people experiencing homelessness.",
    transportation: "Bus: 12, 78"
  },
  {
    category: "Day Services/Hygiene",
    name: "Open Door HousingWorks",
    address: "34420 SW Tualatin Valley Hwy. Hillsboro, OR 97123",
    phone: "503-640-6689",
    hours: "Mon.-Fri. 9 a.m.-3 p.m.",
    services: "Day shelter offering meals, food boxes, showers, laundry, mail and phone access",
    notes: "",
    transportation: "Bus: 57"
  },
  {
    category: "Day Services/Hygiene",
    name: "Project Homeless Connect",
    address: "SE 6th Ave. Hillsboro, OR 97123 (Located on SE 6th between SE Oak St. and SE Baseline - across from Tuality Hospital.)",
    phone: "971-713-3930",
    hours: "Daily 7 a.m.-4 p.m.",
    services: "Breakfast and lunch, comfortable day center space, cell phone charging stations, computer access, laundry, showers, food, assistance with obtaining state ID, housing resources, and other services.",
    notes: "",
    transportation: "Bus: 57, MAX: Blue"
  },

  // Disability and Aging Support
  {
    category: "Disability and Aging Support",
    name: "Disability, Aging and Veteran Services",
    address: "5240 NE Elam Young Pkwy., Ste. 300, Hillsboro, OR. 97124",
    phone: "503-846-3060",
    hours: "Mon.-Fri. 8 a.m.-5 p.m.",
    services: "Programs and services to enhance quality of life and ensure basic needs are met. Includes Oregon Project Independence, food and nutrition services.",
    notes: "For Washington County seniors, veterans, and people with disabilities. Most programs serve those 60 years and older, but veterans and benefits enrollment center serves all ages.",
    transportation: ""
  },
  {
    category: "Disability and Aging Support",
    name: "Social Security Administration",
    address: "11975 SW Second St. Ste. 100 Beaverton, OR 97005",
    phone: "1-800-772-1213",
    hours: "Mon.-Fri. 9 a.m.-4 p.m.",
    services: "General information about Social Security Disability Insurance and Supplemental Security Income",
    notes: "",
    transportation: "Bus: 53, 57, 78, 88"
  },

  // Domestic Violence/Sexual Assault
  {
    category: "Domestic Violence/Sexual Assault",
    name: "Domestic Violence Resource Center, Inc.",
    address: "Confidential",
    phone: "503-469-8620 (24/7 crisis line)",
    hours: "Advocacy & Protective Orders: Mon.-Thurs. 8:30a.m.-4 p.m., Fri. 8:30a.m.-2 p.m.; Counseling Services: Mon.-Thurs. 10 a.m.-7 p.m.",
    services: "Advocacy services for survivors of domestic violence, advocate support for filing protective orders, safety planning, resource referrals, individual and group counseling for adults, individual counseling for children and teens (ages 5-18).",
    notes: "All services are confidential and free of charge. Servicios disponibles en español.",
    transportation: ""
  },
  {
    category: "Domestic Violence/Sexual Assault",
    name: "Family Justice Center",
    address: "735 SW 158th Ave. Ste. 100 Beaverton, OR 97006",
    phone: "503-430-8300",
    hours: "Mon.-Fri. 8:30a.m.- 4 p.m.",
    services: "Wrap-around services for survivors of Domestic Violence, Sexual Assault, Sexual Exploitation, Elder Abuse, Family Violence, and their children. Childcare, food, hygiene, and legal support, referrals for housing, benefits, and mental health support.",
    notes: "",
    transportation: ""
  },
  {
    category: "Domestic Violence/Sexual Assault",
    name: "Kim's Place",
    address: "Confidential location",
    phone: "971-415-0007",
    hours: "Call or fill out online application",
    services: "Place of refuge, sober living home.",
    notes: "Caters specifically to women who have left the sex industry, including trafficked women. Goal is to give women dignity, power over their lives, and help them transition into their own home, job, and safety.",
    transportation: ""
  },
  {
    category: "Domestic Violence/Sexual Assault",
    name: "Monika's House",
    address: "Confidential location (Hillsboro)",
    phone: "1-866-469-8600 (24/7 crisis line)",
    hours: "Call the crisis line to get connected",
    services: "Safe, confidential emergency shelter and domestic violence crisis hotline. Services for shelter residents include advocacy, case management, and support groups.",
    notes: "",
    transportation: ""
  },
  {
    category: "Domestic Violence/Sexual Assault",
    name: "Oregon Crime Victims Law Center",
    address: "Confidential",
    phone: "503-208-8160",
    hours: "Office visits by appointment only",
    services: "Free legal information, referrals and representation for victims of crime regarding their rights in criminal cases; legal information and representation in protective order cases for survivors of domestic violence, sexual assault and stalking.",
    notes: "Call for intake to determine eligibility for services. Serves all Oregon counties.",
    transportation: ""
  },
  {
    category: "Domestic Violence/Sexual Assault",
    name: "Sexual Assault Resource Center (SARC)",
    address: "Confidential",
    phone: "1-888-640-5311 (24/7 crisis line)",
    hours: "Call the crisis line to get connected",
    services: "Immediate 24-hour response and support to survivors of sexual assault, case management, education and outreach programs, support groups, and free mental health services.",
    notes: "",
    transportation: ""
  },

  // Family and Parenting Support
  {
    category: "Family and Parenting Support",
    name: "Children and Youth Counseling, DVRC",
    address: "Confidential",
    phone: "503-521-7997",
    hours: "Mon.-Thurs. 10 a.m.-7 p.m.",
    services: "Individual counseling services for children and youth who have witnessed family violence; individual counseling for teens 14 to 18 who have experienced teen dating violence.",
    notes: "Bilingual (Spanish) services available. Children and youth under 14 must have a non-offending parent or guardian willing to receive some parental education. Call for current appointment availability and to schedule intake.",
    transportation: ""
  },
  {
    category: "Family and Parenting Support",
    name: "Morrison Child and Family Services",
    address: "15455 NW Greenbrier Pkwy. Ste. 200 Beaverton, OR 97006",
    phone: "503-258-4495",
    hours: "Mon.-Fri. 8 a.m-7 p.m.",
    services: "Specialized outpatient mental health services for children birth through 18. Must be under 18 to start services.",
    notes: "Intake hours: 8 a.m.-4 p.m. Mon.-Fri.",
    transportation: ""
  },
  {
    category: "Family and Parenting Support",
    name: "Oregon Child Development Coalition (OCDC)",
    address: "Confidential",
    phone: "503-213-1191 or 503-359-0649",
    hours: "Call for more information",
    services: "Early Childhood education for children from 6 weeks to 5 years old. Provides school readiness, family advocacy and engagement, health screenings and referrals, healthy meals, and other services.",
    notes: "",
    transportation: ""
  },
  {
    category: "Family and Parenting Support",
    name: "Safe Families for Children",
    address: "Confidential",
    phone: "503-906-1027 (Spanish: 503-614-1299)",
    hours: "Call or fill out a referral on the website",
    services: "Support to families in crisis by assisting parents to get back on their feet without fear of losing custody of their children. Placing children and teens in loving, safe environments with volunteer host families while parents work on wellness goals. Mentoring and coaching of parents.",
    notes: "All at no cost to families. Serves the tri-county area.",
    transportation: ""
  },
  {
    category: "Family and Parenting Support",
    name: "Safe Oregon",
    address: "Confidential",
    phone: "844-472-3367 (Call or Text 24/7)",
    hours: "24/7, 365 days a year",
    services: "Way to report safety threats or potential acts of violence confidentially or anonymously. Tips are promptly analyzed and forwarded to designated personnel.",
    notes: "Not for immediate emergency response. Email: tips@safeoregon.com, website: www.safeoregon.com/report-a-tip/.",
    transportation: ""
  },
  {
    category: "Family and Parenting Support",
    name: "Tigard-Tualatin Family Resource Center",
    address: "9500 SW Murdock St. Tigard, OR 97224 (James Templeton Elementary School)",
    phone: "503-603-1585",
    hours: "Open on school days",
    services: "Basic needs resource connection, information on how to get clothing for babies and children, school supplies, and early learning supports.",
    notes: "Serves families with children ages 0-18 who live within the Tigard-Tualatin School District boundary.",
    transportation: ""
  },

  // Food and Grocery Assistance
  {
    category: "Food and Grocery Assistance",
    name: "Beaverton Resource Center",
    address: "13565 SW Walker Rd. Beaverton, OR 97005",
    phone: "503-591-9025",
    hours: "Mon.-Fri. 9 a.m.-2 p.m.; Office hours: Tues., Wed., and Fri. 9 a.m.-1 p.m.",
    services: "Central hub for those struggling with hunger, housing insecurity and poverty.",
    notes: "Referral-based access to Holy Trinity Food Closet.",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "Beaverton Seventh-Day Adventist",
    address: "14645 SW Davis Rd. Beaverton, OR 97007",
    phone: "503-646-9828 ext. 16",
    hours: "Tues. 9 a.m.-noon, 12:30-1:30 p.m.",
    services: "Helping Hands Food Pantry offers food boxes.",
    notes: "",
    transportation: "Bus: 62, 88"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Cascade Vineyard Church",
    address: "14460 SW 114th Ave. Tigard (house behind Christ the King Lutheran Church)",
    phone: "503-684-8225",
    hours: "Thurs. noon-3 p.m.",
    services: "Food pantry",
    notes: "Lottery system. Available to anyone in need.",
    transportation: "Bus: 94"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Community Table Food Pantry",
    address: "1095 S Beech St. Cornelius, OR 97113",
    phone: "503-724-9766",
    hours: "1-3 p.m. 1st Wed., 10 a.m.-noon 3rd Sat.",
    services: "Emergency food boxes and clothes closet.",
    notes: "Walk-ins welcome. English/Spanish.",
    transportation: "Bus: 57"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Forest Grove Foursquare Church and Food Pantry",
    address: "1719 Cedar St. Forest Grove, OR 97116",
    phone: "503-357-4400",
    hours: "Thurs. 10 a.m.-12:30 p.m.",
    services: "Food pantry",
    notes: "For low-income residents of Dilley, Cornelius, Forest Grove, Gales Creek, Gaston and Laurelwood.",
    transportation: "Bus: 57"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Helping Hands Food Pantry",
    address: "14986 NW Cornell Rd. Portland, OR 97229",
    phone: "503-292-9293",
    hours: "Wed. 9:30-11:30 a.m. and 4-6 p.m.",
    services: "Drive-thru style food pantry",
    notes: "Located at Sunset Presbyterian Church. Volunteers collect a list of groceries and bring it out to you.",
    transportation: "Bus: 48"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Hillsboro Seventh-Day Adventist",
    address: "367 NE Grant St. Hillsboro, OR 97124",
    phone: "503-648-3922",
    hours: "Thurs. 6:30-8 p.m.",
    services: "Food boxes and clothing closet.",
    notes: "For Washington County residents.",
    transportation: "Bus: 46"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Holy Trinity Food Closet",
    address: "13715 SW Walker Rd. Beaverton, OR 97005",
    phone: "503-591-9025",
    hours: "Tues., Wed., Fri. 10 a.m.-12:30 p.m.",
    services: "Food pantry by appointment.",
    notes: "Make an appointment through Care to Share. May receive assistance twice a month.",
    transportation: "Bus: 59, 62, 67"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Oregon Food Bank",
    address: "Multiple locations",
    phone: "503-439-6510",
    hours: "Phone hours: Mon.-Fri. 8 a.m.-4:30 p.m.",
    services: "Referral service to help individuals find perishable and non-perishable food assistance.",
    notes: "Visit website to find nearest food pantry. Available in 19 languages.",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "Sherwood Helping Hands",
    address: "22280 SW Washington St. Sherwood, OR 97140",
    phone: "503-625-7975",
    hours: "9-10 a.m. 3rd Thurs.",
    services: "Food boxes for families by appointment.",
    notes: "Located at Sherwood United Methodist Church.",
    transportation: "Bus: 94"
  },
  {
    category: "Food and Grocery Assistance",
    name: "St. Francis Food Pantry",
    address: "15659 SW Oregon St. Sherwood, OR 97140",
    phone: "503-625-7067",
    hours: "Wed. 9-11 a.m. and 5-7 p.m.; Thurs. 9-11 a.m.",
    services: "Shopping-style food pantry",
    notes: "For low-income residents of Tualatin, Sherwood, Newberg and King City.",
    transportation: "Bus: 94"
  },
  {
    category: "Food and Grocery Assistance",
    name: "St. Vincent de Paul Food Pantry - Forest Grove",
    address: "St. Anthony, 1660 Elm St. Forest Grove, OR 97116",
    phone: "503-357-9647",
    hours: "Call Mon.-Sat. 9 a.m.-noon for appt.",
    services: "Food pantry by appointment.",
    notes: "",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "St. Vincent de Paul Food Pantry - Hillsboro",
    address: "St. Matthew's, 442 SE Third Ave. Hillsboro, OR 97123",
    phone: "503-693-7528",
    hours: "Mon. and Wed. 9-11:30 a.m.",
    services: "Food pantry; furniture, rent and utility assistance available.",
    notes: "Mobile kitchen lunch served Wednesdays.",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "St. Vincent de Paul Food Pantry - St. Anthony Tigard",
    address: "9905 SW McKenzie St. Tigard, OR 97223",
    phone: "503-684-8280",
    hours: "Wed. noon-2:30 p.m., Thurs. 1-3 p.m., Sat. 10 a.m.-noon",
    services: "Food pantry.",
    notes: "Serves 97223 and 97224. Provide proof of Tigard residency.",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "St. Vincent de Paul Food Pantry - St. Cecilia",
    address: "12250 SW Fifth St. Beaverton, OR 97005",
    phone: "503-644-2619",
    hours: "Mon.-Fri. by appt.",
    services: "Food pantry.",
    notes: "Contact Care to Share for appt.",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "St. Vincent de Paul Food Pantry - St. Elizabeth Ann Seton",
    address: "3145 SW 192nd Ave. Aloha, OR 97003",
    phone: "503-649-5841",
    hours: "Mon.-Fri. 11 a.m.-2 p.m. by appt.",
    services: "Food pantry.",
    notes: "",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "St. Vincent de Paul Food Pantry - St. Juan Diego",
    address: "5995 NW 178th Ave. Portland, OR 97229",
    phone: "503-985-6046",
    hours: "Mon. 4-5:30 p.m., Fri. 11 a.m.-12:30 p.m.",
    services: "Food pantry.",
    notes: "",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "Supplemental Nutrition Assistance Program (SNAP)",
    address: "Multiple locations",
    phone: "503-693-4555 (Hillsboro), 503-646-9952 (Beaverton), 503-670-9711 (Tigard)",
    hours: "Mon.-Fri. 8 a.m.-5 p.m.",
    services: "Helps low-income people buy food. Benefits provided on a debit card.",
    notes: "Apply online at www.oregon.gov/DHS.",
    transportation: "MAX Blue (Hillsboro), Bus 48, 67 (Beaverton), Bus 76, 78 (Tigard)"
  },
  {
    category: "Food and Grocery Assistance",
    name: "True Life Fellowship Food Pantry",
    address: "1895 NW 169th Pl. Beaverton, OR 97006",
    phone: "503-810-7426",
    hours: "2nd and 4th Sat. of the month 10 a.m.-1 p.m.",
    services: "Emergency food boxes",
    notes: "For low-income Washington County residents.",
    transportation: "Bus 89"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Tualatin Schoolhouse Pantry",
    address: "3550 SW Borland Rd. Tualatin, OR 97062",
    phone: "503-783-0721",
    hours: "Mon. 4-7 p.m., Wed. and Fri. 10 a.m.-1 p.m.",
    services: "Shopping-style pantry twice a month.",
    notes: "For residents of Durham, Lake Oswego, Tualatin, West Linn and Wilsonville located at Rolling Hills Community Church.",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "Unity Church of Beaverton Food Pantry",
    address: "12650 SW Fifth St. Beaverton, OR 97005",
    phone: "503-646-3364",
    hours: "Tues. and Wed. 10 a.m.-4 p.m.",
    services: "Food boxes",
    notes: "For low-income residents within specific zip codes: 97005, 97006, 97007, 97008.",
    transportation: "Bus: 52, 76, 78"
  },
  {
    category: "Food and Grocery Assistance",
    name: "Vernonia Cares Food Bank",
    address: "547 Weed Ave. Vernonia, OR 97064",
    phone: "503-429-1414",
    hours: "Tues. and Thurs. 10 a.m.-2 p.m.",
    services: "Emergency food boxes provide 3-day supply of groceries",
    notes: "For low-income residents of Vernonia, Timber, Manning and Buxton.",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "Wapato Valley Church Food Pantry",
    address: "200 Front St. Gaston, OR 97119",
    phone: "503-985-3351",
    hours: "Thurs. 5-7 p.m.",
    services: "Food bank and clothing closet.",
    notes: "For low-income residents of Gales Creek, Gaston, Laurelwood and Cherry Grove.",
    transportation: ""
  },
  {
    category: "Food and Grocery Assistance",
    name: "Women, Infants and Children (WIC)",
    address: "Multiple locations",
    phone: "503-846-3555",
    hours: "Mon. 10 a.m.-6:30 p.m. (Hillsboro/Beaverton); Tues.-Fri. 8 a.m.-4:30 p.m.",
    services: "Healthy food benefits, growth monitoring, and referrals.",
    notes: "For pregnant/post-partum women, infants, and children up to age 5.",
    transportation: "MAX Blue (Hillsboro), Bus 52, 76, 78 (Beaverton)"
  },

  // Health Care
  {
    category: "Health Care",
    name: "Borland Free Clinic",
    address: "3550 SW Borland Rd. Tualatin, OR 97062",
    phone: "503-974-8887",
    hours: "Mon. and Thurs. 3-7 p.m.",
    services: "Primary care for uninsured and under-insured patients. Chronic disease management and medication assistance.",
    notes: "Bilingüe. Walk-ins and appts. welcome.",
    transportation: ""
  },
  {
    category: "Health Care",
    name: "Planned Parenthood - Columbia Willamette",
    address: "12220 SW First St. Ste. 200 Beaverton, OR 97005",
    phone: "888-576-7526",
    hours: "Mon. and Wed. 10 a.m.-5:30 p.m.; Tues., Thurs., Fri. 8 a.m.-3:30 p.m.",
    services: "Low-cost birth control, Pap exams, pregnancy testing, STI/HIV treatment, medication abortion, and gender affirming hormone services.",
    notes: "Insured or uninsured accepted. Financial assistance available.",
    transportation: "Bus: 76, 78, MAX"
  },
  {
    category: "Health Care",
    name: "Oregon Health Plan/Medicaid",
    address: "Confidential",
    phone: "800-273-0557",
    hours: "Mon.-Fri. 8 a.m.-5 p.m.",
    services: "Assists members with medical, dental or mental health care access. Provides information and referral for OHP.",
    notes: "",
    transportation: ""
  },
  {
    category: "Health Care",
    name: "Virginia Garcia - Beaverton Dental @ The Round",
    address: "12600 SW Crescent St. Beaverton, OR 97005",
    phone: "503-718-3675",
    hours: "Mon. and Fri. 7 a.m.-6 p.m.",
    services: "Dental Services",
    notes: "",
    transportation: "Bus: 20, 57, MAX Blue"
  },
  {
    category: "Health Care",
    name: "Virginia Garcia - Beaverton Wellness Center",
    address: "2725 SW Cedar Hills Blvd. Ste. 200, Beaverton, OR 97005",
    phone: "503-352-6000",
    hours: "Mon. and Fri. 8 a.m.-7 p.m.",
    services: "Medical services",
    notes: "",
    transportation: "Bus: 20, 57, MAX Blue"
  },
  {
    category: "Health Care",
    name: "Virginia Garcia - Beaverton Wellness Center Pharmacy",
    address: "2725 SW Cedar Hills Blvd. Ste. 200, Beaverton, OR 97005",
    phone: "503-352-6006",
    hours: "Mon.-Fri. (various); Wed. 10 a.m.-6 p.m.",
    services: "Pharmacy",
    notes: "",
    transportation: "Bus: 20, 57, MAX Blue"
  },
  {
    category: "Health Care",
    name: "Virginia Garcia - Beaverton Vision",
    address: "12600 SW Crescent St. Ste. 130, Beaverton, OR 97005",
    phone: "503-352-1699",
    hours: "Mon.-Fri. 8 a.m.-5 p.m.",
    services: "Vision care",
    notes: "",
    transportation: ""
  },
  {
    category: "Health Care",
    name: "Virginia Garcia - Cornelius Wellness Center",
    address: "1151 N Adair St. Cornelius, OR 97113",
    phone: "503-359-5564",
    hours: "Mon., Tues., Fri. 8:30 a.m.-5:15 p.m.; Wed. 9:30 a.m.; Thurs. 10:30 a.m.-7:15 p.m.",
    services: "Medical, Dental (503-359-8505), Vision (503-352-8543), and Pharmacy (503-352-8852).",
    notes: "Dental appts by phone only; no walk-ins.",
    transportation: "Bus: 57"
  },
  {
    category: "Health Care",
    name: "Virginia Garcia - Hillsboro Clinic",
    address: "226 SE Eighth Ave. Hillsboro, OR 97123",
    phone: "503-601-7400",
    hours: "Mon.-Fri. 8 a.m.-7 p.m.",
    services: "Primary care clinic and Vision Clinic.",
    notes: "Closed 1st, 3rd, 5th Wed 1-2 p.m. Vision clinic operated by Pacific University College of Optometry.",
    transportation: "MAX Blue"
  },
  {
    category: "Health Care",
    name: "Virginia Garcia - Hillsboro Dental",
    address: "730 SE Oak St. Ste. A and B, Hillsboro, OR 97123",
    phone: "503-352-2354",
    hours: "Mon.-Fri. 7 a.m.-6 p.m.",
    services: "Dental",
    notes: "Appointments by phone only. No walk-ins.",
    transportation: "Bus: 46, 47, 57, MAX Blue"
  },
  {
    category: "Health Care",
    name: "Virginia Garcia - Hillsboro Women's Clinic",
    address: "333 SE 7th Ave. Suite 550, Hillsboro, OR 97123",
    phone: "503-359-5564",
    hours: "Mon., Wed., Fri. 8 a.m.-5 p.m.; Tues., Thurs. 10 a.m.-7 p.m.",
    services: "Women's health services.",
    notes: "",
    transportation: ""
  },

  // Housing and Rental Assistance
  {
    category: "Housing and Rental Assistance",
    name: "Community Action",
    address: "1001 SW Baseline St. Hillsboro, OR 97123",
    phone: "503-615-0770",
    hours: "Live phones Mon.-Thurs. starting 8:30 a.m.",
    services: "Limited emergency rental assistance. 72-hour eviction notice required.",
    notes: "Subject to availability. Must be behind on rent. English/Spanish.",
    transportation: "Bus: 57"
  },
  {
    category: "Housing and Rental Assistance",
    name: "Open Door HousingWorks",
    address: "34420 SW Tualatin Valley Hwy. Hillsboro, OR 97123",
    phone: "503-640-6689",
    hours: "Mon.-Fri. 9 a.m.-5 p.m.",
    services: "Support in obtaining and retaining housing. Shelter referrals and housing services.",
    notes: "",
    transportation: "Bus: 57"
  },
  {
    category: "Housing and Rental Assistance",
    name: "Transponding Hope Tri-County Supportive Housing",
    address: "Multiple locations",
    phone: "503-475-0636",
    hours: "",
    services: "Affordable community housing program for men, women and families with on-site staff support.",
    notes: "",
    transportation: ""
  },
  {
    category: "Housing and Rental Assistance",
    name: "Washington County Housing Services",
    address: "111 NE Lincoln St., Ste. 200-L, Hillsboro, OR 97124",
    phone: "503-846-4794",
    hours: "Mon. 8:30-11:30 a.m.; Wed. 1-4 p.m.; Fri. 8:30-11:30 a.m.",
    services: "Rental assistance and affordable housing opportunities (Section 8 and public housing).",
    notes: "Most programs have waiting lists. English/Spanish.",
    transportation: "Bus: 47, 48, MAX Blue"
  },

  // Legal Services
  {
    category: "Legal Services",
    name: "Lawyer Referral Service",
    address: "Confidential",
    phone: "503-684-3763 or 800-452-7636",
    hours: "Mon.-Fri. 8 a.m.-5 p.m.",
    services: "Referrals to attorneys in area of needed assistance.",
    notes: "30-minute consultation is $35.",
    transportation: ""
  },
  {
    category: "Legal Services",
    name: "Oregon Crime Victims Law Center",
    address: "Confidential",
    phone: "503-208-8160",
    hours: "Office visits by appointment only",
    services: "Free legal representation regarding crime victims' rights; protective order cases for survivors of DV, sexual assault and stalking.",
    notes: "Serves all Oregon counties.",
    transportation: ""
  },
  {
    category: "Legal Services",
    name: "Oregon Law Center",
    address: "230 NE Second Ave., Ste. F, Hillsboro, OR 97124",
    phone: "503-640-4115 (Public Benefits: 1-800-520-5292)",
    hours: "Call for walk-in hours",
    services: "Civil legal services for low-income clients. No criminal or personal injury cases.",
    notes: "English/Spanish. Please call main line for eviction defense.",
    transportation: "Bus: 48, MAX Blue"
  },
  {
    category: "Legal Services",
    name: "Oregon Law Center Farmworker Program",
    address: "138 NE 3rd Suite 203, Gresham, OR 97030",
    phone: "503-726-4381",
    hours: "Mon.-Fri. 9 a.m.-5 p.m.",
    services: "Free legal assistance to low-income farmworkers (wage claims, discrimination, harassment, housing).",
    notes: "No appointments necessary. English/Spanish/Mixteco.",
    transportation: ""
  },
  {
    category: "Legal Services",
    name: "St. Andrew Legal Clinic-Washington County",
    address: "232 NE Lincoln St. Ste. H, Hillsboro, OR 97123",
    phone: "503-648-1600",
    hours: "Mon.-Fri. 9 a.m.-5 p.m. (Closed noon-1 p.m.)",
    services: "Family law legal services for low-income individuals.",
    notes: "Charges based on sliding scale. $40 for phone/online consultations.",
    transportation: "Bus: 46, MAX"
  },

  // Libraries
  {
    category: "Libraries",
    name: "Washington County Libraries",
    address: "Multiple locations",
    phone: "Various",
    hours: "Varies by location",
    services: "Safe cooling/warming places, free wifi, public computers, and printers. Visit wccls.org/libraries.",
    notes: "No library card needed to visit.",
    transportation: "Varies by location."
  },

  // Meals
  {
    category: "Meals",
    name: "Community Cafe at St. Anthony Parish Center",
    address: "9905 SW McKenzie St. Tigard, OR 97223",
    phone: "503-639-4179",
    hours: "Sun. 5:30-6:30 p.m.",
    services: "Free hot dinners to go.",
    notes: "Doors open 5:30 p.m.",
    transportation: "Bus: 45, 94"
  },
  {
    category: "Meals",
    name: "Faith Café",
    address: "5150 SW Watson Ave. Beaverton, OR 97005",
    phone: "",
    hours: "Sun. 4 p.m.; last Thurs. of month 4 p.m.",

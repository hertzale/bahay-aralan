// src/lib/mockData.js
// Temporary mock data — replace with API calls once backend is ready

export const DORMS = [
  { id:1, name:"Magnolia Residences",  address:"Magnolia St., Bagumbayan Sur, Naga City", price:3500, slots:20, occupied:18, rating:4.5, colorA:"#4F522C", colorB:"#695E3B", amenities:["WiFi","AC","CCTV","Laundry","Study Room"],        description:"A comfortable dormitory near AdNU with 24/7 security, dedicated study rooms, and excellent amenities perfect for the focused student." },
  { id:2, name:"Green Leaf Dorms",     address:"Sta. Cruz, Naga City",                    price:4200, slots:15, occupied:12, rating:4.2, colorA:"#4C6B8E", colorB:"#372B1C", amenities:["WiFi","Study Room","Kitchen","CCTV","Parking"],       description:"Modern dormitory with spacious rooms, a communal kitchen, and dedicated study areas — ideal for students who love to cook." },
  { id:3, name:"The Loft Residence",   address:"Sta. Cruz, Naga City",                    price:2800, slots:30, occupied:25, rating:3.9, colorA:"#695E3B", colorB:"#372B1C", amenities:["WiFi","CCTV","Water","Common Area"],                  description:"Budget-friendly option with basic amenities, conveniently located near major universities." },
  { id:4, name:"Blue Haven Residence", address:"Elias Angeles, Naga City",                price:5000, slots:10, occupied:8,  rating:4.8, colorA:"#372B1C", colorB:"#4C6B8E", amenities:["WiFi","AC","Kitchen","Gym","Laundry","Study Room","CCTV","Parking"], description:"Premium dormitory offering hotel-like amenities. Perfect for the discerning student." },
  { id:5, name:"Pink Dorm",            address:"P. Santos, Naga City",                    price:3800, slots:25, occupied:20, rating:4.1, colorA:"#AD8D6D", colorB:"#695E3B", amenities:["WiFi","Garden","Study Room","Laundry","CCTV"],        description:"A serene garden-surrounded dormitory near USI and AdNU with a peaceful atmosphere." },
  { id:6, name:"Luwalhati Dormitory",  address:"Ateneo Avenue, Naga City",                price:3200, slots:40, occupied:35, rating:4.0, colorA:"#4F522C", colorB:"#4C6B8E", amenities:["WiFi","AC","Lounge","Laundry","CCTV","Common Kitchen"], description:"A large, modern student hub designed for community living with a vibrant lounge area." },
]

export const STUDENTS = [
  { id:1, name:"Sandra Fresnido",  email:"sandra.fresnido@adnu.edu.ph",   dorm:"Magnolia Residences",  room:"201", paymentStatus:"paid",    contact:"09171234567", emergencyContact:"Gina Fresnido (Mother)",  emergencyPhone:"09181234567", course:"BS Information Technology", year:2, address:"Sorsogon City" },
  { id:2, name:"Eda Ignacio",      email:"eda.ignacio@adnu.edu.ph",       dorm:"Green Leaf Dorms",     room:"103", paymentStatus:"unpaid",  contact:"09179876543", emergencyContact:"Pedro Ignacio (Father)", emergencyPhone:"09189876543", course:"BS Information Technology", year:2, address:"Pasacao, Naga City" },
  { id:3, name:"Sean Vibar",       email:"sean.vibar@adnu.edu.ph",        dorm:"The Loft Residence",   room:"305", paymentStatus:"paid",    contact:"09175551234", emergencyContact:"Carmen Vibar (Mother)",  emergencyPhone:"09185551234", course:"BS Information Technology", year:2, address:"Naga City" },
  { id:4, name:"Rhyle Tarog",      email:"rhyle.tarog@adnu.edu.ph",       dorm:"Pink Dorm",            room:"112", paymentStatus:"pending", contact:"09173334455", emergencyContact:"Rosa Tarog (Mother)",    emergencyPhone:"09183334455", course:"BS Information Technology", year:2, address:"Sorsogon City" },
  { id:5, name:"Alfonso Mendoza",  email:"alfonso.mendoza@adnu.edu.ph",   dorm:"Blue Haven Residence", room:"401", paymentStatus:"paid",    contact:"09176667788", emergencyContact:"Jens Mendoza (Father)",  emergencyPhone:"09186667788", course:"BS Nursing",               year:3, address:"Naga City" },
  { id:6, name:"Xavier Mendez",    email:"xavier.mendez@adnu.edu.ph",     dorm:"Luwalhati Dormitory",  room:"210", paymentStatus:"unpaid",  contact:"09172223344", emergencyContact:"Lucia Mendez (Mother)",  emergencyPhone:"09182223344", course:"BS Architecture",          year:1, address:"Naga City" },
]

export const MY_PAYMENTS = [
  { id:1, month:"May 2025",      amount:3500, ref:"GC-12345678", date:"May 2, 2025",  status:"verified" },
  { id:2, month:"April 2025",    amount:3500, ref:"GC-11223344", date:"Apr 1, 2025",  status:"verified" },
  { id:3, month:"March 2025",    amount:3500, ref:"GC-99887766", date:"Mar 3, 2025",  status:"verified" },
  { id:4, month:"February 2025", amount:3500, ref:"GC-77665544", date:"Feb 2, 2025",  status:"verified" },
]

export const MY_MAINTENANCE = [
  { id:1, type:"Plumbing",  issue:"Broken faucet in bathroom",     description:"The faucet in the shared bathroom is dripping constantly.",         date:"May 10, 2025", status:"resolved" },
  { id:2, type:"Electrical",issue:"Faulty outlet near study desk", description:"Outlet is not working, sparks sometimes when plugging in.",         date:"May 15, 2025", status:"in-progress" },
  { id:3, type:"HVAC",      issue:"AC unit not cooling properly",  description:"The AC doesn't reach the set temperature, room stays warm.",        date:"May 18, 2025", status:"pending" },
]

export const NOTIFICATIONS = [
  { id:1, title:"Payment Verified",  message:"Your May 2025 payment of ₱3,500 has been confirmed by the caretaker.", time:"2 hours ago",  read:false, type:"success" },
  { id:2, title:"Maintenance Update",message:"Your electrical outlet issue has been assigned to a technician.",        time:"1 day ago",    read:false, type:"info" },
  { id:3, title:"Parcel Received",   message:"A parcel addressed to you has been logged at the reception desk.",       time:"3 days ago",   read:true,  type:"info" },
  { id:4, title:"Rent Reminder",     message:"Your rent for June 2025 (₱3,500) is due on June 1, 2025.",              time:"5 days ago",   read:true,  type:"warning" },
  { id:5, title:"Dorm Announcement", message:"Water will be unavailable on May 25 from 8AM–12PM for pipe maintenance.",time:"6 days ago",   read:true,  type:"warning" },
]

export const APPLICATIONS = [
  { id:1, name:"Pedro Navarro",     email:"pedro.navarro@student.edu.ph",    course:"BS Architecture",  year:1, date:"May 20, 2025", status:"pending",  room:"Standard", notes:"Near UST. Has asthma, prefers no dusty rooms.", dorm:"Magnolia Residences" },
  { id:2, name:"Cynthia Abad",      email:"cynthia.abad@student.edu.ph",     course:"BS Nursing",       year:2, date:"May 19, 2025", status:"pending",  room:"Premium",  notes:"Works part-time, arrives home late.",          dorm:"Green Leaf Dorms" },
  { id:3, name:"Marco Villanueva",  email:"marco.villanueva@student.edu.ph", course:"BS Accountancy",   year:3, date:"May 18, 2025", status:"approved", room:"Standard", notes:"Quiet student, excellent references.",         dorm:"Magnolia Residences" },
  { id:4, name:"Dana Ocampo",       email:"dana.ocampo@student.edu.ph",      course:"BS Medicine",      year:1, date:"May 17, 2025", status:"rejected", room:"Standard", notes:"",                                            dorm:"Blue Haven Residence" },
]

export const ALL_PAYMENTS = [
  { id:1, student:"Sandra Fresnido", room:"201", month:"May 2025",   amount:3500, ref:"GC-12345678", date:"May 2, 2025", status:"verified", dorm:"Magnolia Residences" },
  { id:2, student:"Eda Ignacio",     room:"103", month:"May 2025",   amount:4200, ref:"GC-55443322", date:"May 5, 2025", status:"verified", dorm:"Green Leaf Dorms" },
  { id:3, student:"Sean Vibar",      room:"305", month:"May 2025",   amount:2800, ref:"",            date:"",           status:"unpaid",   dorm:"The Loft Residence" },
  { id:4, student:"Rhyle Tarog",     room:"112", month:"May 2025",   amount:3800, ref:"GC-11447788", date:"May 1, 2025", status:"verified", dorm:"Pink Dorm" },
  { id:5, student:"Alfonso Mendoza", room:"401", month:"May 2025",   amount:5000, ref:"GC-33221100", date:"May 8, 2025", status:"pending",  dorm:"Blue Haven Residence" },
  { id:6, student:"Xavier Mendez",   room:"210", month:"May 2025",   amount:3200, ref:"",            date:"",           status:"unpaid",   dorm:"Luwalhati Dormitory" },
  { id:7, student:"Sandra Fresnido", room:"201", month:"April 2025", amount:3500, ref:"GC-22334455", date:"Apr 1, 2025", status:"verified", dorm:"Magnolia Residences" },
  { id:8, student:"Eda Ignacio",     room:"103", month:"April 2025", amount:4200, ref:"GC-66778899", date:"Apr 3, 2025", status:"verified", dorm:"Green Leaf Dorms" },
]

export const ALL_DORMERS = [
  ...STUDENTS,
  { id:7, name:"Lena Santos", email:"lena.santos@ust.edu.ph",   dorm:"Green Leaf Dorms",     room:"205", paymentStatus:"paid",   contact:"09174445566", course:"BS Psychology",       year:1, address:"Marikina City" },
  { id:8, name:"Carlo Reyes", email:"carlo.reyes@dlsu.edu.ph",  dorm:"Blue Haven Residence", room:"302", paymentStatus:"unpaid", contact:"09176667788", course:"BS Computer Science", year:2, address:"Quezon City" },
]

export const ACTIVITY_LOG = [
  { id:1, action:"Approved application", detail:"Pedro Navarro → Magnolia Residences",      time:"May 20, 2025 10:30 AM", type:"approve" },
  { id:2, action:"Recorded payment",     detail:"Sandra Fresnido — May 2025 ₱3,500",        time:"May 2, 2025 9:15 AM",   type:"payment" },
  { id:3, action:"Updated maintenance",  detail:"Broken faucet → Resolved",                 time:"May 12, 2025 2:45 PM",  type:"maintenance" },
  { id:4, action:"Logged parcel",        detail:"Package for Xavier Mendez",                time:"May 14, 2025 4:00 PM",  type:"parcel" },
  { id:5, action:"Rejected application", detail:"Dana Ocampo — Insufficient info",          time:"May 17, 2025 11:00 AM", type:"reject" },
]

export const EMERGENCY_ALERTS = [
  { id:1, title:"Heavy Rain Warning",   area:"Sta. Cruz, Naga City",        level:"moderate", time:"2 hours ago" },
  { id:2, title:"Power Outage Reported",area:"Bagumbayan Sur, Naga City",   level:"high",     time:"4 hours ago" },
  { id:3, title:"Road Flooding Alert",  area:"Elias Angeles, Naga City",    level:"moderate", time:"6 hours ago" },
]

export const REVENUE_DATA = [
  { month:"Jan", revenue:85000 }, { month:"Feb", revenue:78000 }, { month:"Mar", revenue:92000 },
  { month:"Apr", revenue:88000 }, { month:"May", revenue:95000 }, { month:"Jun", revenue:102000 },
]

export const MONTHS = [
  "January 2025","February 2025","March 2025","April 2025","May 2025",
  "June 2025","July 2025","August 2025","September 2025",
]

export const CARETAKER_MAINTENANCE = [
  { id:1, student:"Sandra Fresnido", room:"201", type:"Plumbing",   issue:"Broken faucet",     date:"May 10, 2025", status:"resolved",    dorm:"Magnolia Residences" },
  { id:2, student:"Eda Ignacio",     room:"103", type:"Electrical", issue:"Faulty outlet",     date:"May 15, 2025", status:"in-progress", dorm:"Green Leaf Dorms" },
  { id:3, student:"Sean Vibar",      room:"305", type:"HVAC",       issue:"AC not cooling",    date:"May 18, 2025", status:"pending",     dorm:"The Loft Residence" },
  { id:4, student:"Rhyle Tarog",     room:"112", type:"Furniture",  issue:"Broken chair",      date:"May 14, 2025", status:"in-progress", dorm:"Pink Dorm" },
]
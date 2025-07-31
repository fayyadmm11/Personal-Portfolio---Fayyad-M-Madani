// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useTheme } from "./contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

// My Data
// --- Experiences Data ---
const experiencesData = [
  {
    title: "Minister of Healthy for Dormitory - SMAN 1 Padang Panjang",
    date: "Jan 2024 - Feb 2025",
    description:
      "Responsible for overseeing health-related activities, including organizing health education programs, providing healthcare facilities, administering treatment to ill residents, and managing leave requests for sick or absent dormitory residents.",
  },
  {
    title:
      "Chairman of 5th Commission Majelis Permusyawaratan Kelas (MPK) - SMAN 1 Padang Panjang",
    date: "Nov 2023 - Nov 2024",
    description:
      "In charge of supervising and evaluating the performance of OSIS SMAN 1 Padang Panjang in the field of Information Technology and Environment",
  },
  {
    title: "Fundraising Coordinator of Batik Birru 13 - SMAN 1 Padang Panjang",
    date: "Aug 2024 - Oct 2024",
    description:
      "Responsible for coordinating team members in fundraising efforts for junior high school level competition (Batik Birru 13), ensuring effective and efficient planning and execution.",
  },
];

// --- Achievements Data ---
const achievementsData = [
  {
    title: "5th place in the city-level National Science Olympiad (OSN-K).",
    detail: "2024",
  },
  {
    title:
      "2nd place in National Olympiad by UNAND Mechanical Engineering Department",
    detail: "2023",
  },
  {
    title: "Top 20 KIHAJAR STEM Teams Basic Stage",
    detail: "2023",
  },
];

// --- Education Data ---
const educationData = [
  {
    degree: "Undergraduate Information Systems",
    institution: "Universitas Indonesia",
    period: "2025 - Now",
  },
  {
    degree: "",
    institution: "SMAN 1 Padang Panjang",
    period: "2022 - 2025",
  },
];

// Animation
// --- Animation Variations for Section ---
const sectionVariants = {
  hiddenFromRight: { x: "100%", opacity: 0 },
  hiddenFromLeft: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// ---Animation Variations for Carousel ---
const carouselVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  }),
};

// Components
// --- Components ExperienceCarousel ---
const ExperienceCarousel = ({ experiences }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage(([currentPage]) => {
      let nextPage = currentPage + newDirection;
      if (nextPage < 0) {
        nextPage = experiences.length - 1;
      } else if (nextPage >= experiences.length) {
        nextPage = 0;
      }
      return [nextPage, newDirection];
    });
  };

  const swipeConfidenceThreshold = 10000;
  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const currentExperience = experiences[page];

  return (
    <div className="relative w-full overflow-hidden flex justify-center items-center py-4">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={onDragEnd}
          className="w-full max-w-2xl p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner min-h-[200px] flex flex-col justify-center cursor-grab"
        >
          <h3 className="text-xl font-semibold dark:text-gray-100 mb-2">
            {currentExperience.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {currentExperience.date}
          </p>
          <p className="dark:text-gray-200 text-justify">
            {currentExperience.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg z-10 transition-colors duration-200 hidden md:block"
        aria-label="Previous experience"
      >
        <svg
          xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg z-10 transition-colors duration-200 hidden md:block"
        aria-label="Next experience"
      >
        <svg
          xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

// --- Components for Static Contents Box ---
const StaticContentBox = ({ title, subtitle, description, className = "" }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-300 ${className}`}
    >
      <h3 className="text-xl font-semibold dark:text-gray-100 mb-2">{title}</h3>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {subtitle}
        </p>
      )}
      {Array.isArray(description) ? (
        <ul className="list-disc list-inside mt-2 dark:text-gray-200">
          {description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="dark:text-gray-200 text-justify">{description}</p>
      )}
    </div>
  );
};

// --- Components AnimatedSection ---
const AnimatedSection = ({ id, children, fromRight, className }) => {
  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: true,
  });

  const initialAnimation = fromRight ? "hiddenFromRight" : "hiddenFromLeft";

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      variants={sectionVariants}
      initial={initialAnimation}
      animate={inView ? "visible" : initialAnimation}
    >
      {children}
    </motion.section>
  );
};

// App
// --- Main App Components ---
function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen flex flex-col ${
          theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-gray-900"
        } transition-colors duration-300`}
      >
        <Navbar />
        <main className="flex-grow px-4 md:px-8 lg:px-20 xl:px-[120px] pt-28 pb-8">
          {/* 1st Chapter: About Me */}
          <AnimatedSection
            id="about-me"
            fromRight={true}
            className="mb-12 p-8 rounded-lg shadow-md bg-white dark:bg-gray-700 border-2 border-blue-600 dark:border-blue-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-blue-600 dark:text-blue-300 font-tomorrow">
                  About Me
                </h2>
                <p className="text-base sm:text-lg dark:text-gray-200 text-justify mb-6">
                  Allow me to introduce myself. My name is Fayad M. Madani. I am
                  a new student of Information Systems at the University of
                  Indonesia. I am interested in data analysis, machine learning,
                  and the Internet of Things (IoT). I am experienced in leading,
                  organizing, and implementing structured activities, as well as
                  coordinating teams.
                </p>
                <a
                  href="[https://drive.google.com/file/d/11NzvMokeyI_ORYFgF2ZCNF8BRlp41aCV/view?usp=sharing](https://drive.google.com/file/d/11NzvMokeyI_ORYFgF2ZCNF8BRlp41aCV/view?usp=sharing)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  My CV
                </a>
              </div>

              <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
                <img
                  src="/myPhoto.jpg"
                  alt="Fayyad M Madani"
                  className="rounded-full w-48 h-48 sm:w-64 sm:h-64 object-cover border-4 border-blue-600 dark:border-blue-300 shadow-lg"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* 2nd Chapter: Experiences - With Carousel */}
          <AnimatedSection
            id="experiences"
            fromRight={false}
            className="mb-12 p-8 rounded-lg shadow-md bg-white dark:bg-gray-700 border-2 border-blue-600 dark:border-blue-300"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-300">
              Experiences
            </h2>
            <ExperienceCarousel experiences={experiencesData} />
          </AnimatedSection>

          {/* 3rd Chapter: Achievements - With Static Box */}
          <AnimatedSection
            id="achievements"
            fromRight={true}
            className="mb-12 p-8 rounded-lg shadow-md bg-white dark:bg-gray-700 border-2 border-blue-600 dark:border-blue-300"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-300">
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievementsData.map((achievement, index) => (
                <StaticContentBox
                  key={index}
                  title={achievement.title}
                  description={achievement.detail}
                  className="col-span-1"
                />
              ))}
            </div>
          </AnimatedSection>

          {/* 4th Chapter: Education - With Static Box */}
          <AnimatedSection
            id="education"
            fromRight={false}
            className="mb-12 p-8 rounded-lg shadow-md bg-white dark:bg-gray-700 border-2 border-blue-600 dark:border-blue-300"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-300">
              Education
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {educationData.map((edu, index) => (
                <StaticContentBox
                  key={index}
                  title={edu.institution}
                  subtitle={
                    edu.degree ? `${edu.degree} (${edu.period})` : edu.period
                  }
                  className="col-span-1"
                />
              ))}
            </div>
          </AnimatedSection>

          {/* 5th Chapter: Contact Me */}
          <AnimatedSection
            id="contact-me"
            fromRight={true}
            className="p-8 rounded-lg shadow-md bg-white dark:bg-gray-700 border-2 border-blue-600 dark:border-blue-300"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-300">
              Contact
            </h2>
            <form className="space-y-6">
              {/* Input Your Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  className="w-full p-3 rounded-lg border-2 border-blue-600 dark:border-blue-300 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>
              {/* Input Your Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="w-full p-3 rounded-lg border-2 border-blue-600 dark:border-blue-300 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              {/* Textarea Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  autoComplete="off"
                  className="w-full p-3 rounded-lg border-2 border-blue-600 dark:border-blue-300 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 resize-y"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-700"
              >
                Send Message
              </button>
            </form>
          </AnimatedSection>
        </main>

        {/* --- FOOTER --- */}
        <footer
          className={`w-full py-6 text-center text-sm ${
            theme === "dark"
              ? "bg-gray-900 text-gray-400"
              : "bg-gray-200 text-gray-700"
          } transition-colors duration-300`}
        >
          <p>Fayyad M Madani</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

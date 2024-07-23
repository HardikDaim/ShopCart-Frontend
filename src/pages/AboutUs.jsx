import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="bg-white dark:bg-slate-900 p-6 md:p-12 min-h-screen">
      <div className="border dark:border-slate-700 shadow-lg rounded-2xl p-6 md:p-12 max-w-4xl mx-auto">          <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>
          <div className="text-lg">
            <p className="mb-4">
              Hello! I'm Hardik Daim, a passionate software developer with a
              knack for creating seamless and intuitive user experiences. With a
              background in web development and a deep understanding of various
              programming languages and frameworks, I strive to build
              applications that not only meet but exceed user expectations.
            </p>
            <p className="mb-4">
              Over the years, I've worked on numerous projects ranging from
              small business websites to complex e-commerce platforms. My
              expertise lies in full-stack development, ensuring that both the
              front-end and back-end of an application are well-integrated and
              function flawlessly.
            </p>
            <p className="mb-4">
              I'm committed to continuous learning and staying updated with the
              latest industry trends. This dedication allows me to incorporate
              modern techniques and tools into my projects, ensuring they are
              efficient, scalable, and maintainable.
            </p>
            <p className="mb-4">
              Beyond coding, I enjoy collaborating with fellow developers,
              sharing knowledge, and contributing to the tech community. Feel
              free to connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/hardik-daim-ab0b07251"
                className="text-blue-700 dark:text-blue-400 underline"
              >
                LinkedIn
              </a>{" "}
              or visit my{" "}
              <a
                href="https://hardikdaim.netlify.app"
                className="text-blue-700 dark:text-blue-400 underline"
              >
                personal website
              </a>{" "}
              to learn more about my work.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

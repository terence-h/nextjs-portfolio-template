"use client";

import About from "./components/about";
import Certifications from "./components/certifications";
import Journey from "./components/journey";
import NavBar from "./components/navbar";
import Projects from "./components/projects";
import Section from "./components/section";
import Skills from "./components/skills";
import settings from "./data/settings.json";
import { ActiveSectionProvider } from "./contexts/active-section-context";
import { DarkModeProvider } from "./contexts/dark-mode-context";
import { MobileProvider } from "./contexts/mobile-context";

export default function Home() {
  return (
    <MobileProvider>
      <ActiveSectionProvider>
        <DarkModeProvider>
          <NavBar />
          {!settings.sections.about &&
            <div className="mt-8"></div>
          }
          {settings.sections.about &&
            <Section id="about" className="flex w-11/12 min-h-fit h-svh items-center justify-center md:w-5/6 mx-auto" header={false}>
              <About />
            </Section>
          }
          {settings.sections.skills &&
            <Section id="skills" className="flex flex-col min-h-fit h-auto w-11/12 md:w-5/6 mx-auto text-center mt-2 md:mt-7">
              <Skills />
            </Section>
          }
          {settings.sections.journey &&
            <Section id="journey" className="flex flex-col min-h-fit h-auto w-11/12 md:w-5/6 mx-auto mt-2 md:mt-7">
              <Journey />
            </Section>
          }
          {settings.sections.projects &&
            <Section id="projects" className="flex flex-row flex-wrap min-h-fit h-auto w-11/12 md:w-5/6 mx-auto mt-2 md:mt-7">
              <Projects />
            </Section>
          }
          {settings.sections.certifications &&
            <Section id="certifications" className="flex flex-col min-h-fit h-auto w-11/12 md:w-5/6 mx-auto text-center mt-2 md:mt-7">
              <Certifications />
            </Section>
          }
          <div className="mb-16"></div>
        </DarkModeProvider>
      </ActiveSectionProvider>
    </MobileProvider>
  );
}
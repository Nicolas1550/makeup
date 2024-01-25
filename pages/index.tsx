"use client";
import React from "react";
import HeaderPresentation from "../src/app/components/header/header";
import AcercaDe from "../src/app/components/presentation/presentation";
import CoursesSection from "../src/app/components/courses/coursesSection";
import ServicesSection from "../src/app/components/servicesSection/servicesSection/servicesSection";
import ParentComponent from "../src/app/components/products/listProducts/listProducts/listProducts";
import Chatbot from "@/app/components/chatBot/chatBot";

export default function Home() {
  return (
    <div>
      <HeaderPresentation />
      <AcercaDe />
      <CoursesSection />
      <ServicesSection />
      <ParentComponent />
      <Chatbot/>
    </div>
  );
}

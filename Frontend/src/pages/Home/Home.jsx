import React from "react";
import { HeritageHero } from "../../features/heritage";
import { ManufacturingProcess } from "../../features/manufacturing";
import { Sustainability } from "../../features/sustainability";
import { WholesaleContact } from "../../features/wholesale";

export default function Home() {
  return (
    <main className="home-page">
      {/* 01. OUR HERITAGE HERO */}
      <HeritageHero />

      {/* 02. MANUFACTURING PROCESS */}
      <ManufacturingProcess />

      {/* 03. SUSTAINABILITY */}
      <Sustainability />

      {/* 04. CLIENT TESTIMONIALS / PERSPECTIVES
      <Testimonials /> */}

      {/* 05. WHOLESALE / CONTACT */}
      <WholesaleContact />
    </main>
  );
}

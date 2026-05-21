import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CalorieCalculator from "@/components/sections/CalorieCalculator";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Calorie Calculator — MR7 Unisex Fitness",
  description: "Calculate your daily calorie needs with the Mifflin-St Jeor equation. Free tool by MR7 Unisex Fitness, Chennai.",
};

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24" style={{ backgroundColor: '#111111' }}>
        <CalorieCalculator />
      </div>
      <Footer />
    </>
  );
}

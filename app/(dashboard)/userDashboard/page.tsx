// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
import { StoreGrid } from "@/components/userComponents/store/store-grid";

export default function HomePage() {


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose a Grocery Store</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select from our partner stores to start shopping for fresh groceries. Each store offers unique products and
          special deals.
        </p>
      </div>

      <StoreGrid />
    </main>
  );
}

 const products = [
  { 
    id: "1", 
    name: "Premium Silk Coated Stock", 
    paperType: "Hemp", 
    size: "A4 (210x297mm)", 
    price: 250, 
    image: "/homepage/conestack.png" 
  },
  { id: "2", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 210, image: "/homepage/conestack.png" },
  { id: "3", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 150, image: "/homepage/conestack.png" },
  { id: "4", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 200, image: "/homepage/conestack.png" },
  { id: "5", name: "Premium Silk Coated Stock", paperType: "Blunt", size: "A4 (210x297mm)", price: 180, image: "/homepage/conestack.png" },

  { id: "6", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 220, image: "/homepage/conestack.png" },
  { id: "7", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 190, image: "/homepage/conestack.png" },
  { id: "8", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 160, image: "/homepage/conestack.png" },
  { id: "9", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 240, image: "/homepage/conestack.png" },
  { id: "10", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 250, image: "/homepage/conestack.png" },

  { id: "11", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 210, image: "/homepage/conestack.png" },
  { id: "12", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 150, image: "/homepage/conestack.png" },
  { id: "13", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 200, image: "/homepage/conestack.png" },
  { id: "14", name: "Premium Silk Coated Stock", paperType: "Blunt", size: "A4 (210x297mm)", price: 180, image: "/homepage/conestack.png" },
  { id: "15", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 220, image: "/homepage/conestack.png" },

  { id: "16", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 190, image: "/homepage/conestack.png" },
  { id: "17", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 160, image: "/homepage/conestack.png" },
  { id: "18", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 240, image: "/homepage/conestack.png" },
  { id: "19", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 230, image: "/homepage/conestack.png" },
  { id: "20", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 205, image: "/homepage/conestack.png" },

  { id: "21", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 155, image: "/homepage/conestack.png" },
  { id: "22", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 215, image: "/homepage/conestack.png" },
  { id: "23", name: "Premium Silk Coated Stock", paperType: "Blunt", size: "A4 (210x297mm)", price: 175, image: "/homepage/conestack.png" },
  { id: "24", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 245, image: "/homepage/conestack.png" },
  { id: "25", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 195, image: "/homepage/conestack.png" },

  { id: "26", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 165, image: "/homepage/conestack.png" },
  { id: "27", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 235, image: "/homepage/conestack.png" },
  { id: "28", name: "Premium Silk Coated Stock", paperType: "Blunt", size: "A4 (210x297mm)", price: 185, image: "/homepage/conestack.png" },
  { id: "29", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 255, image: "/homepage/conestack.png" },
  { id: "30", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 215, image: "/homepage/conestack.png" },

  { id: "31", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 145, image: "/homepage/conestack.png" },
  { id: "32", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 225, image: "/homepage/conestack.png" },
  { id: "33", name: "Premium Silk Coated Stock", paperType: "Blunt", size: "A4 (210x297mm)", price: 170, image: "/homepage/conestack.png" },
  { id: "34", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 235, image: "/homepage/conestack.png" },
  { id: "35", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 185, image: "/homepage/conestack.png" },

  { id: "36", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 170, image: "/homepage/conestack.png" },
  { id: "37", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 245, image: "/homepage/conestack.png" },
  { id: "38", name: "Premium Silk Coated Stock", paperType: "Blunt", size: "A4 (210x297mm)", price: 190, image: "/homepage/conestack.png" },
  { id: "39", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 260, image: "/homepage/conestack.png" },
  { id: "40", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 220, image: "/homepage/conestack.png" },

  { id: "41", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 150, image: "/homepage/conestack.png" },
  { id: "42", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 230, image: "/homepage/conestack.png" },
  { id: "43", name: "Premium Silk Coated Stock", paperType: "Blunt", size: "A4 (210x297mm)", price: 175, image: "/homepage/conestack.png" },
  { id: "44", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 240, image: "/homepage/conestack.png" },
  { id: "45", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 200, image: "/homepage/conestack.png" },

  { id: "46", name: "Premium Silk Coated Stock", paperType: "Organic", size: "A4 (210x297mm)", price: 165, image: "/homepage/conestack.png" },
  { id: "47", name: "Premium Silk Coated Stock", paperType: "Rice", size: "A4 (210x297mm)", price: 250, image: "/homepage/conestack.png" },
  { id: "48", name: "Premium Silk Coated Stock", paperType: "Blunt", size: "A4 (210x297mm)", price: 185, image: "/homepage/conestack.png" },
  { id: "49", name: "Premium Silk Coated Stock", paperType: "Hemp", size: "A4 (210x297mm)", price: 270, image: "/homepage/conestack.png" },
  { id: "50", name: "Premium Silk Coated Stock", paperType: "Natural", size: "A4 (210x297mm)", price: 225, image: "/homepage/conestack.png" },
];
export const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

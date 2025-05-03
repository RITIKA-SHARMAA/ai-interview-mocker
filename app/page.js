import Image from "next/image";
import { Button } from "../components/ui/Button.js";

export default function Home() {
  return (
      <div className="flex justify-center items-center min-h-screen">
          {/* Example button usage */}
          <Button variant="default" size="default">
              Default Button
          </Button>


          {/* Other button variants */}
          <Button variant="secondary" size="sm">
              Secondary Button
          </Button>
      </div>
      
  );
}

import { assets } from "../assets/assets";

export default function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* LEFT: Text with GIF background */}
      <div className="relative w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 overflow-hidden">
        {/* GIF background */}
        <img
          src={assets.bg1}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/60"></div>

        {/* Content */}
        <div className="relative z-10 text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* RIGHT: Hero image */}
      <div className="w-full sm:w-1/2 overflow-hidden max-h-[500px]">
        <img
          src={assets.hero_i}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
    </div>
  );
}

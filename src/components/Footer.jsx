import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32 " />
          <p className="w-full md:w-2/3 text-gray-600 ">
            FitMe is place for you to find you cloth fit your style and bringe
            it to life
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 ">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600 ">
            <li>Home</li>
            <li>About us</li>
            <li>Delevery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 ">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600 ">
            <li>+216 12345678</li>
            <li>FitMe@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-gray-600" />
        <p className="py-5 text-sm text-center ">
          Copyright (c) 2026 FitMe - All Rights Reserved.
        </p>
      </div>
    </>
  );
}

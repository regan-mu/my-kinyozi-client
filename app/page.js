import Image from 'next/image';
import Header from './components/Header';
import Service from './components/Service';
import Link from 'next/link';
import Carousel from './components/WhyUsCarousel';
import Expander from './components/FaqExpander';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-dark-blue h-auto px-14 font-poppins text-white">
      <Header />
      <section className="w-full h-[85vh] grid grid-cols-2 py-5 mb-20">
        <div className="flex flex-col justify-center gap-4  h-full w-full">
          <h2 className="font-bold text-5xl w-full">
            Elevate Your Barbershop Experience with <span className="text-secondary">Effortless Management</span>
          </h2>
          <p className="text-gray-300 font-thin text-base p-0 ">
            Streamline Operations, Optimize Staff, and Enhance Customer Satisfaction.
          </p>
          <Link className="bg-secondary w-max py-2 px-4 rounded-lg hover:text-gray-300 transition-all duration-100 ease-in" href="/">Get Started</Link>
        </div>
        <div className="w-full flex justify-end relative">
          <Image className="object-contain" src="/my-kinyozi-hero.svg" alt="my kinyozi hero" fill={true}/>
        </div>
      </section>
      <section id="services-section">
        <h2 className="font-bold text-4xl text-center">Services</h2>
        <div className="grid grid-cols-1 gap-10 grid-rows-2 mt-10">
            <div className="grid grid-cols-7 gap-10">
              <Service 
                title="Inventory Management" 
                description="Effortlessly track and control supplies. 
                Stay well-stocked and avoid disruptions with our user-friendly interface for managing inventory levels."
                icon="/inventory.svg" image="/inventory-management.png"
                alt="my kinyozi inventory management"
                grid="col-span-4"
              />
              <Service 
                title="Staff Management" 
                description="Optimize your workforce with effective scheduling. 
                Ensure your barbershop meets customer demand without unnecessary overstaffing."
                icon="/staff-icon.svg" image="/barbershop-staff.png"
                alt="my kinyozi staff management"
                grid="col-span-3"
              />
            </div>
            <div className="grid grid-cols-7 gap-10">
              <Service 
                title="Appointment Scheduling" 
                description="Enhance customer experience with an intuitive scheduling system. 
                Allow clients to book appointments online, receive notifications, and easily manage their bookings."
                icon="/appointments.svg" image="/scheduling.png"
                alt="my kinyozi appointment scheduling"
                grid="col-span-3"
              />
              <Service 
                title="Book Keeping"
                description="Effortlessly handle your barbershop's finances with our comprehensive Bookkeeping and Financial Management service."
                icon="/financials.svg" image="/financial-management.png"
                alt="my kinyozi book keeping"
                grid="col-span-4"
              />
            </div>
        </div>
      </section>
      <section id="about-section" className="mt-24">
        <div className="grid grid-cols-2 gap-10 h-[70vh]">
          <Image className="relative w-full h-full" src="/about-image.svg" alt="about my kinyozi" width={500} height={300} />
          <div className="w-full h-full flex flex-col justify-center">
            <h3 className="text-4xl font-bold mb-7">About Us</h3>
            <p className="text-justify text-gray-300 font-roboto font-thin text-[16px] mb-5">
              At Kinyozi, our mission is to revolutionize the barbershop industry by providing 
              innovative and user-friendly management solutions. 
              We aim to empower barbershops of all sizes with the tools they need to 
              enhance operational efficiency, elevate customer experiences, 
              and foster growth in an ever-evolving business landscape.
            </p>
            <Link className="bg-secondary w-max py-2 px-4 text-white rounded-full" href="#about-section">Learn More</Link>
          </div>
        </div>

        {/* Why choose us */}
        <div className="mt-24">
          <h3 className="text-4xl font-bold mb-14 text-center">Why choose us</h3>
          <Carousel />
        </div>
      </section>
      {/* FAQs */}
      <section className="mt-24">
        <h3 className="text-4xl font-bold mb-1 text-center">FAQs</h3>
        <p className="text-gray-300 text-base text-center mb-10">
          Here are some of our most asked questions. If yours is not there, do not hesitate to contact us.
        </p>
        <Expander />
      </section>
      {/* Contact */}
      <section id="contact-section" className="my-24 grid grid-cols-2 grid-rows-1 w-full h-[80vh]">
        <div className="relative w-full h-full">
          <Image className="object-cover" src="/contact-us.svg" alt="my kinyozi contact" fill={true} />
        </div>
        <div className="flex flex-col gap-2 px-10 py-5 bg-accent">
          <h3 className="font-semibold text-2xl">Contact Us</h3>
          <p className="font-medium text-gray-400">We would love to hear from you.</p>
          <form className="flex flex-col gap-2 mt-5">
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-400" htmlFor="f_name">First Name</label>
                <input className="h-10 border border-gray-500 rounded-md outline-none bg-accent p-2 text-sm text-gray-300" id="f_name" name="f_name" required type="text" placeholder='Enter first name' />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-400" htmlFor="l_name">Last Name</label>
                <input className="h-10 border border-gray-500 rounded-md outline-none bg-accent p-2 text-sm text-gray-300" id="l_name" name="l_name" required type="text" placeholder='Enter last name' />
              </div>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-gray-400" htmlFor="email">Email</label>
              <input className="h-10 border border-gray-500 rounded-md outline-none bg-accent p-2 text-sm text-gray-300" id="email" name="email" required type="email" placeholder='Enter email' />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-gray-400" htmlFor="message">Last Name</label>
              <textarea className="resize-none h-16 border border-gray-500 rounded-lg outline-none bg-accent p-2 text-xs text-gray-200" id="message" name="message" required></textarea>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <button className="bg-secondary py-2 rounded-md text-lg" type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ContactToInsta = () => {
  return (
    <div className='max-w-[1440px] h-auto'>
      
      <div className="relative w-full h-auto">
        {/* Image Section */}
        <div className="w-full h-[450px]">
          <Image
            src={"/pic12.png"}
            alt="pic12"
            width={1440}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <p className="font-bold text-[40px] md:text-[60px] leading-[50px] md:leading-[90px]">
              Our Instagram
            </p>
            <p className="font-[400] text-[16px] md:text-[20px] leading-[24px] md:leading-[30px]">
              Follow our store on Instagram
            </p>
          </div>
          <div>
            <Link href="https://www.instagram.com/">
              <button className="w-[200px] h-[50px] md:w-[255px] md:h-[64px] rounded-full bg-white transition-transform hover:scale-105 text-black font-[500] text-[16px] md:text-[20px] drop-shadow-lg">
                Follow Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactToInsta

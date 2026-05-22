
'use client'
import { Button } from "@/components/ui/button"
import { selectAll } from "@/lib/features/auth/accountSlice"
import { Poll } from "@mui/icons-material"
import { Award, Facebook, Fingerprint, Lightbulb, Medal, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaHtml5, FaMedal, FaPaperPlane, FaRetweet, FaRocket, FaTelegram, FaTwitter } from "react-icons/fa"
import { useSelector } from "react-redux"
export default function Home() {
  const router = useRouter()
  const user = useSelector((state) => state.account)
  const handleClick = () => {
    if (user && user.role === "MERCHANT") {
      router.push('/merchant')
    }
    else {
      router.push('customers/auth/register')
    }
  }
  return (
    <main className='min-w-full'>
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <div className="absolute -top-6 inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTNX9Ue8J76ewDvizaMlsgIqNuW8Ko9K3WQ&s')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white lg:text-6xl">
              Empower Your Online Business Journey
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white">
              Discover a vibrant marketplace where diverse businesses flourish together,
              offering a rich array of products and services.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={() => router.push('/customers/explore-shops')} className="hover:opacity-90 hover:bg-orange-800 bg-orange-700" size="lg">Explore Shops</Button>
              <Button onClick={handleClick} className="hover:opacity-90 hover:bg-orange-800 bg-orange-700" size="lg">
                {
                  user.role === "MERCHANT" ?
                    "Go Dashboard"
                    :
                    "Create Your Shop"
                }
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* slogan section */}
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <Award />
                  </div>
                  <h6 className="text-xl font-semibold">
                    Empowering Business Diversity{" "}
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    Discover a vibrant marketplace where diverse businesses
                    flourish together, offering a rich array of products.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                    <FaRetweet />
                  </div>
                  <h6 className="text-xl font-semibold">
                    Empowering Entrepreneurs.
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    Empowering entrepreneurs to showcase their products and
                    services effortlessly.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <Fingerprint />
                  </div>
                  <h6 className="text-xl font-semibold">Seamless Shopping</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    Seamless user experience from shopping to shop management.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <User />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Shopping using our platform a pleasure
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Scalable E-Commerce Platform for Ethiopian Entrepreneurs and SMEs, Ethiopian e-commerce with an intuitive platform
                that streamlines online business operations
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                Empowering merchants with customizable templates and advanced
                order processing, Scalable E-Commerce Platform for Ethiopian Entrepreneurs and SMEs ensures efficient operations
                and improved customer engagement, paving the way for a
                thriving digital marketplace.
              </p>
              <Link href="/customers/auth/register" className="text-sm mt-3 mb-4 py-1 px-2 rounded-md bg-orange-800 text-white no-underline hover:opacity-75 text-blueGray-700 md:mt-8">
                Join our platform!
              </Link>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className=" font-bold text-gray-400 text-sm dark:text-white">
                    Top Notch Services
                  </h4>
                  <p className="font-light mt-2 text-gray-400 text-sm dark:text-white">
                    Your all-in-one e-commerce solution, blending effortless
                    store customization, smart inventory management, and a
                    smooth shopping experience on any device.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blueGray-200">
                  <FaRocket />
                </div>
                <h3 className="text-3xl font-semibold">A growing platform</h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  The extension comes with three pre-built page template to
                  help you get started faster. You can change the text and
                  images and you&apos;re good to go.
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                          <Fingerprint />
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Carefully crafted templates
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                          <FaHtml5 />
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Amazing web builder
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                          <FaPaperPlane />
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">Dynamic pages</h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonials section */}
      {/* <section className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">
                Here are our testimonials
              </h2>
              <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                Discover what our users are saying about Scalable E-Commerce Platform for Ethiopian Entrepreneurs and SMEs! From
                streamlined operations to seamless shopping experiences, our
                platform is transforming e-commerce in Ethiopia. Hear directly
                from merchants and customers who have experienced the ease and
                efficiency of our innovative solutions.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src="/img/team-1-800x800.jpg"
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Mebrat Matebie</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Merchant
                  </p>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase">
                    Shopping on Scalable E-Commerce Platform for Ethiopian Entrepreneurs and SMEs is a breeze! It easy to find and
                    purchase products quickly. I love the convenience!
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <FaTwitter />
                    </button>
                    <button
                      className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <Facebook />
                    </button>
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <FaTelegram />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src="/img/team-2-800x800.jpg"
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Fatuma Abebe</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Merchant
                  </p>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Customizing my online store has never been easier, and my
                    sales have increased significantly!
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src="/img/team-3-800x800.jpg"
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Mulunesh Tadele</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Customer
                  </p>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    I always find what I need, and the delivery is prompt and
                    reliable.
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src="/img/team-4-470x470.png"
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Amarech Gentnet</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Merchant
                  </p>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Scalable E-Commerce Platform for Ethiopian Entrepreneurs and SMEs has streamlined my business operations,
                    saving me time and effort.
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-dribbble"></i>
                    </button>
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* last slogan section */}
      <section className="relative block bg-gray-50">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-800 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-black dark:text-white">
                Build something
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-700">
                Experience the future of e-commerce with Scalable E-Commerce Platform for Ethiopian Entrepreneurs and SMEs
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mt-12 justify-center">
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-slate-300 inline-flex items-center justify-center">
                <Medal />
              </div>
              <h6 className="text-xl mt-5 font-semibold text-black dark:text-white">
                Excelent Services
              </h6>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-slate-300 inline-flex items-center justify-center">
                <Poll />
              </div>
              <h5 className="text-xl mt-5 font-semibold text-black dark:text-white">
                Grow your market
              </h5>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center ">
              <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-slate-300 inline-flex items-center justify-center">
                <Lightbulb />
              </div>
              <h5 className="text-xl mt-5 font-semibold text-black dark:text-white">
                Launch time
              </h5>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


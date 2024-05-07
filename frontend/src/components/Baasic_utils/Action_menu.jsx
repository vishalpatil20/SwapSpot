import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'

const solutions = [
  { name: 'SwapCall', description: 'A VideoCall App for all the exchanges', href: '/SwapVideocalling', icon: ChartPieIcon },
  { name: 'SwapSwipe', description: 'Swipe to Know the Latest Products', href: '/SwapSwipe', icon: CursorArrowRaysIcon },
  { name: 'SwapCoins', description: "Our very own Coins to all the exchanges", href: '#', icon: FingerPrintIcon },
  { name: 'SwapSecure', description: 'Invoices using blockchain', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Upcoming Events', href: '#', icon: PlayCircleIcon },
  { name: 'Know more', href: '#', icon: PhoneIcon },
]

export default function Action_menu() {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-start gap-x-4 font-semibold leading-2 text-prim">
        <span>SwapUPs</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-black text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 ">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-prim">
                    <item.icon className="h-6 w-6 text-black group-hover:text-primj" aria-hidden="true" />
                  </div>
                  <div>
                    <a href={item.href} className="font-bold  text-prim">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-white">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-blue-300"
                >
                  <item.icon className="h-5 w-5 flex-none text-prim" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

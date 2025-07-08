"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  menuKey,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: React.ReactNode;
  menuKey: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(menuKey)} className="relative">
      <motion.div
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white font-medium"
      >
        {item}
      </motion.div>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === menuKey && (
            <div className="absolute top-[calc(100%_+_1rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md flex items-center space-x-6 pl-6 pr-4 py-3"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  isExternal,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  isExternal?: boolean;
}) => {
  return (
    <Link
      href={href}
      className="flex space-x-3 p-2 rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      <Image
        src={src}
        width={200}
        height={100}
        alt={title}
        className="flex-shrink-0 rounded-lg shadow-md"
      />
      <div>
        <h4 className="text-base font-semibold mb-1 text-neutral-900 dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-600 text-sm max-w-[10rem] dark:text-neutral-400">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// أدوات تنقّل واعية باللغة (Link/Router/Pathname)
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

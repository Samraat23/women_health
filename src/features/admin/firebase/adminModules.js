export const adminContentCollection =
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_COLLECTION || "kusumgynecentre";

export const adminModules = [
  {
    id: "navbar",
    label: "Navbar Section",
    href: "/admin/navbar",
    description: "Manage logo, menus, links, and navbar visibility.",
  },
  {
    id: "footer",
    label: "Footer Section",
    href: "/admin/footer",
    description: "Manage footer text, links, contact details, and social links.",
  },
];

export function getAdminModule(moduleId) {
  return adminModules.find((moduleItem) => moduleItem.id === moduleId);
}


import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../../context/sidebarContext";
import { SideBar } from "./sideBar/sideBar";
import { HeaderBar } from "./headerBar/headerBar";
import { FooterBar } from "./footerBar/footerBar";
import styles from "./appEstudanteLayout.module.css";

const AppEstudanteLayout: React.FC = () => {
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebar();

  return (
    <div className={styles.appLayout}>
      {/* Desktop Sidebar (Fixed position) */}
      <div className={styles.desktopSidebarWrapper}>
        <SideBar />
      </div>

      {/* Mobile Drawer Sidebar System */}
      <div
        className={`${styles.mobileDrawerBackdrop} ${
          isMobileOpen ? styles.mobileDrawerOpen : ""
        }`}
        onClick={closeMobile}
      >
        <div
          className={`${styles.mobileDrawerContent} ${
            isMobileOpen ? styles.mobileDrawerContentOpen : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <SideBar onItemClick={closeMobile} />
        </div>
      </div>

      {/* Main Page Layout Wrapper */}
      <div
        className={`${styles.mainWrapper} ${
          isCollapsed ? styles.mainWrapperCollapsed : ""
        }`}
      >
        {/* Header */}
        <HeaderBar />

        {/* Dynamic Content Outlet */}
        <main className={styles.content}>
          <div className={styles.fadeContainer}>
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <FooterBar />
      </div>
    </div>
  );
};

export const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppEstudanteLayout />
    </SidebarProvider>
  );
};
